#!/usr/bin/env node
/**
 * Postbuild: stage the game asset trees and pipeline JSON artifacts into
 * dist/ so the published bundle is fully self-contained.
 *
 * Default mode (no flag): symlinks for fast local `astro preview`.
 * `--copy` mode: hard copies for CI — GitHub Pages doesn't follow symlinks,
 * so the deploy artifact must contain real files.
 */
import { existsSync, symlinkSync, lstatSync, unlinkSync, cpSync, statSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const COPY = process.argv.includes('--copy');

if (!existsSync(DIST)) {
	console.error('[link-assets] dist/ not found — run astro build first.');
	process.exit(1);
}

// Directory trees the live site serves out of /Assets, /emulatorjs, /cdn-cgi.
const DIRS = ['Assets', 'emulatorjs', 'cdn-cgi'];

// Top-level files the SPA / SW / shim depend on. Missing ones are skipped.
const FILES = [
	'games_list.json',
	'game_health.json',
	'recently_added.json',
	'game_descriptions.json',
	'similar.json',
	'manifest.json',
	'notavailable.svg',
	'icon.svg',
	'sw.js',
	'poki-offline-shim.js',
	'leaderboard_games.json',
];

function stageDir(name) {
	const src = resolve(ROOT, name);
	const dst = resolve(DIST, name);
	if (!existsSync(src)) {
		console.log(`[link-assets] skip ${name} (source missing)`);
		return;
	}
	if (existsSync(dst)) {
		try {
			const stat = lstatSync(dst);
			if (stat.isSymbolicLink()) unlinkSync(dst);
			else if (COPY && stat.isDirectory()) {
				// Re-copy is too slow for huge Assets/; trust prior layout.
				console.log(`[link-assets] skip ${name} (dist dir exists in --copy mode)`);
				return;
			} else {
				console.log(`[link-assets] skip ${name} (dist entry exists)`);
				return;
			}
		} catch (_) {}
	}
	if (COPY) {
		cpSync(src, dst, { recursive: true, dereference: true });
		console.log(`[link-assets] copied dist/${name} <- ${name}`);
	} else {
		symlinkSync(src, dst, 'dir');
		console.log(`[link-assets] linked dist/${name} -> ../${name}`);
	}
}

function stageFile(name) {
	const src = resolve(ROOT, name);
	const dst = resolve(DIST, name);
	if (!existsSync(src)) return;
	if (existsSync(dst)) {
		try {
			const stat = lstatSync(dst);
			if (stat.isSymbolicLink()) unlinkSync(dst);
		} catch (_) {}
	}
	try {
		copyFileSync(src, dst);
		console.log(`[link-assets] copied dist/${name}`);
	} catch (err) {
		console.warn(`[link-assets] failed to copy ${name}: ${err.message}`);
	}
}

for (const d of DIRS) stageDir(d);
for (const f of FILES) stageFile(f);

// Stamp the service worker with a build hash so every deploy invalidates
// stale caches. Hash inputs are the SW source, the catalog JSONs, and the
// commit SHA when present — any of those changing means clients should
// drop their old cache and refetch.
const SW_PATH = resolve(DIST, 'sw.js');
if (existsSync(SW_PATH)) {
	const swSource = readFileSync(SW_PATH, 'utf8');
	const hash = createHash('sha256');
	hash.update(swSource);
	for (const f of ['games_list.json', 'game_health.json']) {
		const p = resolve(ROOT, f);
		if (existsSync(p)) hash.update(readFileSync(p));
	}
	hash.update(process.env.GITHUB_SHA ?? process.env.COMMIT_SHA ?? new Date().toISOString().slice(0, 10));
	const version = hash.digest('hex').slice(0, 12);
	const stamped = swSource.replace(/__BUILD_VERSION__/g, version);
	writeFileSync(SW_PATH, stamped);
	console.log(`[link-assets] stamped sw.js cache version: ${version}`);
}
