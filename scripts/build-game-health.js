#!/usr/bin/env node
// Combine signals into a single source-of-truth game_health.json.
//
// Inputs (any can be missing):
//   static_health.json            (fast, run on every push)
//   scan_results.json             (Playwright headless scan; default profile)
//   scan_results.profile_b.json   (second Playwright scan; divergent profile)
//   smoke_results.json            (smoke / liveness; optional)
//   maintenance_overrides.json    (manual override list)
//   games_list.json               (catalog; used to enumerate games)
//
// Output: game_health.json (schema 2)
//
// TRIPLE-CONFIRM VERDICT RULES (per game). No "broken" verdict comes from a
// single signal — every fail conclusion requires corroboration. Lanes are:
//   static, cdn_probe, headless, headless_b, smoke
//
//   1. Manual override force_maintenance => broken (high).
//   2. Manual override force_healthy => healthy (high) UNLESS any lane fails,
//      in which case the override loses (reality-wins rule).
//   3. tally.fail >= 3 && tally.pass === 0 => broken (high, triple_fail).
//   4. tally.fail >= 2 && tally.pass === 0 => probable_broken (medium). NEW
//      verdict — does NOT hide the game; queues it for re-run on next nightly.
//   5. tally.pass >= 3 && tally.fail === 0 => healthy (high, triple_pass).
//   6. tally.pass >= 2 && tally.fail === 0 => healthy (medium, quorum_pass).
//   7. tally.pass >= 1 && tally.fail >= 1 => unknown (medium, under_review,
//      needs_arbitration). Game stays live; admin flagged.
//   8. Single signal pass-only => unverified. Game stays live, no badge.
//   9. Single signal fail-only => unverified (don't trust one fail).
//   10. Warn-only => unknown (low).
//
// Special case: static === 'fail' is NO LONGER a deterministic short-circuit.
// It contributes one fail vote. If cdn_probe returns 200, the verdict demotes
// to static_fail_unconfirmed instead of broken — the runtime works even
// though the local manifest entry is missing.
//
// Also writes override_conflicts.json (override drift audit), and warns when
// the inputs are stale.
//
// USAGE:
//   node scripts/build-game-health.js
//   node scripts/build-game-health.js --strict-external
//   node scripts/build-game-health.js --explain          # diff old vs new rules
//   node scripts/build-game-health.js --explain-only     # diff, do not write

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PATHS = {
	static: path.join(ROOT, 'static_health.json'),
	headless: path.join(ROOT, 'scan_results.json'),
	headless_b: path.join(ROOT, 'scan_results.profile_b.json'),
	smoke: path.join(ROOT, 'smoke_results.json'),
	overrides: path.join(ROOT, 'maintenance_overrides.json'),
	catalog: path.join(ROOT, 'games_list.json'),
	out: path.join(ROOT, 'game_health.json'),
	conflicts: path.join(ROOT, 'override_conflicts.json'),
};

const MAX_AGE_DAYS_DEFAULT = 7;

function readJsonSafe(p) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

function asLowerSet(arr) {
	const out = new Set();
	if (Array.isArray(arr)) for (const x of arr) if (typeof x === 'string') out.add(x);
	return out;
}

function parseOverrides(raw) {
	// Supports two shapes:
	//   1. Legacy: { force_healthy: ["slug", ...], force_maintenance: ["slug", ...] }
	//   2. Structured: { force_healthy: [{ slug, reason, expires_at }], ... }
	// expires_at is unix-seconds; absent or <= 0 means never expires.
	const now = Math.floor(Date.now() / 1000);
	const result = {
		healthy: new Map(),    // slug -> { reason, expires_at }
		maintenance: new Map(),
		expired: [],
	};
	if (!raw || typeof raw !== 'object') return result;
	const ingest = (target, list) => {
		if (!Array.isArray(list)) return;
		for (const entry of list) {
			if (typeof entry === 'string') {
				target.set(entry, { reason: 'unspecified', expires_at: 0 });
				continue;
			}
			if (!entry || typeof entry !== 'object') continue;
			const slug = typeof entry.slug === 'string' ? entry.slug : '';
			if (!slug) continue;
			const expiresAt = Number(entry.expires_at) || 0;
			if (expiresAt > 0 && expiresAt < now) {
				result.expired.push({ slug, reason: entry.reason || '', expires_at: expiresAt });
				continue;
			}
			target.set(slug, {
				reason: typeof entry.reason === 'string' ? entry.reason : 'unspecified',
				expires_at: expiresAt,
			});
		}
	};
	ingest(result.healthy, raw.force_healthy);
	ingest(result.maintenance, raw.force_maintenance);
	return result;
}

