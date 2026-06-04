'use strict';

// scripts/pipeline/utils.js
//
// Shared utilities for the game health pipeline.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');

/**
 * Read and parse a JSON file safely.
 * @param {string} filePath
 * @param {*} fallback - Value to return on error
 * @returns {*}
 */
function readJsonSafe(filePath, fallback = null) {
	try {
		const raw = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}

/**
 * Write JSON to a file with pretty formatting.
 * @param {string} filePath
 * @param {*} data
 */
function writeJsonSafe(filePath, data) {
	const dir = path.dirname(filePath);
	fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Append a line to a JSONL file.
 * @param {string} filePath
 * @param {Object} record
 */
function appendJsonl(filePath, record) {
	const dir = path.dirname(filePath);
	fs.mkdirSync(dir, { recursive: true });
	fs.appendFileSync(filePath, JSON.stringify(record) + '\n');
}

/**
 * Load the game catalog from games_list.json.
 * @returns {Array<{name, url, image, type, size, status?, tags?}>}
 */
function loadCatalog() {
	const catalogPath = path.join(ROOT, 'games_list.json');
	return readJsonSafe(catalogPath, []);
}

/**
 * Load game health verdicts from game_health.json.
 * @returns {Object}
 */
function loadHealthData() {
	const healthPath = path.join(ROOT, 'game_health.json');
	return readJsonSafe(healthPath, { schema: 2, games: {} });
}

/**
 * Load recovery sources from recovery_sources.json.
 * @returns {Array<{name, type, url_template, priority, applies_to}>}
 */
function loadRecoverySources() {
	const sourcesPath = path.join(ROOT, 'recovery_sources.json');
	return readJsonSafe(sourcesPath, []);
}

/**
 * Get list of all game slugs from the Assets directory.
 * @returns {string[]}
 */
function listGameSlugs() {
	try {
		return fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
			.filter(d => d.isDirectory() && !d.name.startsWith('.'))
			.map(d => d.name)
			.sort();
	} catch {
		return [];
	}
}

/**
 * Determine game type from catalog entry or filesystem inspection.
 * @param {string} slug
 * @param {Array} catalog - games_list.json entries
 * @returns {'webgl'|'flash'|'gba'|'snes'|'retro'|'unknown'}
 */
function detectGameType(slug, catalog) {
	// Check catalog first
	const entry = catalog.find(g => g.name === slug || g.name.toLowerCase() === slug.toLowerCase());
	if (entry && entry.type) return entry.type;

	// Filesystem inspection
	const gameDir = path.join(ASSETS_DIR, slug);
	try {
		const indexPath = path.join(gameDir, 'index.html');
		if (fs.existsSync(indexPath)) {
			const html = fs.readFileSync(indexPath, 'utf-8');
			if (/EJS_pathtodata|emulatorjs/i.test(html)) {
				const coreMatch = html.match(/EJS_core\s*=\s*['"]([^'"]+)['"]/);
				if (coreMatch) return coreMatch[1]; // 'gba', 'snes9x', etc.
				return 'retro';
			}
			if (/\.swf/i.test(html) || /ruffle/i.test(html)) return 'flash';
		}

		// Check for .swf files
		const files = fs.readdirSync(gameDir);
		if (files.some(f => f.endsWith('.swf'))) return 'flash';
	} catch {}

	return 'webgl';
}

/**
 * Sleep helper with jitter.
 * @param {number} ms - Base milliseconds
 * @param {number} [jitter=0] - Maximum additional random jitter in ms
 * @returns {Promise<void>}
 */
function sleep(ms, jitter = 0) {
	const total = ms + Math.floor(Math.random() * jitter);
	return new Promise(r => setTimeout(r, total));
}

/**
 * Format a duration in ms to a human-readable string.
 * @param {number} ms
 * @returns {string}
 */
function formatDuration(ms) {
	if (ms < 1000) return `${ms}ms`;
	if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
	const mins = Math.floor(ms / 60000);
	const secs = Math.floor((ms % 60000) / 1000);
	return `${mins}m ${secs}s`;
}

/**
 * Generate a timestamp string for filenames.
 * @returns {string} e.g. '20260604-004500'
 */
function nowStamp() {
	const d = new Date();
	const pad = n => String(n).padStart(2, '0');
	return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

/**
 * Safely remove a directory/file recursively.
 * @param {string} p
 */
function rmSafe(p) {
	try { fs.rmSync(p, { recursive: true, force: true }); } catch {}
}

/**
 * Check if a game has a valid entry HTML file.
 * @param {string} slug
 * @returns {{exists: boolean, path?: string, size?: number}}
 */
function checkEntryHtml(slug) {
	const gameDir = path.join(ASSETS_DIR, slug);
	const indexPath = path.join(gameDir, 'index.html');

	if (fs.existsSync(indexPath)) {
		const stat = fs.statSync(indexPath);
		return { exists: true, path: indexPath, size: stat.size };
	}

	// Try to find any .html file
	try {
		const files = fs.readdirSync(gameDir);
		const htmlFile = files.find(f => /\.html?$/i.test(f));
		if (htmlFile) {
			const htmlPath = path.join(gameDir, htmlFile);
			const stat = fs.statSync(htmlPath);
			return { exists: true, path: htmlPath, size: stat.size };
		}
	} catch {}

	return { exists: false };
}

module.exports = {
	ROOT,
	ASSETS_DIR,
	REPORTS_DIR,
	readJsonSafe,
	writeJsonSafe,
	appendJsonl,
	loadCatalog,
	loadHealthData,
	loadRecoverySources,
	listGameSlugs,
	detectGameType,
	sleep,
	formatDuration,
	nowStamp,
	rmSafe,
	checkEntryHtml,
};
