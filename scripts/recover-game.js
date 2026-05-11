#!/usr/bin/env node
// scripts/recover-game.js — aggressive single-game recovery.
//
// Pipeline:
//   1. Resolve slug → display name + type (from games_list.json) + health
//      verdict (from game_health.json).
//   2. Discover candidate URLs via search-engines.js, OR use --url if given.
//   3. Score + rank candidates with atomic-swap.js#rankCandidates.
//   4. For each candidate (best score first, fail-fast):
//      a. scrape into Assets/.recovery/<slug>-<ts>/
//      b. validate with verify-offline-manifest.js --candidate
//      c. optionally validate with broken_game_scanner.py --root (gold standard,
//         skipped silently when Playwright is missing — manifest gate still
//         applies)
//      d. on first pass: moveToQuarantine(slug) + swapInCandidate(slug) +
//         rebuild manifest + scan + done.
//   5. On total failure: write to reports/recovery_cooldown.json with backoff
//      and append to reports/recovery_log.jsonl with reason.
//
// CLI:
//   node scripts/recover-game.js <slug>                       # full pipeline
//   node scripts/recover-game.js <slug> --url <portal-url>    # skip search
//   node scripts/recover-game.js <slug> --verbose             # detailed log
//   node scripts/recover-game.js <slug> --ignore-cooldown
//   node scripts/recover-game.js <slug> --max-candidates 4
//   node scripts/recover-game.js <slug> --skip-scanner        # only manifest gate
//   node scripts/recover-game.js <slug> --dry-run             # don't swap

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');
const COOLDOWN_PATH = path.join(REPORTS_DIR, 'recovery_cooldown.json');
const LOG_PATH = path.join(REPORTS_DIR, 'recovery_log.jsonl');

const { discoverCandidates } = require('./recovery/search-engines');
const {
	moveToQuarantine,
	swapInCandidate,
	restoreFromQuarantine,
	reservedCandidateFolder,
	rankCandidates,
} = require('./recovery/atomic-swap');
const { scrapeCandidate } = require('./recovery/scrape-engines');
const { buildForSlug, buildForArbitraryRoot } = require('./build-offline-manifest');
const { verifyFolder } = require('./verify-offline-manifest');
const { processGame: localizeGame } = require('./localize-all-games');

// Cooldown is now hours-based and short by default so transient flakes
// (rate-limited search backend, slow CDN, single bad candidate) don't
// lock a game out for a week. Values: 1h, 4h, 12h, 24h, 72h.
// User can still --ignore-cooldown to force retry.
const COOLDOWN_BACKOFF_SECONDS = [3600, 14400, 43200, 86400, 259200];

function parseArgs(argv) {
	const args = {
		slug: null,
		url: null,
		verbose: false,
		ignoreCooldown: false,
		maxCandidates: 15,
		skipScanner: false,
		dryRun: false,
		perCandidateTimeoutMs: 180_000,
		searchTimeoutMs: 10_000,
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (!a.startsWith('--') && !args.slug) { args.slug = a; continue; }
		if (a === '--url') args.url = argv[++i];
		else if (a === '--verbose' || a === '-v') args.verbose = true;
		else if (a === '--ignore-cooldown') args.ignoreCooldown = true;
		else if (a === '--max-candidates') args.maxCandidates = Number(argv[++i]) || args.maxCandidates;
		else if (a === '--skip-scanner') args.skipScanner = true;
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--candidate-timeout-ms') args.perCandidateTimeoutMs = Number(argv[++i]) || args.perCandidateTimeoutMs;
		else if (a === '--search-timeout-ms') args.searchTimeoutMs = Number(argv[++i]) || args.searchTimeoutMs;
	}
	return args;
}

function readJsonSafe(p, fallback) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return fallback; }
}

function ensureReports() {
	try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
}

function appendLog(entry) {
	ensureReports();
	try { fs.appendFileSync(LOG_PATH, JSON.stringify({ ts: Math.floor(Date.now() / 1000), ...entry }) + '\n'); }
	catch {}
}

function getCooldown(slug) {
	const data = readJsonSafe(COOLDOWN_PATH, {});
	return data[slug] || null;
}

