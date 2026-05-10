#!/usr/bin/env node
// scripts/recover-all-broken.js — batch driver for the new recovery engine.
//
// Reads game_health.json, takes every slug with verdict="broken", filters
// out cooldown'd slugs, and runs scripts/recover-game.js in parallel workers.
// Writes reports/recovery_summary_<date>.json.
//
// CLI:
//   node scripts/recover-all-broken.js                # default 3 workers
//   node scripts/recover-all-broken.js --workers 6
//   node scripts/recover-all-broken.js --max 25
//   node scripts/recover-all-broken.js --time-budget 90m
//   node scripts/recover-all-broken.js --include-cooldowns
//   node scripts/recover-all-broken.js --skip-scanner # only manifest gate
//
// This script is what nightly CI (qa-nightly.yml) and the one-shot
// remediation pass call.

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const COOLDOWN_PATH = path.join(REPORTS_DIR, 'recovery_cooldown.json');

function parseArgs(argv) {
	const args = {
		workers: 3,
		max: Infinity,
		timeBudgetMs: Infinity,
		includeCooldowns: false,
		skipScanner: false,
		perGameTimeoutMs: 10 * 60_000,
		verbose: false,
		extraArgs: [],
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--workers') args.workers = Math.max(1, Number(argv[++i]) || args.workers);
		else if (a === '--max') args.max = Math.max(1, Number(argv[++i]) || args.max);
		else if (a === '--time-budget') args.timeBudgetMs = parseDuration(argv[++i]);
		else if (a === '--per-game-timeout') args.perGameTimeoutMs = parseDuration(argv[++i]);
		else if (a === '--include-cooldowns') args.includeCooldowns = true;
		else if (a === '--skip-scanner') args.skipScanner = true;
		else if (a === '--verbose' || a === '-v') args.verbose = true;
	}
	return args;
}

function parseDuration(s) {
	if (!s) return Infinity;
	const m = String(s).match(/^(\d+)(ms|s|m|h|d)?$/);
	if (!m) return Infinity;
	const n = Number(m[1]);
	const unit = m[2] || 'ms';
	const mult = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[unit];
	return n * mult;
}

function readJsonSafe(p, fallback) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return fallback; }
}

function listBrokenSlugs() {
	const data = readJsonSafe(path.join(ROOT, 'game_health.json'), null);
	const out = [];
	if (!data || !data.games || typeof data.games !== 'object') return out;
	for (const [slug, entry] of Object.entries(data.games)) {
		if (entry && entry.verdict === 'broken' && entry.source !== 'override') out.push(slug);
	}
	out.sort();
	return out;
}

function listCooldowns() {
	return readJsonSafe(COOLDOWN_PATH, {});
}

function isCooldownActive(entry) {
	if (!entry || !entry.next_eligible) return false;
	return Math.floor(Date.now() / 1000) < Number(entry.next_eligible);
}

function runOne(slug, args) {
	return new Promise((resolve) => {
		const cli = [path.join(__dirname, 'recover-game.js'), slug];
		if (args.skipScanner) cli.push('--skip-scanner');
		if (args.verbose) cli.push('--verbose');
		if (args.includeCooldowns) cli.push('--ignore-cooldown');
		const start = Date.now();
		const proc = spawn(process.execPath, cli, {
			cwd: ROOT,
			stdio: args.verbose ? 'inherit' : ['ignore', 'pipe', 'pipe'],
		});
		let stdout = '', stderr = '';
		if (proc.stdout) proc.stdout.on('data', d => { stdout += d.toString(); });
		if (proc.stderr) proc.stderr.on('data', d => { stderr += d.toString(); });
		const watchdog = setTimeout(() => {
			try { proc.kill('SIGKILL'); } catch {}
		}, args.perGameTimeoutMs);
		proc.on('exit', (code) => {
			clearTimeout(watchdog);
			const ms = Date.now() - start;
			// recover-game.js exits 0 on recovered/dry_run_pass and 1 on
			// failure; either way the slug-level log lives in recovery_log.jsonl.
			const outcome = code === 0 ? 'recovered' : (ms >= args.perGameTimeoutMs ? 'timeout' : 'failed');
			resolve({ slug, outcome, exit_code: code, ms, stdout_tail: stdout.split('\n').slice(-6).join('\n'), stderr_tail: stderr.split('\n').slice(-6).join('\n') });
		});
		proc.on('error', (err) => {
			clearTimeout(watchdog);
			resolve({ slug, outcome: 'spawn_error', error: err.message, ms: Date.now() - start });
		});
	});
}

