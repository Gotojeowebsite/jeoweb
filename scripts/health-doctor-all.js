#!/usr/bin/env node
// scripts/health-doctor-all.js
//
// Game Health Doctor — batch driver. "Audit every game" mode.
//
// Cohort = union of:
//   (a) every game_health.json entry with verdict='broken' (signal-driven, not override)
//   (b) every Assets/<slug>/ folder whose entry HTML fails the byte gate
//       (catches OvO-class silent failures that the old detector marked as
//       healthy — these are exactly the games the user complained about).
//
// Each slug is shelled out to scripts/health-doctor.js (per-slug orchestrator)
// in a worker pool. Per-run summary written to reports/doctor/summary-<date>.json.
//
// CLI:
//   node scripts/health-doctor-all.js                  # default 3 workers
//   node scripts/health-doctor-all.js --workers 6
//   node scripts/health-doctor-all.js --max 25
//   node scripts/health-doctor-all.js --time-budget 90m
//   node scripts/health-doctor-all.js --broken-only    # skip the byte-gate suspect sweep
//   node scripts/health-doctor-all.js --audit-only     # diagnose, never operate
//   node scripts/health-doctor-all.js --include-cooldowns

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');
const DOCTOR_DIR = path.join(REPORTS_DIR, 'doctor');
const COOLDOWN_PATH = path.join(REPORTS_DIR, 'recovery_cooldown.json');

const { byteGate } = require('./health/diagnose');

