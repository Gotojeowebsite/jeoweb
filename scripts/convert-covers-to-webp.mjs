#!/usr/bin/env node
/**
 * Generate .webp siblings for every game cover. Cards render at ~400×225
 * (800×450 on 2× retina) so we resize down on the way in — many vendored
 * covers ship at 1500px+ and waste bytes.
 *
 * Idempotent: re-runs skip covers whose .webp sibling is newer than the
 * source. SVG / ICO / GIF / existing WebP covers are left alone (no
 * meaningful savings, and animated GIFs would lose their motion).
 *
 * Output: <cover-path>.webp alongside the original. GameCard.astro and the
 * runtime grid renderer use a <picture> element so older browsers still
 * load the original — this is purely additive.
 */
import { readFileSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const games = JSON.parse(readFileSync(resolve(ROOT, 'games_list.json'), 'utf8'));

// Card surface is 400×225 logical; 2× retina → 800 wide. Most covers are
// landscape-ish but some are square logos; resize to fit-within so we
// never upscale and never crop content.
const TARGET_WIDTH = 800;
const WEBP_QUALITY = 78;

const SKIP_EXT = new Set(['.svg', '.ico', '.gif', '.webp']);
let processed = 0, skipped = 0, savedBytes = 0;

const covers = Array.from(new Set(games.map(g => g.image).filter(Boolean)));
for (const rel of covers) {
	const ext = extname(rel).toLowerCase();
	if (SKIP_EXT.has(ext)) { skipped++; continue; }
	const src = resolve(ROOT, rel);
	if (!existsSync(src)) { skipped++; continue; }
	const dst = src.replace(/\.[^.]+$/, '') + '.webp';
	const srcStat = statSync(src);
	if (existsSync(dst) && statSync(dst).mtimeMs >= srcStat.mtimeMs) { skipped++; continue; }
	try {
		const img = sharp(src);
		const meta = await img.metadata();
		const pipeline = img.resize({
			width: Math.min(meta.width ?? TARGET_WIDTH, TARGET_WIDTH),
			withoutEnlargement: true,
			fit: 'inside',
		}).webp({ quality: WEBP_QUALITY });
		const buf = await pipeline.toBuffer();
		// Skip the write when WebP is *bigger* than the source — happens
		// occasionally on tiny pre-optimized PNGs.
		if (buf.length >= srcStat.size) { skipped++; continue; }
		writeFileSync(dst, buf);
		savedBytes += srcStat.size - buf.length;
		processed++;
		if (processed % 50 === 0) console.log(`[webp] ${processed} converted, ${(savedBytes / 1024 / 1024).toFixed(1)} MB saved so far…`);
	} catch (err) {
		console.warn(`[webp] failed ${rel}: ${err.message}`);
	}
}

console.log(`[webp] ${processed} converted, ${skipped} skipped, ${(savedBytes / 1024 / 1024).toFixed(1)} MB saved.`);