async function main() {
	const args = parseArgs(process.argv);
	const allBroken = listBrokenSlugs();
	const cooldowns = listCooldowns();

	const queue = [];
	const skipped = [];
	for (const slug of allBroken) {
		if (!args.includeCooldowns && isCooldownActive(cooldowns[slug])) {
			skipped.push({ slug, reason: 'cooldown', next_eligible: cooldowns[slug].next_eligible });
			continue;
		}
		queue.push(slug);
	}
	if (queue.length > args.max) queue.length = args.max;

	console.log(`recover-all-broken: ${allBroken.length} broken total, ${skipped.length} in cooldown, ${queue.length} to attempt (workers=${args.workers})`);
	if (!queue.length) {
		try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
		const out = {
			schema: 1, generated_at: Math.floor(Date.now() / 1000),
			counts: { attempted: 0, recovered: 0, failed: 0, timeout: 0, cooldown_skipped: skipped.length },
			results: [], failed: [], skipped,
		};
		const datestamp = new Date().toISOString().slice(0, 10);
		const outPath = path.join(REPORTS_DIR, `recovery_summary_${datestamp}.json`);
		fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
		console.log(`Nothing to do. Summary: ${path.relative(ROOT, outPath)}`);
		return;
	}

	const results = [];
	const recovered = [];
	const failed = [];
	const startWall = Date.now();
	let idx = 0;
	const active = new Set();

	const next = async () => {
		if (Date.now() - startWall >= args.timeBudgetMs) return null;
		if (idx >= queue.length) return null;
		const slug = queue[idx++];
		const p = runOne(slug, args).then((r) => {
			results.push(r);
			active.delete(p);
			if (r.outcome === 'recovered') recovered.push(r);
			else failed.push(r);
			const pct = Math.round((results.length / queue.length) * 100);
			console.log(`  [${results.length}/${queue.length} ${pct}%] ${slug}: ${r.outcome} (${(r.ms / 1000).toFixed(1)}s)`);
		});
		active.add(p);
		return p;
	};

	// Fill the pool then drain.
	for (let i = 0; i < args.workers; i++) await next();
	while (active.size) {
		await Promise.race(active);
		await next();
	}

	const datestamp = new Date().toISOString().slice(0, 10);
	const out = {
		schema: 1,
		generated_at: Math.floor(Date.now() / 1000),
		counts: {
			attempted: results.length,
			recovered: recovered.length,
			failed: failed.filter(r => r.outcome === 'failed').length,
			timeout: failed.filter(r => r.outcome === 'timeout').length,
			cooldown_skipped: skipped.length,
		},
		results,
		failed,
		recovered,
		skipped,
	};
	try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
	const outPath = path.join(REPORTS_DIR, `recovery_summary_${datestamp}.json`);
	fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
	console.log('\nDone.');
	console.log(`  recovered:        ${out.counts.recovered}`);
	console.log(`  failed:           ${out.counts.failed}`);
	console.log(`  timed out:        ${out.counts.timeout}`);
	console.log(`  cooldown skipped: ${out.counts.cooldown_skipped}`);
	console.log(`Summary: ${path.relative(ROOT, outPath)}`);
}

if (require.main === module) {
	main().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
}