function parseStaticSignal(raw, opts = {}) {
	const strictExternal = !!opts.strictExternal;
	const map = new Map();
	const cdnProbeMap = new Map();
	if (!raw || !Array.isArray(raw.games)) {
		return { map, cdnProbeMap, generatedAt: 0 };
	}
	for (const g of raw.games) {
		if (!g || typeof g !== 'object' || typeof g.slug !== 'string') continue;
		let verdict = g.verdict;
		// "Not fully local" promotion: when strict-external mode is on, any
		// game with an EXTERNAL_RUNTIME_DEP issue gets escalated from warn to
		// fail so the recovery engine picks it up.
		if (strictExternal && (g.external_critical || 0) > 0 && verdict !== 'fail') {
			verdict = 'fail';
		}
		const signal = verdict === 'pass' ? 'pass' : verdict === 'fail' ? 'fail' : 'warn';
		map.set(g.slug, {
			signal,
			verdict,
			external_critical: g.external_critical || 0,
			issues: Array.isArray(g.issues) ? g.issues : [],
		});
		// cdn_probe is a separate lane: a runtime HEAD on the entrypoint URL.
		// When static-health-scan.js emits a `cdn_probe` field per game, we
		// surface it as its own signal so a "missing local file" and a
		// "404-at-runtime" can both vote independently. Until the scanner
		// emits this, the lane stays null and contributes nothing.
		if (typeof g.cdn_probe === 'string') {
			const cdnSignal = g.cdn_probe === 'pass' ? 'pass'
				: g.cdn_probe === 'fail' ? 'fail'
				: g.cdn_probe === 'warn' ? 'warn'
				: null;
			if (cdnSignal) cdnProbeMap.set(g.slug, { signal: cdnSignal });
		}
	}
	return { map, cdnProbeMap, generatedAt: Number(raw.generated_at) || 0 };
}

function parseHeadlessSignal(raw) {
	// scan_results.json is an array of game results (legacy). It only contains
	// games that were scanned in the most recent run, so absence != pass.
	const map = new Map();
	if (!Array.isArray(raw)) return { map, generatedAt: 0 };
	for (const item of raw) {
		if (!item || typeof item !== 'object' || typeof item.name !== 'string') continue;
		const status = String(item.status || '').toLowerCase();
		// "ok" -> pass, "broken" -> fail, "warning" -> warn (treated as ambiguous).
		let signal;
		if (status === 'ok') signal = 'pass';
		else if (status === 'broken') signal = 'fail';
		else if (status === 'warning') signal = 'warn';
		else continue;
		map.set(item.name, {
			signal,
			lead_issue: (Array.isArray(item.critical_issues) && item.critical_issues[0])
				? String(item.critical_issues[0].code || item.critical_issues[0].message || '')
				: '',
		});
	}
	// Headless runs don't currently emit a top-level timestamp; use file mtime.
	return { map, generatedAt: 0 };
}

function parseSmokeSignal(raw) {
	const map = new Map();
	if (!raw || !Array.isArray(raw.games)) return { map, generatedAt: 0 };
	for (const item of raw.games) {
		if (!item || typeof item !== 'object' || typeof item.slug !== 'string') continue;
		const verdict = String(item.verdict || '').toLowerCase();
		if (verdict !== 'pass' && verdict !== 'fail' && verdict !== 'warn') continue;
		map.set(item.slug, { signal: verdict, reason: item.reason || '' });
	}
	return { map, generatedAt: Number(raw.generated_at) || 0 };
}

function fileMtimeSec(p) {
	try { return Math.floor(fs.statSync(p).mtimeMs / 1000); } catch { return 0; }
}

const LANES = ['static', 'cdn_probe', 'headless', 'headless_b', 'smoke'];

