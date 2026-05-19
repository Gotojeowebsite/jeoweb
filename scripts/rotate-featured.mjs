#!/usr/bin/env node
/**
 * Weekly "Hot This Week" rotation.
 *
 * Deterministic-but-varied: seeds picks by ISO week (year + week number) so a
 * given Monday surfaces the same 12 games for every visitor that week, but
 * each Monday rotates to a fresh slate. Scoring prefers:
 *   - games with editorial descriptions (so cards feel curated, not random)
 *   - recently-added entries (within the last 90 days)
 *   - games with a cover image (the rail looks bad otherwise)
 *   - playable verdicts only (skip broken / maintenance)
 *   - tag diversity across the 12 picks (no five-puzzles-in-a-row)
 *
 * Output: featured.json with `{ week, picks: [<slug>, ...] }`. Committed by
 * github-actions[bot] on the Monday cron defined in
 * .github/workflows/featured-rotation.yml.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const games = JSON.parse(readFileSync(resolve(ROOT, 'games_list.json'), 'utf8'));
const health = (() => {
	try { return JSON.parse(readFileSync(resolve(ROOT, 'game_health.json'), 'utf8')).games ?? {}; }
	catch { return {}; }
})();
const descriptions = existsSync(resolve(ROOT, 'game_descriptions.json'))
	? JSON.parse(readFileSync(resolve(ROOT, 'game_descriptions.json'), 'utf8'))
	: {};

function slugOf(g) {
	const m = /^Assets\/([^/]+)\//.exec(g.url ?? '');
	return m ? m[1] : null;
}

// ISO week as YYYY-Www (RFC-ish). Same value Monday through Sunday so the
// rail stays stable for the entire week. Provided explicitly when running
// locally to preview a future week's picks.
function isoWeek(date = new Date()) {
	const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function hashSeed(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
	return h;
}

// Mulberry32 — small, fast, deterministic PRNG. Seeded by week so picks
// are reproducible. We never use Math.random() here to keep the CI commit
// deterministic for a given week.
function mulberry32(seed) {
	let t = seed >>> 0;
	return function () {
		t = (t + 0x6D2B79F5) >>> 0;
		let r = Math.imul(t ^ (t >>> 15), 1 | t);
		r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};
}

const week = process.argv.find(a => /^\d{4}-W\d{2}$/.test(a)) ?? isoWeek();
const rand = mulberry32(hashSeed(week));

const NOW = Date.now();
const ninetyDaysMs = 90 * 86400000;

const eligible = games.flatMap(g => {
	const slug = slugOf(g);
	if (!slug || !g.image) return [];
	const verdict = health[g.name]?.verdict ?? g.status ?? 'unknown';
	if (verdict === 'broken' || verdict === 'maintenance') return [];
	const desc = descriptions[slug];
	const ageMs = g.addedDate ? (NOW - Date.parse(g.addedDate)) : Infinity;
	const recencyBoost = ageMs < ninetyDaysMs ? 1.5 : 1.0;
	const editorialBoost = desc?.pitch && !desc.pitch.includes('you can pick up in a single browser tab') ? 1.25 : 1.0;
	const score = rand() * recencyBoost * editorialBoost;
	return [{ slug, name: g.name, tags: g.tags ?? [], score }];
});

// Diversity pass: greedily pick the highest-scored eligible game, then
// penalize remaining candidates that share a tag with anything already
// picked. Keeps the 12-game rail from being five-puzzles-then-five-shooters.
eligible.sort((a, b) => b.score - a.score);
const picks = [];
const tagPenalty = new Map();
while (picks.length < 12 && eligible.length) {
	const next = eligible.shift();
	let penalty = 0;
	for (const t of next.tags) penalty += tagPenalty.get(t) ?? 0;
	if (penalty > 0.6 && eligible.length > 10) continue;
	picks.push(next.slug);
	for (const t of next.tags) tagPenalty.set(t, (tagPenalty.get(t) ?? 0) + 0.35);
}

const out = {
	week,
	generatedAt: new Date().toISOString(),
	picks,
};
writeFileSync(resolve(ROOT, 'featured.json'), JSON.stringify(out, null, '\t') + '\n');
console.log(`[rotate-featured] week=${week}, picks=${picks.length}: ${picks.join(', ')}`);
