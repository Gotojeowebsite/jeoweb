#!/usr/bin/env node
// Rolling re-validation: pick N healthy slugs whose `last_verified_at` is
// oldest and re-run the offline + headless scanners against just those.
// Then rebuild game_health.json so the fresh signals fold in.
//
// Goal: keep healthy verdicts honest. A game we marked `healthy/high` six
// months ago might be broken today (CDN deprecation, third-party shim
// outage, browser-API breakage). The triple-confirm contract demands real
// evidence, not historical evidence.
//
// Usage:
//   node scripts/recheck-healthy.js                 # default: 50 oldest
//   node scripts/recheck-healthy.js --max 100
//   node scripts/recheck-healthy.js --max 25 --max-age-days 7
//   node scripts/recheck-healthy.js --profile chromium-no-gpu
//   node scripts/recheck-healthy.js --dry-run
//
// The selection prioritizes:
//   1. healthy slugs whose `last_verified_at` is older than --max-age-days
//      (default 14d). Wraparound case: any with no last_verified_at fall
//      into this bucket too.
//   2. broken / probable_broken / unverified slugs whose last_verified_at
//      is older than 7 days (these need re-confirmation, not just
//      "is healthy still healthy?").
//
// Writes:
//   reports/recheck_<date>.json — what was selected + per-slug outcome
//   scan_results.json (via broken_game_scanner.py --only-from ...)
//   game_health.json (via build-game-health.js)

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PATH_HEALTH = path.join(ROOT, 'game_health.json');
const PATH_REPORTS = path.join(ROOT, 'reports');

function parseArgs(argv) {
	const args = {
		max: 50,
		maxAgeDays: 14,
		stalePassDays: 7,
		profile: 'chromium-default',
		dryRun: false,
		runScanner: true,
		runHealthRefresh: true,
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--max') args.max = Math.max(1, Number(argv[++i]) || 50);
		else if (a === '--max-age-days') args.maxAgeDays = Math.max(1, Number(argv[++i]) || 14);
		else if (a === '--stale-pass-days') args.stalePassDays = Math.max(1, Number(argv[++i]) || 7);
		else if (a === '--profile') args.profile = String(argv[++i] || 'chromium-default');
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--no-scanner') args.runScanner = false;
		else if (a === '--no-health-refresh') args.runHealthRefresh = false;
		else if (a === '--help' || a === '-h') args.help = true;
	}
	return args;
}

function help() {
	console.log('Usage: node scripts/recheck-healthy.js [--max N] [--max-age-days N] [--stale-pass-days N]');
	console.log('                                       [--profile <chromium-default|chromium-no-gpu>]');
	console.log('                                       [--dry-run] [--no-scanner] [--no-health-refresh]');
	console.log('');
	console.log('Default: 50 oldest healthy slugs older than 14 days + non-healthy slugs older than 7 days.');
}

function selectSlugs(health, args) {
	const now = Math.floor(Date.now() / 1000);
	const maxAgeCutoff = now - args.maxAgeDays * 24 * 3600;
	const stalePassCutoff = now - args.stalePassDays * 24 * 3600;

	const all = Object.entries(health.games || {})
		.map(([slug, entry]) => ({
			slug,
			verdict: entry.verdict || 'unknown',
			confidence: entry.confidence || 'low',
			last_verified_at: Number(entry.last_verified_at) || 0,
			source: entry.source || 'signals',
		}))
		// Skip override entries (admin-controlled) and recovery-engine system
		// folders (.quarantine, .recovery, anything starting with "."). The
		// scanner can't run against these — they're meta-state, not real games.
		.filter((e) => e.source !== 'override')
		.filter((e) => !e.slug.startsWith('.'));

	// Tier A: stale healthy verdicts (need re-confirmation).
	const tierA = all
		.filter((e) => e.verdict === 'healthy' && e.last_verified_at < maxAgeCutoff)
		.sort((a, b) => a.last_verified_at - b.last_verified_at);

	// Tier B: stale non-healthy verdicts (broken / probable_broken / unverified
	// / unknown). These deserve a re-look at higher cadence than healthy so we
	// don't leave games marked broken indefinitely on transient signals.
	const tierB = all
		.filter((e) => e.verdict !== 'healthy' && e.last_verified_at < stalePassCutoff)
		.sort((a, b) => a.last_verified_at - b.last_verified_at);

	// Interleave 60/40 so we don't starve either tier.
	const picked = [];
	const seenSlugs = new Set();
	let ia = 0;
	let ib = 0;
	while (picked.length < args.max) {
		const fromA = picked.length % 5 < 3; // 3 out of every 5 from tier A
		const pool = fromA ? tierA : tierB;
		const idx = fromA ? ia : ib;
		if (idx >= pool.length) {
			// Fall back to the other pool.
			const otherPool = fromA ? tierB : tierA;
			const otherIdx = fromA ? ib : ia;
			if (otherIdx >= otherPool.length) break;
			const cand = otherPool[otherIdx];
			if (fromA) ib += 1; else ia += 1;
			if (seenSlugs.has(cand.slug)) continue;
			seenSlugs.add(cand.slug);
			picked.push(cand);
			continue;
		}
		const cand = pool[idx];
		if (fromA) ia += 1; else ib += 1;
		if (seenSlugs.has(cand.slug)) continue;
		seenSlugs.add(cand.slug);
		picked.push(cand);
	}
	return { picked, tierAtotal: tierA.length, tierBtotal: tierB.length };
}