function combineSignals(slug, sig) {
	// sig: { static, cdn_probe, headless, headless_b, smoke } each in
	//      'pass' | 'fail' | 'warn' | null
	const tally = { pass: 0, fail: 0, warn: 0, present: 0 };
	for (const k of LANES) {
		const v = sig[k];
		if (!v) continue;
		tally.present += 1;
		if (v === 'pass') tally.pass += 1;
		else if (v === 'fail') tally.fail += 1;
		else if (v === 'warn') tally.warn += 1;
	}
	if (tally.present === 0) {
		return { verdict: 'unknown', confidence: 'low', reason: 'no_signals', tally };
	}
	// LEGACY RULE REMOVED: `static === 'fail'` is no longer a deterministic
	// short-circuit. It contributes one fail vote like any other lane. If
	// cdn_probe says the runtime URL works, demote to a soft verdict — the
	// missing local file is irrelevant because the game loads from the CDN.
	if (sig.static === 'fail' && sig.cdn_probe === 'pass' && tally.fail < 3) {
		return {
			verdict: 'unverified',
			confidence: 'low',
			reason: 'static_fail_unconfirmed',
			tally,
		};
	}
	// Triple-confirm broken: 3+ fail votes, no pass.
	if (tally.fail >= 3 && tally.pass === 0) {
		return { verdict: 'broken', confidence: 'high', reason: 'triple_fail', tally };
	}
	// Two-fail probable broken — does NOT hide the game; queued for re-run.
	if (tally.fail >= 2 && tally.pass === 0) {
		return {
			verdict: 'probable_broken',
			confidence: 'medium',
			reason: 'quorum_fail_2of2',
			tally,
		};
	}
	// Triple-confirm healthy.
	if (tally.pass >= 3 && tally.fail === 0) {
		return { verdict: 'healthy', confidence: 'high', reason: 'triple_pass', tally };
	}
	if (tally.pass >= 2 && tally.fail === 0) {
		return { verdict: 'healthy', confidence: 'medium', reason: 'quorum_pass', tally };
	}
	// Disagreement: render normally, flag for arbitration.
	if (tally.pass >= 1 && tally.fail >= 1) {
		return {
			verdict: 'unknown',
			confidence: 'medium',
			reason: 'under_review',
			needs_arbitration: true,
			tally,
		};
	}
	// Single-signal cases (pass-only or fail-only) — never trust one lane.
	// Frontend treats `unverified` as live-but-unbadged. The empty-entry
	// HTML demotion in static-health-scan.js (Phase 2 follow-up) will move
	// the worst legacy "single-fail = broken" cases into this bucket.
	if (tally.fail === 1 && tally.pass === 0) {
		return { verdict: 'unverified', confidence: 'low', reason: 'single_fail', tally };
	}
	if (tally.pass === 1 && tally.fail === 0) {
		return { verdict: 'unverified', confidence: 'low', reason: 'single_pass', tally };
	}
	if (tally.warn > 0) {
		return { verdict: 'unknown', confidence: 'low', reason: 'only_warn', tally };
	}
	return { verdict: 'unknown', confidence: 'low', reason: 'undetermined', tally };
}

// Legacy verdict for the --explain diff. Mirrors the pre-triple-confirm rule
// set so we can show "was=broken/high static_fail, now=unverified/low ..."
function legacyCombineSignals(slug, sig) {
	const tally = { pass: 0, fail: 0, warn: 0, present: 0 };
	for (const k of ['static', 'headless', 'smoke']) {
		const v = sig[k];
		if (!v) continue;
		tally.present += 1;
		if (v === 'pass') tally.pass += 1;
		else if (v === 'fail') tally.fail += 1;
		else if (v === 'warn') tally.warn += 1;
	}
	if (tally.present === 0) return { verdict: 'unknown', confidence: 'low', reason: 'no_signals' };
	if (sig.static === 'fail') return { verdict: 'broken', confidence: 'high', reason: 'static_fail' };
	if (tally.fail >= 2) return { verdict: 'broken', confidence: 'high', reason: 'quorum_fail' };
	if (tally.pass >= 2 && tally.fail === 0) return { verdict: 'healthy', confidence: 'high', reason: 'quorum_pass' };
	if (tally.fail === 1 && tally.pass === 1) return { verdict: 'unknown', confidence: 'low', reason: 'split_signals' };
	if (tally.fail === 1 && tally.pass === 0) return { verdict: 'broken', confidence: 'low', reason: 'single_fail' };
	if (tally.pass === 1 && tally.fail === 0) return { verdict: 'healthy', confidence: 'low', reason: 'single_pass' };
	if (tally.warn > 0) return { verdict: 'unknown', confidence: 'low', reason: 'only_warn' };
	return { verdict: 'unknown', confidence: 'low', reason: 'undetermined' };
}

function parseCliArgs(argv) {
	const args = { strictExternal: false, explain: false, explainOnly: false };
	for (let i = 2; i < argv.length; i++) {
		if (argv[i] === '--strict-external') args.strictExternal = true;
		else if (argv[i] === '--explain') args.explain = true;
		else if (argv[i] === '--explain-only') { args.explain = true; args.explainOnly = true; }
	}
	return args;
}

