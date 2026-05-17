#!/usr/bin/env node
// scripts/health-doctor.js
//
// Game Health Doctor — diagnose → surgery → re-diagnose loop for a single slug.
//
// Flow:
//   1. deepDiagnose(slug) → write reports/doctor/diagnose-<slug>-pre.json
//   2. If diag1.ok && !args.force: log "skip" and exit 0
//   3. (unless --audit-only) recover(slug, { doctorMode: true, ... })
//   4. deepDiagnose(slug) → write reports/doctor/diagnose-<slug>-post.json
//   5. Compare diag1 vs diag2:
//        diag2.ok                   → log "recovered"  exit 0
//        diag2 still failing        → restore from quarantine, log "rolled_back_by_doctor"
//        surgery never recovered    → log "surgery_failed"
//
// CLI:
//   node scripts/health-doctor.js <slug>                       # full doctor
//   node scripts/health-doctor.js <slug> --audit-only          # diagnose only
//   node scripts/health-doctor.js <slug> --force               # surgery even if diag1 ok
//   node scripts/health-doctor.js <slug> --verbose
//   node scripts/health-doctor.js <slug> --url <portal-url>    # passthrough to recover-game
//   node scripts/health-doctor.js <slug> --max-candidates 8    # passthrough

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');
const DOCTOR_DIR = path.join(REPORTS_DIR, 'doctor');
const LOG_PATH = path.join(REPORTS_DIR, 'recovery_log.jsonl');

const { deepDiagnose } = require('./health/diagnose');
const { recover } = require('./recover-game');

function parseArgs(argv) {
	const args = {
		slug: null,
		auditOnly: false,
		force: false,
		verbose: false,
		passthrough: [],
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (!a.startsWith('--') && !args.slug) { args.slug = a; continue; }
		if (a === '--audit-only') args.auditOnly = true;
		else if (a === '--force') args.force = true;
		else if (a === '--verbose' || a === '-v') args.verbose = true;
		else if (a === '--help' || a === '-h') {
			console.log('Usage: node scripts/health-doctor.js <slug> [--audit-only] [--force] [--verbose] [recover-game flags…]');
			process.exit(0);
		}
		else args.passthrough.push(a);
	}
	return args;
}

function ensureReports() {
	try { fs.mkdirSync(DOCTOR_DIR, { recursive: true }); } catch {}
	try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
}

function writeJson(p, obj) {
	try {
		fs.writeFileSync(p, JSON.stringify(obj, null, 2));
	} catch (e) {
		console.warn(`failed to write ${p}: ${e.message}`);
	}
}

function appendLog(entry) {
	ensureReports();
	try {
		fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n');
	} catch (e) {
		console.warn(`failed to append ${LOG_PATH}: ${e.message}`);
	}
}

// Mirror of recover-game.js#parseArgs but only the flags we accept as
// passthrough. Anything unknown is dropped silently — doctor is the
// orchestrator, not an option-multiplexer.
function buildRecoverArgs(passthrough, verbose) {
	const args = {
		slug: null,
		url: null,
		verbose,
		ignoreCooldown: true,           // doctor explicitly chose to operate; don't let cooldown skip
		maxCandidates: 8,
		skipScanner: false,
		dryRun: false,
		perCandidateTimeoutMs: 180_000,
		searchTimeoutMs: 10_000,
		fuzzy: true,
		fuzzyThreshold: 0.55,
		strictShape: false,
		skipPostSwapValidation: false,
		doctorMode: true,
	};
	for (let i = 0; i < passthrough.length; i++) {
		const a = passthrough[i];
		if (a === '--url') args.url = passthrough[++i];
		else if (a === '--max-candidates') args.maxCandidates = Number(passthrough[++i]) || args.maxCandidates;
		else if (a === '--candidate-timeout-ms') args.perCandidateTimeoutMs = Number(passthrough[++i]) || args.perCandidateTimeoutMs;
		else if (a === '--search-timeout-ms') args.searchTimeoutMs = Number(passthrough[++i]) || args.searchTimeoutMs;
		else if (a === '--no-fuzzy') args.fuzzy = false;
		else if (a === '--fuzzy-threshold') {
			const v = Number(passthrough[++i]);
			if (Number.isFinite(v)) args.fuzzyThreshold = Math.max(0, Math.min(1, v));
		}
		else if (a === '--strict-shape') args.strictShape = true;
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--skip-scanner') args.skipScanner = true;  // legacy escape hatch
	}
	return args;
}

// Find the latest quarantine snapshot for a slug. Used to roll back when
// post-swap diagnose still fails.
function findLatestQuarantine(slug) {
	const q = path.join(ASSETS_DIR, '.quarantine');
	let entries;
	try { entries = fs.readdirSync(q); } catch { return null; }
	const candidates = entries
		.filter((n) => n.startsWith(`${slug}-`))
		.map((n) => ({ name: n, full: path.join(q, n) }))
		.filter((c) => { try { return fs.statSync(c.full).isDirectory(); } catch { return false; } })
		.sort((a, b) => b.name.localeCompare(a.name));
	return candidates[0] ? candidates[0].full : null;
}