function runScanner(slugList, args) {
	if (!slugList.length) return { ok: true, skipped: true };
	const slugFile = path.join(PATH_REPORTS, `recheck_${new Date().toISOString().slice(0, 10)}_slugs.json`);
	const payload = { generated_at: Math.floor(Date.now() / 1000), slugs: slugList };
	fs.mkdirSync(PATH_REPORTS, { recursive: true });
	fs.writeFileSync(slugFile, JSON.stringify(payload, null, 2));

	const scannerArgs = [
		'broken_game_scanner.py',
		'--only-from', path.relative(ROOT, slugFile),
		'--profile', args.profile,
		'--sync-markers',
	];
	console.log(`running: python3 ${scannerArgs.join(' ')}`);
	const r = spawnSync('python3', scannerArgs, { cwd: ROOT, stdio: 'inherit' });
	return { ok: r.status === 0, exitCode: r.status };
}

function runHealthRefresh() {
	console.log('running: node scripts/build-game-health.js');
	const r = spawnSync('node', ['scripts/build-game-health.js'], { cwd: ROOT, stdio: 'inherit' });
	return { ok: r.status === 0, exitCode: r.status };
}

function main() {
	const args = parseArgs(process.argv);
	if (args.help) { help(); return; }

	const health = (() => {
		try { return JSON.parse(fs.readFileSync(PATH_HEALTH, 'utf-8')); }
		catch { return { games: {} }; }
	})();
	if (!health.games || !Object.keys(health.games).length) {
		console.error('game_health.json is empty or missing; run `npm run health:refresh` first');
		process.exit(1);
	}

	const { picked, tierAtotal, tierBtotal } = selectSlugs(health, args);
	console.log(`recheck-healthy:`);
	console.log(`  tier A (stale healthy, > ${args.maxAgeDays}d):  ${tierAtotal} total`);
	console.log(`  tier B (stale non-healthy, > ${args.stalePassDays}d): ${tierBtotal} total`);
	console.log(`  picked ${picked.length}/${args.max} for re-scan (3:2 A:B interleave)`);
	for (const p of picked.slice(0, 20)) {
		const ageStr = p.last_verified_at
			? `${Math.round((Date.now() / 1000 - p.last_verified_at) / 86400)}d ago`
			: 'never';
		console.log(`    ${p.slug} (verdict=${p.verdict}/${p.confidence}, last_verified=${ageStr})`);
	}
	if (picked.length > 20) console.log(`    ... and ${picked.length - 20} more`);

	const reportPath = path.join(PATH_REPORTS, `recheck_${new Date().toISOString().slice(0, 10)}.json`);
	const report = {
		generated_at: Math.floor(Date.now() / 1000),
		max: args.max,
		max_age_days: args.maxAgeDays,
		stale_pass_days: args.stalePassDays,
		profile: args.profile,
		tier_a_total: tierAtotal,
		tier_b_total: tierBtotal,
		picked_count: picked.length,
		picked,
	};
	fs.mkdirSync(PATH_REPORTS, { recursive: true });
	fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
	console.log(`wrote ${path.relative(ROOT, reportPath)}`);

	if (args.dryRun) {
		console.log('--dry-run: skipping scanner + health refresh');
		return;
	}

	if (args.runScanner) {
		const slugs = picked.map((p) => p.slug);
		const scan = runScanner(slugs, args);
		if (!scan.ok) {
			console.warn(`scanner exited with code ${scan.exitCode}; continuing to health refresh anyway`);
		}
	}

	if (args.runHealthRefresh) {
		const refresh = runHealthRefresh();
		if (!refresh.ok) {
			console.error(`health refresh failed with code ${refresh.exitCode}`);
			process.exit(refresh.exitCode || 1);
		}
	}
}

if (require.main === module) {
	main();
}

module.exports = { selectSlugs };
