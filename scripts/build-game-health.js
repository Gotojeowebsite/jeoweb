#!/usr/bin/env node
// Combine signals into a single source-of-truth game_health.json.
//
// Inputs (any can be missing):
//   static_health.json          (fast, run on every push)
//   scan_results.json           (Playwright headless scan; optional)
//   smoke_results.json          (smoke / liveness; optional)
//   maintenance_overrides.json  (manual override list; supports legacy + structured form)
//   games_list.json             (catalog; used to enumerate games)
//
// Output: game_health.json (schema 2)
//
// Verdict rules (per game):
//   1. If an override has not expired and force_maintenance covers the game:
//      verdict=broken, source=override.
//   2. If an override has not expired and force_healthy covers the game:
//      verdict=healthy, source=override (BUT we also record an override_conflict
//      entry if any signal disagrees, so you can audit drift).
//   3. If static signal == fail: verdict=broken (single signal is enough here
//      because static failures are deterministic — a missing file IS missing).
//   4. Otherwise, count agreeing signals among (static, headless, smoke):
//      - 2+ pass and 0 fail -> healthy (high confidence)
//      - 2+ fail            -> broken (high confidence)
//      - 1 pass + 1 fail    -> unknown (low confidence; UI shows pill)
//      - only 1 signal      -> low confidence verdict from that signal
//      - 0 signals          -> unknown
//
// Also writes override_conflicts.json listing override slugs whose signals
// disagree, and warns when the inputs are stale.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PATHS = {
	static: path.join(ROOT, 'static_health.json'),
	headless: path.join(ROOT, 'scan_results.json'),
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
	if (!raw || !Array.isArray(raw.games)) return { map, generatedAt: 0 };
	for (const g of raw.games) {
		if (!g || typeof g !== 'object' || typeof g.slug !== 'string') continue;
		let verdict = g.verdict;
		// "Not fully local" promotion: when strict-external mode is on, any
		// game with an EXTERNAL_RUNTIME_DEP issue gets escalated from warn to
		// fail so the auto-fix bot picks it up. Off by default to avoid
		// surprising verdict flips on existing deploys.
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
	}
	return { map, generatedAt: Number(raw.generated_at) || 0 };
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

function combineSignals(slug, sig) {
	// sig: { static: 'pass'|'fail'|'warn'|null, headless: ..., smoke: ... }
	const tally = { pass: 0, fail: 0, warn: 0, present: 0 };
	for (const k of ['static', 'headless', 'smoke']) {
		const v = sig[k];
		if (!v) continue;
		tally.present += 1;
		if (v === 'pass') tally.pass += 1;
		else if (v === 'fail') tally.fail += 1;
		else if (v === 'warn') tally.warn += 1;
	}
	if (tally.present === 0) {
		return { verdict: 'unknown', confidence: 'low', reason: 'no_signals' };
	}
	// Static-fail is deterministic — a missing file isn't a fluke.
	if (sig.static === 'fail') {
		return { verdict: 'broken', confidence: 'high', reason: 'static_fail' };
	}
	// Quorum.
	if (tally.fail >= 2) return { verdict: 'broken', confidence: 'high', reason: 'quorum_fail' };
	if (tally.pass >= 2 && tally.fail === 0) return { verdict: 'healthy', confidence: 'high', reason: 'quorum_pass' };
	if (tally.fail === 1 && tally.pass === 1) {
		return { verdict: 'unknown', confidence: 'low', reason: 'split_signals' };
	}
	if (tally.fail === 1 && tally.pass === 0) {
		return { verdict: 'broken', confidence: 'low', reason: 'single_fail' };
	}
	if (tally.pass === 1 && tally.fail === 0) {
		return { verdict: 'healthy', confidence: 'low', reason: 'single_pass' };
	}
	if (tally.warn > 0) return { verdict: 'unknown', confidence: 'low', reason: 'only_warn' };
	return { verdict: 'unknown', confidence: 'low', reason: 'undetermined' };
}

function parseCliArgs(argv) {
	const args = { strictExternal: false };
	for (let i = 2; i < argv.length; i++) {
		if (argv[i] === '--strict-external') args.strictExternal = true;
	}
	return args;
}

