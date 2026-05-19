#!/usr/bin/env node
/**
 * Build similar.json — a per-slug list of the top-10 most-similar games.
 * Used by src/pages/game/[slug].astro to render the "Similar games" rail
 * without doing N-squared work in each Astro render.
 *
 * Scoring: weighted blend of Jaccard tag overlap, type/genre match, and
 * name-bigram Dice overlap. Tag overlap dominates (gameplay similarity
 * matters most), name overlap handles series/franchise hits ("Tank 1",
 * "Tank 2"), and type is a tiebreaker so cross-type matches stay
 * meaningful but lose to same-type rivals.
 *
 * Output schema: { "<slug>": ["sim-slug-1", "sim-slug-2", ...] }
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IN = resolve(ROOT, 'games_list.json');
const OUT = resolve(ROOT, 'similar.json');

const games = JSON.parse(readFileSync(IN, 'utf8'));

function slugOf(g) {
	const m = /^Assets\/([^/]+)\//.exec(g.url ?? '');
	return m ? m[1] : null;
}

function jaccard(a, b) {
	if (!a.length && !b.length) return 0;
	const setA = new Set(a);
	const setB = new Set(b);
	let inter = 0;
	for (const x of setA) if (setB.has(x)) inter++;
	const union = setA.size + setB.size - inter;
	return union === 0 ? 0 : inter / union;
}

// Bigram Dice coefficient — catches "tank-1" vs "tank-2" without forcing
// any specific naming convention. We normalize separators first so
// camelCase, hyphen, and underscore variants are treated alike.
function bigrams(s) {
	const norm = String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
	const out = new Set();
	for (let i = 0; i < norm.length - 1; i++) out.add(norm.slice(i, i + 2));
	return out;
}
function dice(a, b) {
	if (!a.size || !b.size) return 0;
	let inter = 0;
	for (const x of a) if (b.has(x)) inter++;
	return (2 * inter) / (a.size + b.size);
}

const indexed = games
	.map(g => {
		const slug = slugOf(g);
		return slug ? { slug, name: g.name ?? '', tags: g.tags ?? [], type: g.type ?? 'webgl', bigrams: bigrams(g.name ?? '') } : null;
	})
	.filter(Boolean);

const map = {};
for (const a of indexed) {
	const scored = [];
	for (const b of indexed) {
		if (a.slug === b.slug) continue;
		const tagScore = jaccard(a.tags, b.tags);
		const nameScore = dice(a.bigrams, b.bigrams);
		const typeScore = a.type === b.type ? 1 : 0;
		// Weights chosen empirically: gameplay (tag) similarity is the
		// strongest signal a player cares about, name similarity catches
		// franchises and sequels, type breaks near-ties so retro doesn't
		// recommend a WebGL game when a retro option exists.
		const score = tagScore * 1.0 + nameScore * 0.5 + typeScore * 0.2;
		if (score > 0) scored.push({ slug: b.slug, score });
	}
	scored.sort((x, y) => y.score - x.score);
	map[a.slug] = scored.slice(0, 10).map(x => x.slug);
}

writeFileSync(OUT, JSON.stringify(map) + '\n');
const sample = Object.keys(map).slice(0, 3);
console.log(`[build-similarity] wrote ${Object.keys(map).length} entries → ${OUT}`);
for (const s of sample) {
	console.log(`  ${s} → ${(map[s] ?? []).slice(0, 5).join(', ')}`);
}
