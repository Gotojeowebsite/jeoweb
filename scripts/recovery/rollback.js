#!/usr/bin/env node
// Roll back the most recent atomic swap for one slug.
//
// Reads Assets/.quarantine/<slug>-<ts>/, picks the newest snapshot, and
// restores it as Assets/<slug>/. Use after a fuzzy-match recovery that
// turned out to be the wrong game, or after post-swap re-validation
// (Phase 3 follow-up) auto-rolls back a swap whose new folder still
// fails the verifier.
//
// Usage:
//   node scripts/recovery/rollback.js <slug>
//   node scripts/recovery/rollback.js <slug> --timestamp 20260517-001234
//   node scripts/recovery/rollback.js <slug> --dry-run
//
// On success, prints which quarantine snapshot was restored. Does not
// touch game_health.json or any signal files — the next health refresh
// will pick up that the folder changed.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const QUARANTINE_DIR = path.join(ASSETS_DIR, '.quarantine');

const { restoreFromQuarantine, moveToQuarantine } = require('./atomic-swap');

function parseArgs(argv) {
	const out = { slug: null, timestamp: null, dryRun: false, force: false, help: false };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--dry-run') out.dryRun = true;
		else if (a === '--force') out.force = true;
		else if (a === '-h' || a === '--help') out.help = true;
		else if (a === '--timestamp') { out.timestamp = argv[++i]; }
		else if (!out.slug && !a.startsWith('-')) out.slug = a;
	}
	return out;
}

function listSnapshots(slug) {
	if (!fs.existsSync(QUARANTINE_DIR)) return [];
	const prefix = `${slug}-`;
	return fs.readdirSync(QUARANTINE_DIR)
		.filter((name) => name.startsWith(prefix))
		.map((name) => {
			const full = path.join(QUARANTINE_DIR, name);
			let mtimeMs = 0;
			try { mtimeMs = fs.statSync(full).mtimeMs; } catch { /* ignore */ }
			return {
				name,
				path: full,
				timestamp: name.slice(prefix.length),
				mtimeMs,
			};
		})
		.sort((a, b) => b.mtimeMs - a.mtimeMs);
}

function pickSnapshot(snapshots, timestamp) {
	if (!snapshots.length) return null;
	if (timestamp) return snapshots.find((s) => s.timestamp === timestamp) || null;
	return snapshots[0];
}

function help() {
	console.log('Usage: node scripts/recovery/rollback.js <slug> [--timestamp <ts>] [--dry-run] [--force]');
	console.log('');
	console.log('  --timestamp <ts>   Restore a specific quarantined snapshot (default: newest)');
	console.log('  --dry-run          Print what would be restored, do not move files');
	console.log('  --force            Restore even if Assets/<slug>/ currently exists');
	console.log('                     (current folder is moved to a fresh quarantine snapshot first)');
}

function main() {
	const args = parseArgs(process.argv);
	if (args.help || !args.slug) {
		help();
		process.exit(args.help ? 0 : 1);
	}
	const slug = args.slug;
	const snapshots = listSnapshots(slug);
	if (!snapshots.length) {
		console.error(`no quarantine snapshots found for slug "${slug}" under Assets/.quarantine/`);
		process.exit(2);
	}
	const pick = pickSnapshot(snapshots, args.timestamp);
	if (!pick) {
		console.error(`no quarantine snapshot matches timestamp "${args.timestamp}"`);
		console.error(`available snapshots for ${slug}:`);
		for (const s of snapshots) console.error(`  ${s.timestamp}  (${new Date(s.mtimeMs).toISOString()})`);
		process.exit(3);
	}
	const target = path.join(ASSETS_DIR, slug);
	const targetExists = fs.existsSync(target);
	if (targetExists && !args.force) {
		console.error(`Assets/${slug}/ already exists; use --force to overwrite (current folder will be re-quarantined first)`);
		process.exit(4);
	}

	console.log(`rollback: slug=${slug}`);
	console.log(`         snapshot=${pick.name} (${new Date(pick.mtimeMs).toISOString()})`);
	if (snapshots.length > 1) {
		console.log(`         ${snapshots.length - 1} older snapshot(s) available`);
	}

	if (args.dryRun) {
		console.log('--dry-run: not moving any files');
		return;
	}

	if (targetExists) {
		const requarantined = moveToQuarantine(slug);
		if (requarantined) {
			console.log(`         current folder re-quarantined to ${path.relative(ROOT, requarantined)}`);
		}
	}
	const restoredAt = restoreFromQuarantine(slug, pick.path);
	console.log(`         restored to ${path.relative(ROOT, restoredAt)}`);
	console.log('next steps: run `npm run health:refresh` to update game_health.json');
}

if (require.main === module) {
	main();
}

module.exports = { listSnapshots, pickSnapshot };
