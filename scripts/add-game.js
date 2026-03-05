#!/usr/bin/env node
/**
 * add-game.js
 * ===========
 * Registers a downloaded game folder so it appears on the homepage.
 * Finds the best image in the folder, adds the entry to games_list.json,
 * and optionally rebuilds the full list via scan.js.
 *
 * Usage:
 *   node scripts/add-game.js <folder-name> [display-name]
 *
 * Examples:
 *   node scripts/add-game.js cool-game
 *   node scripts/add-game.js cool-game "Cool Game"
 *
 * Options:
 *   --rescan   Re-run the full scan.js after adding (rebuilds entire games_list.json)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const GAMES_LIST = path.join(ROOT, 'games_list.json');

// ─── Helpers ────────────────────────────────────────────────────────────────

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'];

function usage() {
	console.log(`
Usage:  node scripts/add-game.js <folder-name> [display-name]

  <folder-name>   Name of the folder inside Assets/
  [display-name]  Optional human-friendly name (defaults to folder name)

Options:
  --rescan        Re-run the full scan.js to rebuild the entire games_list.json

Examples:
  node scripts/add-game.js cool-game
  node scripts/add-game.js cool-game "Cool Game"
  node scripts/add-game.js cool-game --rescan
`);
	process.exit(1);
}

/** Recursively collect all image files from a folder */
function collectImages(dir, baseDir) {
	const results = [];
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				results.push(...collectImages(fullPath, baseDir));
			} else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
				results.push(path.relative(baseDir, fullPath).replace(/\\/g, '/'));
			}
		}
	} catch (e) {}
	return results;
}

/** Check if folder contains .swf files (Flash game) */
function hasSwfFiles(dir) {
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (hasSwfFiles(fullPath)) return true;
			} else if (path.extname(entry.name).toLowerCase() === '.swf') {
				return true;
			}
		}
	} catch (e) {}
	return false;
}

/** Find the best image for this game */
function findBestImage(folderPath, folderName) {
	const allImages = collectImages(folderPath, folderPath);
	if (allImages.length === 0) return null;

	// Priority filenames to look for
	const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', 'cover', 'banner', 'favicon', folderName.toLowerCase()];

	// 1) Try priority names
	for (const name of priorityNames) {
		const match = allImages.find(f => {
			const base = path.basename(f, path.extname(f)).toLowerCase();
			return base === name;
		});
		if (match) return `Assets/${folderName}/${match}`;
	}

	// 2) Try partial matches (e.g. "logo-256.png")
	for (const name of priorityNames) {
		const match = allImages.find(f => {
			const base = path.basename(f, path.extname(f)).toLowerCase();
			return base.includes(name);
		});
		if (match) return `Assets/${folderName}/${match}`;
	}

	// 3) Prefer images in root folder
	const rootImages = allImages.filter(f => !f.includes('/'));
	if (rootImages.length > 0) return `Assets/${folderName}/${rootImages[0]}`;

	// 4) Fallback: first image found
	return `Assets/${folderName}/${allImages[0]}`;
}

/** Find the HTML entry point */
function findHtmlEntry(folderPath) {
	try {
		const files = fs.readdirSync(folderPath);
		const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));
		if (htmlFiles.length === 0) return null;
		// Prefer index.html
		return htmlFiles.find(f => f.toLowerCase() === 'index.html') || htmlFiles[0];
	} catch {
		return null;
	}
}

// ─── Main ───────────────────────────────────────────────────────────────────

function addGame(folderName, displayName, doRescan) {
	const folderPath = path.join(ASSETS_DIR, folderName);

	if (!fs.existsSync(folderPath)) {
		console.error(`\n✗ Folder not found: Assets/${folderName}/`);
		console.error(`  Make sure you've downloaded the game first with:`);
		console.error(`  node scripts/download-game.js <url> ${folderName}\n`);
		process.exit(1);
	}

	// If --rescan, just run scan.js
	if (doRescan) {
		console.log('\n🔄 Running full rescan...\n');
		require('../scan.js');
		return;
	}

	const htmlFile = findHtmlEntry(folderPath);
	if (!htmlFile) {
		console.error(`\n✗ No HTML file found in Assets/${folderName}/`);
		console.error(`  The game folder needs at least one .html file to work.\n`);
		process.exit(1);
	}

	const image = findBestImage(folderPath, folderName);
	const isFlash = hasSwfFiles(folderPath);
	const name = displayName || folderName;

	const entry = {
		name: name,
		url: `Assets/${folderName}/${htmlFile}`,
		image: image || 'notavailable.svg',
		type: isFlash ? 'flash' : 'webgl',
	};

	// Load existing games list
	let games = [];
	try {
		games = JSON.parse(fs.readFileSync(GAMES_LIST, 'utf-8'));
	} catch {
		console.warn('  ⚠ Could not read games_list.json, creating new one');
	}

	// Check for duplicates
	const existingIndex = games.findIndex(g => 
		g.url === entry.url || g.name.toLowerCase() === entry.name.toLowerCase()
	);

	if (existingIndex >= 0) {
		console.log(`\n⚠  Game "${name}" already exists — updating entry.`);
		games[existingIndex] = entry;
	} else {
		games.push(entry);
	}

	// Sort alphabetically
	games.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

	// Write back
	fs.writeFileSync(GAMES_LIST, JSON.stringify(games, null, 2));

	console.log(`\n🎮 Game Registered!`);
	console.log(`─────────────────────────────────────`);
	console.log(`  Name:    ${entry.name}`);
	console.log(`  URL:     ${entry.url}`);
	console.log(`  Image:   ${entry.image}`);
	console.log(`  Type:    ${entry.type}`);
	console.log(`─────────────────────────────────────`);
	console.log(`\n✓ Updated games_list.json (${games.length} total games)`);
	console.log(`  The game will now appear on the homepage!\n`);
}

// ─── CLI ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2).filter(a => a !== '--rescan');
const doRescan = process.argv.includes('--rescan');

if (args.length === 0) usage();

const folderName = args[0];
const displayName = args[1] || null;

addGame(folderName, displayName, doRescan);