function main() {
	const cli = parseCliArgs(process.argv);
	const staticRaw = readJsonSafe(PATHS.static);
	const headlessRaw = readJsonSafe(PATHS.headless);
	const smokeRaw = readJsonSafe(PATHS.smoke);
	const overridesRaw = readJsonSafe(PATHS.overrides);
	const catalog = readJsonSafe(PATHS.catalog);

	const staticSig = parseStaticSignal(staticRaw, { strictExternal: cli.strictExternal });
	const headlessSig = parseHeadlessSignal(headlessRaw);
	const smokeSig = parseSmokeSignal(smokeRaw);
	const overrides = parseOverrides(overridesRaw);

	// Source of game slugs: union of (catalog, static signal, headless, smoke).
	const slugs = new Set();
	if (Array.isArray(catalog)) for (const g of catalog) if (g && typeof g.name === 'string') slugs.add(g.name);
	for (const s of staticSig.map.keys()) slugs.add(s);
	for (const s of headlessSig.map.keys()) slugs.add(s);
	for (const s of smokeSig.map.keys()) slugs.add(s);
	for (const s of overrides.healthy.keys()) slugs.add(s);
	for (const s of overrides.maintenance.keys()) slugs.add(s);

	const games = {};
	const conflicts = [];
	let nHealthy = 0, nBroken = 0, nUnknown = 0;
	let nHighConf = 0, nLowConf = 0;

	for (const slug of [...slugs].sort()) {
		const sig = {
			static: staticSig.map.get(slug)?.signal || null,
			headless: headlessSig.map.get(slug)?.signal || null,
			smoke: smokeSig.map.get(slug)?.signal || null,
		};
		let entry;
		if (overrides.maintenance.has(slug)) {
			const o = overrides.maintenance.get(slug);
			entry = {
				verdict: 'broken',
				confidence: 'high',
				source: 'override',
				reason: 'force_maintenance',
				override_reason: o.reason,
				signals: sig,
			};
		} else if (overrides.healthy.has(slug)) {
			const o = overrides.healthy.get(slug);
			const hasFailingSignal = sig.static === 'fail' || sig.headless === 'fail' || sig.smoke === 'fail';
			if (hasFailingSignal) {
				// Reality-wins rule: a force_healthy override on a game that's
				// actually failing was wrong — users complained about landing
				// on broken games (e.g. 0v0 with an empty entry HTML was
				// healthy-overridden, scanner correctly saw it as fail, but
				// the override hid that). Override loses; verdict is broken.
				entry = {
					verdict: 'broken',
					confidence: 'high',
					source: 'signals-override-conflict',
					reason: 'force_healthy_overridden_by_failing_signal',
					override_reason: o.reason,
					signals: sig,
				};
				conflicts.push({
					slug,
					override: 'force_healthy',
					override_reason: o.reason,
					signals: sig,
					note: 'override demoted: signals say fail, so verdict was forced back to broken',
					verdict_after_demotion: 'broken',
				});
			} else {
				entry = {
					verdict: 'healthy',
					confidence: 'high',
					source: 'override',
					reason: 'force_healthy',
					override_reason: o.reason,
					signals: sig,
				};
			}
		} else {
			const combined = combineSignals(slug, sig);
			entry = {
				verdict: combined.verdict,
				confidence: combined.confidence,
				source: 'signals',
				reason: combined.reason,
				signals: sig,
			};
		}
		if (entry.verdict === 'healthy') nHealthy += 1;
		else if (entry.verdict === 'broken') nBroken += 1;
		else nUnknown += 1;
		if (entry.confidence === 'high') nHighConf += 1; else nLowConf += 1;
		games[slug] = entry;
	}

	const now = Math.floor(Date.now() / 1000);
	const ages = {
		static: staticSig.generatedAt || fileMtimeSec(PATHS.static),
		headless: fileMtimeSec(PATHS.headless),
		smoke: smokeSig.generatedAt || fileMtimeSec(PATHS.smoke),
	};

	const out = {
		schema: 2,
		generated_at: now,
		max_age_days: MAX_AGE_DAYS_DEFAULT,
		generators: {
			static_at: ages.static || null,
			headless_at: ages.headless || null,
			smoke_at: ages.smoke || null,
		},
		counts: {
			total: slugs.size,
			healthy: nHealthy,
			broken: nBroken,
			unknown: nUnknown,
			high_confidence: nHighConf,
			low_confidence: nLowConf,
			conflicts: conflicts.length,
		},
		games,
	};

	fs.writeFileSync(PATHS.out, JSON.stringify(out, null, 2));
	const conflictPayload = {
		generated_at: now,
		count: conflicts.length,
		conflicts,
		expired_overrides: overrides.expired,
	};
	fs.writeFileSync(PATHS.conflicts, JSON.stringify(conflictPayload, null, 2));

	console.log(`game_health: total=${slugs.size} healthy=${nHealthy} broken=${nBroken} unknown=${nUnknown}`);
	console.log(`           : high_conf=${nHighConf} low_conf=${nLowConf} override_conflicts=${conflicts.length} expired_overrides=${overrides.expired.length}`);
	console.log(`wrote ${path.relative(ROOT, PATHS.out)}`);
	console.log(`wrote ${path.relative(ROOT, PATHS.conflicts)}`);
}

main();