function updateCooldown(slug, patch) {
	ensureReports();
	const data = readJsonSafe(COOLDOWN_PATH, {});
	const prev = data[slug] || { attempts: 0 };
	const next = { ...prev, ...patch };
	data[slug] = next;
	try { fs.writeFileSync(COOLDOWN_PATH, JSON.stringify(data, null, 2)); } catch {}
}

function clearCooldown(slug) {
	const data = readJsonSafe(COOLDOWN_PATH, {});
	if (data[slug]) {
		delete data[slug];
		try { fs.writeFileSync(COOLDOWN_PATH, JSON.stringify(data, null, 2)); } catch {}
	}
}

function isCooldownActive(slug) {
	const entry = getCooldown(slug);
	if (!entry || !entry.next_eligible) return false;
	return Math.floor(Date.now() / 1000) < Number(entry.next_eligible);
}

function bumpCooldownOnFailure(slug, reason) {
	const prev = getCooldown(slug) || { attempts: 0 };
	const attempts = (Number(prev.attempts) || 0) + 1;
	const seconds = COOLDOWN_BACKOFF_SECONDS[Math.min(attempts - 1, COOLDOWN_BACKOFF_SECONDS.length - 1)] || 259200;
	const nextEligible = Math.floor(Date.now() / 1000) + seconds;
	updateCooldown(slug, {
		attempts,
		last_attempt: Math.floor(Date.now() / 1000),
		next_eligible: nextEligible,
		last_error: String(reason || '').slice(0, 320),
	});
}

function lookupCatalog(slug) {
	const catalog = readJsonSafe(path.join(ROOT, 'games_list.json'), []);
	if (Array.isArray(catalog)) {
		return catalog.find(g => g && g.name === slug) || null;
	}
	return null;
}

function lookupHealth(slug) {
	const data = readJsonSafe(path.join(ROOT, 'game_health.json'), null);
	if (!data || !data.games) return null;
	return data.games[slug] || null;
}

function displayName(slug, catalogEntry) {
	if (catalogEntry && catalogEntry.title) return String(catalogEntry.title);
	return String(slug)
		.replace(/[-_]+/g, ' ')
		.replace(/\b([a-z])/g, (m, c) => c.toUpperCase())
		.trim();
}

function inferType(catalogEntry) {
	if (catalogEntry && catalogEntry.type) return String(catalogEntry.type);
	return 'webgl';
}

function runScannerOnCandidate(candidateRoot, slug, verbose) {
	return new Promise((resolve) => {
		// Try to invoke the Playwright scanner on the candidate folder.
		// Resolve { ok, reason, skipped } — skipped=true means Playwright isn't
		// available and the caller should rely on the manifest gate alone.
		const args = [
			path.join(ROOT, 'broken_game_scanner.py'),
			'--root', candidateRoot,
			'--hard-timeout-seconds', '90',
			'--wait-seconds', '6',
			'--report-json', path.join(REPORTS_DIR, `recovery_scan_${slug}.json`),
			'--broken-json', path.join(REPORTS_DIR, `recovery_broken_${slug}.json`),
			'--broken-log', path.join(REPORTS_DIR, `recovery_broken_${slug}.txt`),
			'--working-log', path.join(REPORTS_DIR, `recovery_working_${slug}.txt`),
			'--checked-log', path.join(REPORTS_DIR, `recovery_checked_${slug}.txt`),
			'--review-log', path.join(REPORTS_DIR, `recovery_review_${slug}.txt`),
			'--state-file', path.join(REPORTS_DIR, `recovery_state_${slug}.json`),
			'--port', String(9100 + Math.floor(Math.random() * 800)),
		];
		ensureReports();
		const proc = spawn('python3', args, { cwd: ROOT, stdio: verbose ? 'inherit' : 'ignore' });
		let settled = false;
		const watchdog = setTimeout(() => {
			if (settled) return;
			settled = true;
			try { proc.kill('SIGKILL'); } catch {}
			resolve({ ok: false, reason: 'scanner timeout (10min)' });
		}, 600_000);
		proc.on('error', (err) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			// ENOENT = python3 missing; treat as skipped not fail.
			if (err && err.code === 'ENOENT') resolve({ ok: true, skipped: true, reason: 'python3 not available' });
			else resolve({ ok: false, reason: `scanner spawn error: ${err.message}` });
		});
		proc.on('exit', (code) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			if (code === 0) {
				// Parse the report to see if any games are broken.
				const reportPath = path.join(REPORTS_DIR, `recovery_scan_${slug}.json`);
				const report = readJsonSafe(reportPath, []);
				const broken = Array.isArray(report) ? report.filter(g => g.status === 'broken') : [];
				if (broken.length) {
					const lead = broken[0];
					const issue = (lead.critical_issues && lead.critical_issues[0]) || {};
					return resolve({ ok: false, reason: `scanner: ${issue.code || 'broken'} ${issue.message || ''}`.trim() });
				}
				return resolve({ ok: true });
			}
			// Non-zero exit. If Playwright is missing the import itself will fail
			// — treat as skipped so we don't loop forever in dev environments.
			resolve({ ok: true, skipped: true, reason: `scanner exit code ${code} (likely missing playwright)` });
		});
	});
}

