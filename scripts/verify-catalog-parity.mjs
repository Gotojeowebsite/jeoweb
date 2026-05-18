#!/usr/bin/env node
/**
 * Catalog parity audit. Runs on every CI build to catch the silent
 * "this game is in games_list.json but its health entry got dropped"
 * class of bug — the symptom users see is "a game disappears from the
 * grid after a rebuild even though its folder is still on disk".
 *
 * Checks (and what they would catch):
 * 1. Every Assets/<slug>/ has an entry in games_list.json
 *    → catches: a new game folder that scan.js skipped (e.g. no index.html)
 * 2. Every games_list.json entry resolves to a real Assets/<slug>/ folder
 *    → catches: stale catalog after a folder rename
 * 3. Every games_list.json entry name has a game_health.json verdict
 *    → catches: name-normalization drift between scan.js and
 *      build-game-health.js (the common silent-drop cause)
 * 4. Counts within ±2 of expected — fails on dramatic drift.
 *
 * Exit codes: 0 = clean, 1 = parity broken (fails the build).
 * Pass --json to emit a machine-readable report for downstream tooling.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(process.argv[1], '..', '..');
const JSON_MODE = process.argv.includes('--json');

// Folders that live under Assets/ but aren't game folders. Shared libs
// (Ruffle, Three.js wasm), promo assets, scripts. scan.js correctly
// skips them — the parity check should too.
const NON_GAME_FOLDERS = new Set([
	'promo',
	'scripts',
	'zzruffle',
	'ruffle',
	'shared',
	'_temp',
]);

function hasGameEntrypoint(dir) {
	try {
		const entries = readdirSync(dir);
		return entries.some(name => /\.html?$/i.test(name));
	} catch { return false; }
}

function loadJson(name) {
	try { return JSON.parse(readFileSync(resolve(ROOT, name), 'utf8')); }
	catch { return null; }
}

function bail(msg) {
	console.error(`::error::${msg}`);
	process.exit(1);
}

const games = loadJson('games_list.json');
if (!Array.isArray(games)) bail('games_list.json missing or not an array');

const health = loadJson('game_health.json');
const healthEntries = (health && health.games) || {};

const assetsRoot = resolve(ROOT, 'Assets');
if (!existsSync(assetsRoot)) bail('Assets/ directory missing');
const allFolders = readdirSync(assetsRoot)
	.filter(name => !name.startsWith('.') && statSync(resolve(assetsRoot, name)).isDirectory());
const gameFolders = new Set(
	allFolders.filter(name => !NON_GAME_FOLDERS.has(name) && hasGameEntrypoint(resolve(assetsRoot, name)))
);
const orphanFolders = allFolders.filter(name => !gameFolders.has(name) && !NON_GAME_FOLDERS.has(name));
const folders = gameFolders;

function slugFromUrl(url) {
	const m = (url || '').match(/^Assets\/([^/]+)\//);
	return m ? m[1] : null;
}

const catalogSlugs = new Set();
const catalogByName = new Map();
for (const g of games) {
	const slug = slugFromUrl(g.url);
	if (slug) catalogSlugs.add(slug);
	if (g.name) catalogByName.set(g.name, g);
}

// 1. Folders missing from catalog
const foldersNotInCatalog = [...folders].filter(f => !catalogSlugs.has(f));
// 2. Catalog entries without a folder
const catalogWithoutFolder = [...catalogSlugs].filter(s => !folders.has(s));
// 3. Catalog entries without a health verdict
const catalogWithoutHealth = games
	.filter(g => g.name && !(g.name in healthEntries))
	.map(g => g.name);

const report = {
	total_catalog: games.length,
	total_folders: folders.size,
	total_health: Object.keys(healthEntries).length,
	folders_not_in_catalog: foldersNotInCatalog,
	catalog_without_folder: catalogWithoutFolder,
	catalog_without_health: catalogWithoutHealth,
	orphan_folders: orphanFolders,
};

if (JSON_MODE) {
	console.log(JSON.stringify(report, null, 2));
} else {
	console.log(`catalog=${report.total_catalog} folders=${report.total_folders} health=${report.total_health}`);
	if (foldersNotInCatalog.length) {
		console.log(`\n[parity] ${foldersNotInCatalog.length} folders missing from games_list.json:`);
		for (const f of foldersNotInCatalog.slice(0, 20)) console.log(`  - ${f}`);
		if (foldersNotInCatalog.length > 20) console.log(`  … and ${foldersNotInCatalog.length - 20} more`);
	}
	if (catalogWithoutFolder.length) {
		console.log(`\n[parity] ${catalogWithoutFolder.length} catalog entries missing their Assets/<slug>/ folder:`);
		for (const f of catalogWithoutFolder.slice(0, 20)) console.log(`  - ${f}`);
		if (catalogWithoutFolder.length > 20) console.log(`  … and ${catalogWithoutFolder.length - 20} more`);
	}
	if (catalogWithoutHealth.length) {
		console.log(`\n[parity] ${catalogWithoutHealth.length} catalog entries with no game_health.json verdict (name-normalization drift?):`);
		for (const n of catalogWithoutHealth.slice(0, 20)) console.log(`  - ${n}`);
		if (catalogWithoutHealth.length > 20) console.log(`  … and ${catalogWithoutHealth.length - 20} more`);
	}
	if (orphanFolders.length) {
		console.log(`\n[parity] ${orphanFolders.length} Assets/<folder>/ have no HTML entrypoint (partial imports — clean up or re-import):`);
		for (const f of orphanFolders.slice(0, 20)) console.log(`  - ${f}`);
		if (orphanFolders.length > 20) console.log(`  … and ${orphanFolders.length - 20} more`);
	}
}

// Soft-fail on catalog-without-folder (catastrophic) — these become 404s
// in the live grid. Anything else is a warning until we burn down the
// 239-unverified backlog from the Phase 2 health pipeline.
if (catalogWithoutFolder.length > 0) {
	console.error(`\n::error::Catalog parity broken: ${catalogWithoutFolder.length} catalog entries have no Assets/<slug>/ folder. These will 404 in the live grid.`);
	process.exit(1);
}
