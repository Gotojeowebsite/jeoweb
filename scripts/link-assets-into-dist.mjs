#!/usr/bin/env node
/**
 * Postbuild: symlink the game asset trees into dist/ so `astro preview` (and
 * any direct `dist/` serve) resolves /Assets/<slug>/index.html, /emulatorjs/*,
 * and the cdn-cgi shim correctly.
 *
 * Production deploys handle this differently — the Sprint 7 cutover will
 * upload `.` + `dist/` together (or stage them) since GitHub Pages doesn't
 * follow symlinks reliably. Until then, the legacy root remains the artifact.
 */
import { existsSync, symlinkSync, lstatSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

if (!existsSync(DIST)) {
	console.error('[link-assets] dist/ not found — run astro build first.');
	process.exit(1);
}

const TARGETS = ['Assets', 'emulatorjs', 'cdn-cgi'];

for (const name of TARGETS) {
	const src = resolve(ROOT, name);
	const dst = resolve(DIST, name);
	if (!existsSync(src)) {
		console.log(`[link-assets] skip ${name} (source missing)`);
		continue;
	}
	if (existsSync(dst)) {
		try {
			const stat = lstatSync(dst);
			if (stat.isSymbolicLink()) unlinkSync(dst);
			else {
				console.log(`[link-assets] skip ${name} (dist entry exists and is not a symlink)`);
				continue;
			}
		} catch (_) {}
	}
	symlinkSync(src, dst, 'dir');
	console.log(`[link-assets] linked dist/${name} -> ../${name}`);
}