function buildEntry(slug, sig, overrides) {
	if (overrides.maintenance.has(slug)) {
		const o = overrides.maintenance.get(slug);
		return {
			entry: {
				verdict: 'broken',
				confidence: 'high',
				source: 'override',
				reason: 'force_maintenance',
				override_reason: o.reason,
				signals: sig,
			},
			conflict: null,
		};
	}
	if (overrides.healthy.has(slug)) {
		const o = overrides.healthy.get(slug);
		const hasFailingSignal = LANES.some((k) => sig[k] === 'fail');
		if (hasFailingSignal) {
			// Reality-wins rule: a force_healthy override on a game that's
			// actually failing was wrong. Demote to broken.
			return {
				entry: {
					verdict: 'broken',
					confidence: 'high',
					source: 'signals-override-conflict',
					reason: 'force_healthy_overridden_by_failing_signal',
					override_reason: o.reason,
					signals: sig,
				},
				conflict: {
					slug,
					override: 'force_healthy',
					override_reason: o.reason,
					signals: sig,
					note: 'override demoted: signals say fail, so verdict was forced back to broken',
					verdict_after_demotion: 'broken',
				},
			};
		}
		return {
			entry: {
				verdict: 'healthy',
				confidence: 'high',
				source: 'override',
				reason: 'force_healthy',
				override_reason: o.reason,
				signals: sig,
			},
			conflict: null,
		};
	}
	const combined = combineSignals(slug, sig);
	const entry = {
		verdict: combined.verdict,
		confidence: combined.confidence,
		source: 'signals',
		reason: combined.reason,
		signals: sig,
	};
	if (combined.needs_arbitration) entry.needs_arbitration = true;
	return { entry, conflict: null };
}

