#!/usr/bin/env node
/**
 * Pre-compress every HTML / CSS / JS / SVG / JSON in dist/ into a .br
 * and .gz sibling. Azure Static Web Apps and modern GitHub Pages tooling
 * serve pre-built `Content-Encoding: br` files when the browser advertises
 * Accept-Encoding: br — so this is an unconditional bandwidth win.
 *
 * Skips files where the compressed result is larger (rare on small SVGs)
 * and never touches files in /Assets/, /emulatorjs/, /cdn-cgi/ — those
 * are vendored game payloads that the local server already handles.
 *
 * Idempotent: re-runs only write when the source is newer than the
 * existing compressed sibling.
 */
import { readFileSync, writeFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync, constants as zlibConstants } from 'node:zlib';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

if (!existsSync(DIST)) {
	console.error('[precompress] dist/ not found — run astro build first.');
	process.exit(1);
}

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.mjs', '.svg', '.json', '.xml', '.txt', '.webmanifest']);

// Vendored game payloads — skip. Pages serves them as-is and the legacy
// Node server already negotiates pre-built siblings when present.
const SKIP_DIRS = new Set(['Assets', 'emulatorjs', 'cdn-cgi']);

let total = 0, written = 0, savedBytes = 0;

function walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry.name)) continue;
			walk(resolve(dir, entry.name));
			continue;
		}
		const full = resolve(dir, entry.name);
		const ext = extname(entry.name).toLowerCase();
		if (!COMPRESSIBLE.has(ext)) continue;
		if (entry.name.endsWith('.br') || entry.name.endsWith('.gz')) continue;
		total++;
		let src, srcMtime;
		try {
			src = readFileSync(full);
			srcMtime = statSync(full).mtimeMs;
		} catch (err) {
			// File vanished mid-walk (a parallel rebuild can do this). Skip
			// it rather than aborting — the next CI run will pick it up.
			if (err.code === 'ENOENT') continue;
			throw err;
		}
		// Skip tiny payloads — header bytes can dwarf the savings.
		if (src.length < 512) continue;

		const brPath = full + '.br';
		const gzPath = full + '.gz';

		// Brotli — text mode at quality 5. Quality 11 yields only a few
		// extra percent on these payloads but is ~10× slower; on a 1000-page
		// build that's the difference between 30s and 5min in CI.
		if (!existsSync(brPath) || statSync(brPath).mtimeMs < srcMtime) {
			const br = brotliCompressSync(src, {
				params: {
					[zlibConstants.BROTLI_PARAM_MODE]: zlibConstants.BROTLI_MODE_TEXT,
					[zlibConstants.BROTLI_PARAM_QUALITY]: 5,
				},
			});
			if (br.length < src.length) {
				writeFileSync(brPath, br);
				savedBytes += src.length - br.length;
				written++;
			}
		}
		// gzip — fallback for clients that don't advertise br.
		if (!existsSync(gzPath) || statSync(gzPath).mtimeMs < srcMtime) {
			const gz = gzipSync(src, { level: 9 });
			if (gz.length < src.length) writeFileSync(gzPath, gz);
		}
	}
}

walk(DIST);

console.log(`[precompress] scanned ${total} files, compressed ${written}, saved ~${(savedBytes / 1024).toFixed(1)} KB`);