function doctorRollback(slug, verbose) {
	const quarantineDir = findLatestQuarantine(slug);
	if (!quarantineDir) return { ok: false, reason: 'no_quarantine_found' };
	try {
		const { restoreFromQuarantine } = require('./recovery/atomic-swap');
		restoreFromQuarantine(slug, quarantineDir);
		if (verbose) console.log(`[${slug}] rolled back from ${quarantineDir}`);
		return { ok: true, restored_from: quarantineDir };
	} catch (e) {
		return { ok: false, reason: `restore_failed:${e.message}` };
	}
}

async function main() {
	const args = parseArgs(process.argv);
	if (!args.slug) {
		console.error('Usage: node scripts/health-doctor.js <slug> [--audit-only] [--force] [--verbose]');
		process.exit(2);
	}
	const slug = args.slug;
	ensureReports();

	const ts = Math.floor(Date.now() / 1000);
	console.log(`[${slug}] doctor: diagnose (pre-surgery)…`);
	const diag1 = await deepDiagnose(slug, { verbose: args.verbose });
	const prePath = path.join(DOCTOR_DIR, `diagnose-${slug}-pre.json`);
	writeJson(prePath, { slug, at: ts, ...diag1 });
	console.log(`[${slug}] diag1: ${diag1.ok ? 'OK' : 'BROKEN'}${diag1.codes.length ? ` (${diag1.codes.join(', ')})` : ''}  → ${path.relative(ROOT, prePath)}`);

	// Audit-only: never operate, just report.
	if (args.auditOnly) {
		appendLog({ slug, at: ts, phase: 'audit', diag1 });
		process.exit(diag1.ok ? 0 : 1);
	}

	// Already healthy and not forced: no surgery needed.
	if (diag1.ok && !args.force) {
		appendLog({ slug, at: ts, phase: 'skip_healthy', diag1 });
		console.log(`[${slug}] already healthy, nothing to do (use --force to re-recover anyway)`);
		process.exit(0);
	}

	console.log(`[${slug}] doctor: surgery (recover-game in doctor-mode)…`);
	const recoverArgs = buildRecoverArgs(args.passthrough, args.verbose);
	let op;
	try {
		op = await recover(slug, recoverArgs);
	} catch (e) {
		op = { outcome: 'recover_threw', error: String(e && e.message || e) };
	}
	console.log(`[${slug}] surgery outcome: ${op.outcome}${op.source_url ? ` (from ${op.source_url})` : ''}`);

	console.log(`[${slug}] doctor: diagnose (post-surgery)…`);
	const diag2 = await deepDiagnose(slug, { verbose: args.verbose });
	const postPath = path.join(DOCTOR_DIR, `diagnose-${slug}-post.json`);
	writeJson(postPath, { slug, at: Math.floor(Date.now() / 1000), ...diag2 });
	console.log(`[${slug}] diag2: ${diag2.ok ? 'OK' : 'STILL BROKEN'}${diag2.codes.length ? ` (${diag2.codes.join(', ')})` : ''}  → ${path.relative(ROOT, postPath)}`);

	// Decision matrix.
	if (diag2.ok) {
		// Surgery worked OR the live folder was already healthy and we forced
		// the surgery on a no-op. Either way, log success.
		appendLog({
			slug, at: Math.floor(Date.now() / 1000),
			phase: 'recovered',
			diag1: { ok: diag1.ok, codes: diag1.codes },
			diag2: { ok: diag2.ok, codes: diag2.codes },
			op: { outcome: op.outcome, source_url: op.source_url || null },
		});
		console.log(`[${slug}] ✅ RECOVERED`);
		process.exit(0);
	}

	// Post-swap diagnose still failing.
	if (op.outcome === 'recovered' || op.outcome === 'dry_run_pass') {
		// We swapped something in, but the doctor disagrees with the
		// candidate scanner. Roll back to whatever was there before so we
		// don't leave the user with a different-flavor of broken.
		const rb = doctorRollback(slug, args.verbose);
		appendLog({
			slug, at: Math.floor(Date.now() / 1000),
			phase: 'rolled_back_by_doctor',
			diag1: { ok: diag1.ok, codes: diag1.codes },
			diag2: { ok: diag2.ok, codes: diag2.codes },
			op: { outcome: op.outcome, source_url: op.source_url || null },
			rollback: rb,
		});
		console.error(`[${slug}] ⚠️  surgery completed but post-diagnose still failing — rolled back (${rb.ok ? 'ok' : rb.reason})`);
		process.exit(1);
	}

	// Surgery never recovered (no candidates, all failed, cooldown skipped, etc.).
	appendLog({
		slug, at: Math.floor(Date.now() / 1000),
		phase: 'surgery_failed',
		diag1: { ok: diag1.ok, codes: diag1.codes },
		diag2: { ok: diag2.ok, codes: diag2.codes },
		op: { outcome: op.outcome, error: op.error || null },
	});
	console.error(`[${slug}] ❌ surgery did not recover (${op.outcome})`);
	process.exit(1);
}

if (require.main === module) {
	main().catch((err) => {
		console.error(String(err && err.stack || err));
		process.exit(2);
	});
}

module.exports = { main };