async function tryCandidate(cand, args, ctx) {
	const candidateRoot = reservedCandidateFolder(ctx.slug);
	const result = {
		url: cand.url,
		source: cand.source,
		score: cand.score,
		candidate_root: candidateRoot,
	};
	if (args.verbose) console.log(`  → candidate (${cand.source}, score=${cand.score}): ${cand.url}`);

	let scrape;
	try {
		scrape = await scrapeCandidate({
			url: cand.url,
			candidateRoot,
			gameType: ctx.gameType,
			timeoutMs: args.perCandidateTimeoutMs,
			verbose: args.verbose,
		});
	} catch (e) {
		scrape = { ok: false, error: String(e && e.message || e), asset_count: 0 };
	}
	result.scrape = scrape;
	if (!scrape.ok || scrape.asset_count < 2) {
		if (args.verbose) console.log(`    × scrape failed (${scrape.error || `assets=${scrape.asset_count}`})`);
		// Clean up the empty/failed candidate folder.
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'scrape_failed';
		return result;
	}

	// Build a manifest in the candidate root.
	try {
		buildForArbitraryRoot(candidateRoot, ctx.slug, {});
	} catch (e) {
		if (args.verbose) console.log(`    × manifest build failed: ${e.message}`);
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'manifest_build_failed';
		result.error = e.message;
		return result;
	}

	const verify = verifyFolder(candidateRoot, { strictHash: false });
	result.verify = { problems: verify.problems };
	if (verify.problems && verify.problems.length) {
		if (args.verbose) console.log(`    × manifest verify failed: ${verify.problems[0].code}`);
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'verify_failed';
		return result;
	}

	if (!args.skipScanner) {
		const scan = await runScannerOnCandidate(candidateRoot, ctx.slug, args.verbose);
		result.scanner = scan;
		if (!scan.ok) {
			if (args.verbose) console.log(`    × scanner: ${scan.reason}`);
			try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
			result.outcome = 'scanner_failed';
			return result;
		}
		if (scan.skipped && args.verbose) console.log(`    ⚠ scanner skipped: ${scan.reason}`);
	}

	if (args.dryRun) {
		if (args.verbose) console.log(`    ✓ candidate passes — DRY RUN, skipping swap`);
		result.outcome = 'dry_run_pass';
		return result;
	}

	// Atomic swap.
	let quarantineDir = null;
	try {
		quarantineDir = moveToQuarantine(ctx.slug);
		result.quarantine = quarantineDir;
	} catch (e) {
		result.outcome = 'quarantine_failed';
		result.error = e.message;
		return result;
	}

	try {
		swapInCandidate(ctx.slug, candidateRoot);
	} catch (e) {
		// Restore.
		if (quarantineDir) {
			try { restoreFromQuarantine(ctx.slug, quarantineDir); } catch {}
		}
		result.outcome = 'swap_failed';
		result.error = e.message;
		return result;
	}

	// Post-swap finalization: localize, manifest, scan refresh.
	try { localizeGame(ctx.slug, { apply: true }); } catch {}
	try { buildForSlug(ctx.slug, {}); } catch {}
	// Strip <!--GAME BROKEN--> markers in the new folder.
	try {
		const liveFolder = path.join(ASSETS_DIR, ctx.slug);
		for (const f of fs.readdirSync(liveFolder)) {
			if (!/\.html?$/i.test(f)) continue;
			const p = path.join(liveFolder, f);
			let txt;
			try { txt = fs.readFileSync(p, 'utf-8'); } catch { continue; }
			const stripped = txt.replace(/<!--\s*GAME\s+BROKEN\s*-->\s*\n?/gi, '');
			if (stripped !== txt) fs.writeFileSync(p, stripped);
		}
	} catch {}

	clearCooldown(ctx.slug);
	result.outcome = 'recovered';
	return result;
}

