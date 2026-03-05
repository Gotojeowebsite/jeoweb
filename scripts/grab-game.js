#!/usr/bin/env node
/**
 * grab-game.js — One-liner to download + register a game
 *
 * Usage:
 *   node scripts/grab-game.js <url> [folder-name] [display-name]
 *
 * Examples:
 *   node scripts/grab-game.js https://cdn.example.com/files/cool-game/index.html
 *   node scripts/grab-game.js https://cdn.example.com/files/cool-game/index.html cool-game "Cool Game"
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
	console.log(`
Usage:  node scripts/grab-game.js <url> [folder-name] [display-name]

  Downloads all game files and registers it on the homepage in one step.

Examples:
  node scripts/grab-game.js https://example.com/files/my-game/index.html
  node scripts/grab-game.js https://example.com/files/my-game/index.html my-game "My Game"
`);
	process.exit(1);
}

const url = args[0];
const folder = args[1] || null;
const displayName = args[2] || null;

const scriptsDir = __dirname;

// Step 1: Download
const dlArgs = [JSON.stringify(url)];
if (folder) dlArgs.push(JSON.stringify(folder));
console.log(`\n━━━ Step 1: Downloading game files ━━━\n`);
execSync(`node ${path.join(scriptsDir, 'download-game.js')} ${dlArgs.join(' ')}`, { stdio: 'inherit' });

// Figure out folder name (same logic as download-game.js)
let folderName = folder;
if (!folderName) {
	const { URL } = require('url');
	const u = new URL(url);
	let dir = u.pathname;
	if (!dir.endsWith('/')) dir = dir.replace(/\/[^/]*$/, '/');
	folderName = dir.replace(/\/+$/, '').split('/').filter(Boolean).pop() || 'downloaded-game';
	folderName = folderName.replace(/[^a-zA-Z0-9_-]/g, '-');
}

// Step 2: Register
const addArgs = [JSON.stringify(folderName)];
if (displayName) addArgs.push(JSON.stringify(displayName));
console.log(`\n━━━ Step 2: Registering on homepage ━━━\n`);
execSync(`node ${path.join(scriptsDir, 'add-game.js')} ${addArgs.join(' ')}`, { stdio: 'inherit' });