function main() {
	const cli = parseCliArgs(process.argv);
	const staticRaw = readJsonSafe(PATHS.static);
	const headlessRaw = readJsonSafe(PATHS.headless);
	const headlessBRaw = readJsonSafe(PATHS.headless_b);
	const smokeRaw = readJsonSafe(PATHS.smoke);
	const overridesRaw = readJsonSafe(PATHS.overrides);
	const catalog = readJsonSafe(PATHS.catalog);

	const staticSig = parseStaticSignal(staticRaw, { strictExternal: cli.strictExternal });
	const headlessSig = parseHeadlessSignal(headlessRaw);
	const headlessBSig = parseHeadlessSignal(headlessBRaw);
	const smokeSig = parseSmokeSignal(smokeRaw);
	const overrides = parseOverrides(overridesRaw);

	// Source of game slugs: union of all signal maps + catalog + overrides.
	const slugs = new Set();
	if (Array.isArray(catalog)) for (const g of catalog) if (g && typeof g.name === 'string') slugs.add(g.name);
	for (const s of staticSig.map.keys()) slugs.add(s);
	for (const s of staticSig.cdnProbeMap.keys()) slugs.add(s);
	for (const s of headlessSig.map.keys()) slugs.add(s);
	for (const s of headlessBSig.map.keys()) slugs.add(s);
	for (const s of smokeSig.map.keys()) slugs.add(s);
	for (const s of overrides.healthy.keys()) slugs.add(s);
	for (const s of overrides.maintenance.keys()) slugs.add(s);

	const games = {};
	const conflicts = [];
	const explainDiffs = [];
	const counts = { healthy: 0, broken: 0, probable_broken: 0, unverified: 0, unknown: 0 };
	const confCounts = { high: 0, medium: 0, low: 0 };

	for (const slug of [...slugs].sort()) {
		const sig = {
			static: staticSig.map.get(slug)?.signal || null,
			cdn_probe: staticSig.cdnProbeMap.get(slug)?.signal || null,
			headless: headlessSig.map.get(slug)?.signal || null,
			headless_b: headlessBSig.map.get(slug)?.signal || null,
			smoke: smokeSig.map.get(slug)?.signal || null,
		};
		const { entry, conflict } = buildEntry(slug, sig, overrides);
		if (conflict) conflicts.push(conflict);

		// Per-game agreement metadata for downstream consumers.
		const tally = LANES.reduce((acc, k) => {
			if (sig[k] === 'pass') acc.pass += 1;
			else if (sig[k] === 'fail') acc.fail += 1;
			else if (sig[k] === 'warn') acc.warn += 1;
			return acc;
		}, { pass: 0, fail: 0, warn: 0 });
		entry.agreement_count = tally;

		if (cli.explain) {
			// Compare against the legacy 3-lane rule (using only the first
			// three lanes the old code knew about). Skip override-driven
			// entries since the legacy rule didn't reach combineSignals there.
			if (entry.source === 'signals') {
				const legacy = legacyCombineSignals(slug, {
					static: sig.static,
					headless: sig.headless,
					smoke: sig.smoke,
				});
				if (legacy.verdict !== entry.verdict || legacy.confidence !== entry.confidence) {
					explainDiffs.push({
						slug,
						signals: sig,
						was: legacy,
						now: { verdict: entry.verdict, confidence: entry.confidence, reason: entry.reason },
					});
				}
			}
		}

		counts[entry.verdict] = (counts[entry.verdict] || 0) + 1;
		confCounts[entry.confidence] = (confCounts[entry.confidence] || 0) + 1;
		games[slug] = entry;
	}

	const now = Math.floor(Date.now() / 1000);
	const ages = {
		static: staticSig.generatedAt || fileMtimeSec(PATHS.static),
		headless: fileMtimeSec(PATHS.headless),
		headless_b: fileMtimeSec(PATHS.headless_b),
		smoke: smokeSig.generatedAt || fileMtimeSec(PATHS.smoke),
	};

	const out = {
		schema: 2,
		generated_at: now,
		max_age_days: MAX_AGE_DAYS_DEFAULT,
		generators: {
			static_at: ages.static || null,
			headless_at: ages.headless || null,
			headless_b_at: ages.headless_b || null,
			smoke_at: ages.smoke || null,
		},
		counts: {
			total: slugs.size,
			healthy: counts.healthy || 0,
			broken: counts.broken || 0,
			probable_broken: counts.probable_broken || 0,
			unverified: counts.unverified || 0,
			unknown: counts.unknown || 0,
			high_confidence: confCounts.high,
			medium_confidence: confCounts.medium,
			low_confidence: confCounts.low,
			conflicts: conflicts.length,
		},
		games,
	};

	if (cli.explain) {
		// Print a tight summary table the way the legacy verdict differed.
		const byTransition = new Map();
		for (const d of explainDiffs) {
			const key = `${d.was.verdict}/${d.was.confidence} -> ${d.now.verdict}/${d.now.confidence}`;
			byTransition.set(key, (byTransition.get(key) || 0) + 1);
		}
		console.log(`\n--explain: ${explainDiffs.length} games verdict-flipped under the new rules`);
		for (const [k, n] of [...byTransition.entries()].sort((a, b) => b[1] - a[1])) {
			console.log(`  ${k}: ${n}`);
		}
		// Top 20 worst-shift cases for hand-review.
		const dangerous = explainDiffs.filter((d) => d.was.verdict === 'broken' && d.now.verdict !== 'broken');
		if (dangerous.length) {
			console.log(`\nformerly-broken games now NOT broken (audit these first):`);
			for (const d of dangerous.slice(0, 20)) {
				console.log(`  ${d.slug}: ${d.was.reason} -> ${d.now.reason}  signals=${JSON.stringify(d.signals)}`);
			}
			if (dangerous.length > 20) console.log(`  ... and ${dangerous.length - 20} more`);
		}
		const explainPath = path.join(ROOT, 'reports', 'game_health_explain.json');
		try {
			fs.mkdirSync(path.dirname(explainPath), { recursive: true });
			fs.writeFileSync(explainPath, JSON.stringify({
				generated_at: now,
				total_flipped: explainDiffs.length,
				diffs: explainDiffs,
			}, null, 2));
			console.log(`wrote ${path.relative(ROOT, explainPath)}`);
		} catch (e) {
			console.warn(`failed to write explain report: ${e.message}`);
		}
		if (cli.explainOnly) return;
	}

	fs.writeFileSync(PATHS.out, JSON.stringify(out, null, 2));
	const conflictPayload = {
		generated_at: now,
		count: conflicts.length,
		conflicts,
		expired_overrides: overrides.expired,
	};
	fs.writeFileSync(PATHS.conflicts, JSON.stringify(conflictPayload, null, 2));

	console.log(`game_health: total=${slugs.size} healthy=${counts.healthy || 0} probable_broken=${counts.probable_broken || 0} broken=${counts.broken || 0} unverified=${counts.unverified || 0} unknown=${counts.unknown || 0}`);
	console.log(`           : high_conf=${confCounts.high} med_conf=${confCounts.medium} low_conf=${confCounts.low} override_conflicts=${conflicts.length} expired_overrides=${overrides.expired.length}`);
	console.log(`wrote ${path.relative(ROOT, PATHS.out)}`);
	console.log(`wrote ${path.relative(ROOT, PATHS.conflicts)}`);
}

// Export for unit testing
module.exports = { combineSignals, legacyCombineSignals, LANES };

if (require.main === module) {
	main();
}