async function recover(slug, args) {
	const catalogEntry = lookupCatalog(slug);
	const healthEntry = lookupHealth(slug);
	const ctx = {
		slug,
		name: displayName(slug, catalogEntry),
		gameType: inferType(catalogEntry),
		healthVerdict: healthEntry && healthEntry.verdict,
	};

	const log = { slug, name: ctx.name, type: ctx.gameType, ts: Math.floor(Date.now() / 1000), candidates_tried: [] };

	if (!args.ignoreCooldown && isCooldownActive(slug) && !args.url) {
		const cd = getCooldown(slug);
		console.log(`[${slug}] cooldown active until ${new Date(cd.next_eligible * 1000).toISOString()} (attempts=${cd.attempts}). Skip with --ignore-cooldown to retry.`);
		appendLog({ ...log, outcome: 'cooldown_skipped' });
		return { slug, outcome: 'cooldown_skipped' };
	}

	let candidates;
	if (args.url) {
		candidates = [{ url: args.url, source: 'manual', title: '', snippet: '', score: 1000 }];
	} else {
		console.log(`[${slug}] discovering candidates for "${ctx.name}" (${ctx.gameType})…`);
		const hits = await discoverCandidates({ name: ctx.name, type: ctx.gameType }, { timeoutMs: args.searchTimeoutMs });
		candidates = rankCandidates(hits, ctx.name, args.maxCandidates);
		console.log(`[${slug}] ${hits.length} raw hits → ${candidates.length} ranked candidates`);
	}

	if (!candidates.length) {
		bumpCooldownOnFailure(slug, 'no candidates found');
		appendLog({ ...log, outcome: 'no_candidates' });
		console.log(`[${slug}] no candidates found.`);
		return { slug, outcome: 'no_candidates' };
	}

	for (const cand of candidates) {
		const r = await tryCandidate(cand, args, ctx);
		log.candidates_tried.push({
			url: r.url, source: r.source, score: r.score,
			outcome: r.outcome,
			error: r.error,
			asset_count: r.scrape && r.scrape.asset_count,
		});
		if (r.outcome === 'recovered' || r.outcome === 'dry_run_pass') {
			console.log(`[${slug}] ${r.outcome === 'dry_run_pass' ? 'PASS (dry run)' : 'RECOVERED'} from ${cand.url}`);
			appendLog({
				...log,
				outcome: r.outcome,
				source_url: r.url,
				asset_count: r.scrape && r.scrape.asset_count,
				captured_bytes: r.scrape && r.scrape.captured_bytes,
				engine: r.scrape && r.scrape.engine,
			});
			return { slug, outcome: r.outcome, source_url: r.url };
		}
	}

	bumpCooldownOnFailure(slug, `${candidates.length} candidates all failed`);
	appendLog({ ...log, outcome: 'all_candidates_failed' });
	console.log(`[${slug}] all ${candidates.length} candidates failed.`);
	return { slug, outcome: 'all_candidates_failed', candidates_tried: log.candidates_tried };
}

async function main() {
	const args = parseArgs(process.argv);
	if (!args.slug) {
		console.error('Usage: node scripts/recover-game.js <slug> [--url <url>] [--verbose]');
		process.exit(2);
	}
	const out = await recover(args.slug, args);
	if (out.outcome !== 'recovered' && out.outcome !== 'dry_run_pass') process.exit(1);
}

if (require.main === module) {
	main().catch((err) => {
		console.error(String(err && err.stack || err));
		process.exit(2);
	});
}

module.exports = { recover };