function parseArgs(argv) {
	const args = {
		workers: 3,
		max: Infinity,
		timeBudgetMs: Infinity,
		brokenOnly: false,
		auditOnly: false,
		includeCooldowns: false,
		perGameTimeoutMs: 10 * 60_000,
		verbose: false,
		force: false,
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--workers') args.workers = Math.max(1, Number(argv[++i]) || args.workers);
		else if (a === '--max') args.max = Math.max(1, Number(argv[++i]) || args.max);
		else if (a === '--time-budget') args.timeBudgetMs = parseDuration(argv[++i]);
		else if (a === '--per-game-timeout') args.perGameTimeoutMs = parseDuration(argv[++i]);
		else if (a === '--broken-only') args.brokenOnly = true;
		else if (a === '--audit-only') args.auditOnly = true;
		else if (a === '--include-cooldowns') args.includeCooldowns = true;
		else if (a === '--force') args.force = true;
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

// (a) Signal-driven broken slugs from game_health.json.
function listSignalBrokenSlugs() {
	const data = readJsonSafe(path.join(ROOT, 'game_health.json'), null);
	const out = [];
	if (!data || !data.games || typeof data.games !== 'object') return out;
	for (const [slug, entry] of Object.entries(data.games)) {
		// Skip override-driven broken (force_maintenance) — those are
		// operator decisions, not surgery targets.
		if (entry && entry.verdict === 'broken' && entry.source !== 'override') {
			out.push(slug);
		}
	}
	return out;
}

// (b) Byte-gate suspect sweep: every slug whose entry HTML can't possibly be
// a working game. Catches OvO-class silent failures.
function listByteGateSuspectSlugs() {
	const out = [];
	let entries;
	try { entries = fs.readdirSync(ASSETS_DIR, { withFileTypes: true }); }
	catch { return out; }
	for (const ent of entries) {
		if (!ent.isDirectory()) continue;
		const slug = ent.name;
		if (slug.startsWith('.')) continue;  // .quarantine, .recovery
		const folder = path.join(ASSETS_DIR, slug);
		const g = byteGate(folder);
		if (!g.ok) out.push(slug);
	}
	return out;
}

function listCooldowns() { return readJsonSafe(COOLDOWN_PATH, {}); }

function isCooldownActive(entry) {
	if (!entry || !entry.next_eligible) return false;
	return Math.floor(Date.now() / 1000) < Number(entry.next_eligible);
}

function runDoctor(slug, args) {
	return new Promise((resolve) => {
		const cli = [path.join(__dirname, 'health-doctor.js'), slug];
		if (args.auditOnly) cli.push('--audit-only');
		if (args.force) cli.push('--force');
		if (args.verbose) cli.push('--verbose');
		const start = Date.now();
		const proc = spawn(process.execPath, cli, {
			cwd: ROOT,
			stdio: args.verbose ? 'inherit' : ['ignore', 'pipe', 'pipe'],
		});
		let stdout = '', stderr = '';
		if (proc.stdout) proc.stdout.on('data', (d) => { stdout += d.toString(); });
		if (proc.stderr) proc.stderr.on('data', (d) => { stderr += d.toString(); });
		const watchdog = setTimeout(() => {
			try { proc.kill('SIGKILL'); } catch {}
		}, args.perGameTimeoutMs);
		proc.on('exit', (code) => {
			clearTimeout(watchdog);
			const ms = Date.now() - start;
			// health-doctor.js: exit 0 on healthy/recovered, 1 on still-broken/surgery-failed.
			const outcome = code === 0 ? 'ok' : (ms >= args.perGameTimeoutMs ? 'timeout' : 'broken');
			resolve({
				slug, outcome, exit_code: code, ms,
				stdout_tail: stdout.split('\n').slice(-8).join('\n'),
				stderr_tail: stderr.split('\n').slice(-8).join('\n'),
			});
		});
		proc.on('error', (err) => {
			clearTimeout(watchdog);
			resolve({ slug, outcome: 'spawn_error', error: err.message, ms: Date.now() - start });
		});
	});
}

async function main() {
	const args = parseArgs(process.argv);

	const signalBroken = listSignalBrokenSlugs();
	const byteSuspect = args.brokenOnly ? [] : listByteGateSuspectSlugs();
	// Union of the two cohorts, dedup, sorted for stable output.
	const cohort = [...new Set([...signalBroken, ...byteSuspect])].sort();

	const cooldowns = listCooldowns();
	const queue = [];
	const skipped = [];
	for (const slug of cohort) {
		if (!args.includeCooldowns && !args.auditOnly && isCooldownActive(cooldowns[slug])) {
			skipped.push({ slug, reason: 'cooldown', next_eligible: cooldowns[slug].next_eligible });
			continue;
		}
		queue.push(slug);
	}
	if (queue.length > args.max) queue.length = args.max;

	console.log(`health-doctor-all: ${cohort.length} total (${signalBroken.length} signal-broken + ${byteSuspect.length} byte-suspect), ${skipped.length} in cooldown, ${queue.length} queued (workers=${args.workers})`);
	if (!queue.length) {
		writeSummary([], skipped, signalBroken, byteSuspect, args);
		console.log('Nothing to do.');
		return;
	}

	const results = [];
	const startWall = Date.now();
	let idx = 0;
	const active = new Set();

	const next = async () => {
		if (Date.now() - startWall >= args.timeBudgetMs) return null;
		if (idx >= queue.length) return null;
		const slug = queue[idx++];
		const p = runDoctor(slug, args).then((r) => {
			results.push(r);
			active.delete(p);
			const pct = Math.round((results.length / queue.length) * 100);
			console.log(`  [${results.length}/${queue.length} ${pct}%] ${slug}: ${r.outcome} (${(r.ms / 1000).toFixed(1)}s)`);
		});
		active.add(p);
		return p;
	};

	// Prime the pool without awaiting — otherwise the for-loop serializes
	// the workers. next() resolves with the worker's Promise, but we don't
	// need to wait for the worker to finish before spawning the next one.
	for (let i = 0; i < args.workers; i++) next();
	while (active.size) {
		await Promise.race(active);
		next();
	}

	writeSummary(results, skipped, signalBroken, byteSuspect, args);
	const okCount = results.filter((r) => r.outcome === 'ok').length;
	const brokenCount = results.filter((r) => r.outcome === 'broken').length;
	const timeoutCount = results.filter((r) => r.outcome === 'timeout').length;
	console.log('\nDone.');
	console.log(`  ok (healthy/recovered): ${okCount}`);
	console.log(`  still broken:           ${brokenCount}`);
	console.log(`  timed out:              ${timeoutCount}`);
	console.log(`  cooldown skipped:       ${skipped.length}`);
}

function writeSummary(results, skipped, signalBroken, byteSuspect, args) {
	try { fs.mkdirSync(DOCTOR_DIR, { recursive: true }); } catch {}
	const datestamp = new Date().toISOString().slice(0, 10);
	const outPath = path.join(DOCTOR_DIR, `summary-${datestamp}.json`);
	const counts = {
		attempted: results.length,
		ok: results.filter((r) => r.outcome === 'ok').length,
		broken: results.filter((r) => r.outcome === 'broken').length,
		timeout: results.filter((r) => r.outcome === 'timeout').length,
		spawn_error: results.filter((r) => r.outcome === 'spawn_error').length,
		cooldown_skipped: skipped.length,
		signal_broken_total: signalBroken.length,
		byte_suspect_total: byteSuspect.length,
	};
	const out = {
		schema: 1,
		generated_at: Math.floor(Date.now() / 1000),
		mode: args.auditOnly ? 'audit-only' : 'surgery',
		counts,
		results,
		skipped,
	};
	fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
	console.log(`Summary: ${path.relative(ROOT, outPath)}`);
}

if (require.main === module) {
	main().catch((e) => { console.error(String(e && e.stack || e)); process.exit(1); });
}
