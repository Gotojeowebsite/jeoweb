#!/usr/bin/env node
/**
 * Heuristic-driven game description generator.
 *
 * Reads games_list.json, composes a 1-2 sentence pitch + a difficulty bucket
 * + a play-length range for every game from its name, tags, and engine type,
 * and writes game_descriptions.json. The output is hand-editable: re-runs
 * preserve any slug whose entry has been marked "manual": true.
 *
 * Pitch is template-blended (no API call) so the build stays deterministic
 * and offline-safe. Hand-curated entries can later override the generated
 * copy for top games — the loader merges manual on top of generated.
 *
 * Usage:
 *   node scripts/generate-descriptions.mjs           # generate / refresh
 *   node scripts/generate-descriptions.mjs --slug X  # only one
 *   node scripts/generate-descriptions.mjs --force   # overwrite manual=false
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IN = resolve(ROOT, 'games_list.json');
const OUT = resolve(ROOT, 'game_descriptions.json');

const args = process.argv.slice(2);
const ONLY = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
const FORCE = args.includes('--force');

const games = JSON.parse(readFileSync(IN, 'utf8'));
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

// Tag → editorial fragments. The first array slot is the lead verb-phrase;
// the second is the qualifier appended after a comma.
const TAG_COPY = {
	racing:     ['burn rubber', 'on tracks tuned for late-night laps'],
	shooter:    ['line up shots', 'with reflexes that punish hesitation'],
	puzzle:     ['untangle a brain teaser', 'one move at a time'],
	platformer: ['leap, dash, and stick the landing', 'across handcrafted levels'],
	sports:     ['take the field', 'in fast pickup matches'],
	arcade:     ['chase a high score', 'in the kind of run that hooks you for one more try'],
	horror:     ['hold your nerve', 'as the lights flicker and something moves'],
	multiplayer:['squad up or scrap solo', 'against players across the lobby'],
	strategy:   ['outthink the opponent', 'turn after turn'],
	rpg:        ['gear up and explore', 'as the story unfolds'],
	simulation: ['build, manage, and tinker', 'until the numbers tick just right'],
	minecraft:  ['mine, craft, and build', 'in a blocky open world'],
	io:         ['drop into a fast-paced arena', 'against everyone else online'],
	stickman:   ['command a stick figure', 'through chaotic physics moments'],
	survival:   ['scrounge for resources', 'and last one more day'],
	casual:     ['unwind with a low-stakes', 'session you can pick up anywhere'],
};

const TYPE_COPY = {
	webgl: { article: 'a', label: 'browser game', longLabel: 'WebGL game' },
	flash: { article: 'a', label: 'classic Flash game', longLabel: 'Flash game' },
	retro: { article: 'a', label: 'retro game', longLabel: 'retro emulator title' },
};

// Description-time tag inference — more lenient than scan.js because we only
// use these tags to pick a pitch template, not to surface filter chips. The
// goal is: every game in the catalog gets a copy-relevant verb-phrase, not a
// fallback "is a browser game" line. Order matters; first match wins.
const PITCH_INFERENCE = [
	{ tag: 'racing',     words: ['race', 'racing', 'drift', 'kart', 'rally', 'speed', 'car', 'drive', 'driver', 'traffic', 'moto', 'bike', 'highway', 'parking'] },
	{ tag: 'shooter',    words: ['fps', 'shoot', 'gun', 'sniper', 'war', 'strike', 'combat', 'crossfire', 'warfare', 'tank', 'rifle', 'pistol'] },
	{ tag: 'puzzle',     words: ['puzzle', 'sudoku', 'mahjong', 'match', 'jigsaw', 'logic', 'sokoban', 'tetris', '2048', 'solitaire', 'crossword', 'maze', 'brain'] },
	{ tag: 'platformer', words: ['mario', 'sonic', 'platform', 'jump', 'jumper', 'runner', 'geometry', 'dash', 'climb', 'parkour', 'kong'] },
	{ tag: 'sports',     words: ['football', 'soccer', 'basketball', 'golf', 'tennis', 'baseball', 'hockey', 'volley', 'sport', 'bowling', 'pool', 'cricket', 'boxing', 'wrestling', 'fifa', 'nba', 'nfl', 'world-cup', 'world cup', 'derby'] },
	{ tag: 'arcade',     words: ['arcade', 'breakout', 'asteroids', 'snake', 'pinball', 'pacman', 'pac-man', 'flappy', 'crossy', 'doodle'] },
	{ tag: 'horror',     words: ['scary', 'horror', 'fnaf', 'freddy', 'haunted', 'ghost', 'zombie', 'undead', 'slender', 'granny', 'nightmare', 'poppy', 'huggy', 'dead'] },
	{ tag: 'multiplayer',words: ['multi', 'multiplayer', '-vs-', ' vs ', 'duel', 'royale', 'online', 'party', 'versus', 'arena', 'clash', '1on1', '2on2', '1v1', '2v2'] },
	{ tag: 'strategy',   words: ['chess', 'checkers', 'strategy', 'tower', 'defense', 'tactics', 'td-', 'rts', 'civ-'] },
	{ tag: 'rpg',        words: ['rpg', 'dungeon', 'quest', 'adventure', 'fantasy', 'wizard', 'dragon', 'hero', 'kingdom', 'pokemon', 'zelda', 'final-fantasy'] },
	{ tag: 'simulation', words: ['sim', 'simulator', 'tycoon', 'city', 'farm', 'idle', 'clicker', 'factory', 'manage', 'cookie'] },
	{ tag: 'minecraft',  words: ['minecraft', 'blockcraft', 'craft'] },
	{ tag: 'io',         words: ['-io', '.io', 'agar', 'slither'] },
	{ tag: 'stickman',   words: ['stick', 'stickman', 'stickfight'] },
	{ tag: 'survival',   words: ['survival', 'survive', 'hunt'] },
	{ tag: 'fighting',   words: ['fight', 'brawl', 'rumble', 'punch', 'kick', 'mma', 'ufc'] },
	{ tag: 'casual',     words: ['casual', 'cute', 'color', 'draw', 'paint', 'dress', 'makeup', 'baby', 'kid'] },
];
function inferPitchTags(name, suppliedTags) {
	const set = new Set(suppliedTags ?? []);
	const haystack = ('-' + String(name).toLowerCase() + '-').replace(/[\s_.]+/g, '-');
	for (const { tag, words } of PITCH_INFERENCE) {
		if (set.has(tag)) continue;
		if (words.some(w => haystack.includes(w))) set.add(tag);
	}
	return [...set];
}

// TAG_COPY entries for tags introduced by inference that scan.js doesn't surface.
TAG_COPY.fighting = ['trade blows', 'in close-quarters scraps'];

// Difficulty heuristics. Order matters: first match wins.
const DIFFICULTY_RULES = [
	{ d: 'hard', tags: ['horror', 'shooter', 'strategy', 'rpg'] },
	{ d: 'hard', words: ['hard', 'extreme', 'impossible', 'pro', 'boss', 'dark', 'rage', 'nightmare', 'survival'] },
	{ d: 'easy', tags: ['casual', 'arcade', 'simulation'] },
	{ d: 'easy', words: ['easy', 'kids', 'baby', 'paint', 'color', 'idle', 'clicker'] },
];
function difficultyFor(name, tags) {
	const slugWords = String(name).toLowerCase();
	const tagSet = new Set(tags ?? []);
	for (const rule of DIFFICULTY_RULES) {
		if (rule.tags && rule.tags.some(t => tagSet.has(t))) return rule.d;
		if (rule.words && rule.words.some(w => slugWords.includes(w))) return rule.d;
	}
	return 'med';
}

// Duration ranges in minutes. [min, max] — used to show "≈5-15 min" on cards.
function durationFor(type, tags) {
	const tagSet = new Set(tags ?? []);
	if (tagSet.has('idle') || tagSet.has('simulation')) return [10, 30];
	if (tagSet.has('rpg') || tagSet.has('strategy')) return [15, 45];
	if (tagSet.has('puzzle')) return [5, 20];
	if (tagSet.has('arcade') || tagSet.has('io')) return [3, 10];
	if (tagSet.has('multiplayer') || tagSet.has('shooter')) return [5, 15];
	if (type === 'retro') return [10, 30];
	if (type === 'flash') return [3, 15];
	return [5, 15];
}

// Display-friendly version of the slug-like name field. Most names in
// games_list.json are slugs (`crossy-road-space`, `1on1SoccerBigHeads`)
// because they come from the Assets/<dir>/ folder. We split camelCase,
// replace separators with spaces, title-case each word, and re-uppercase
// well-known initialisms so the resulting copy reads like a real title.
const ACRONYMS = new Set(['IO', 'FPS', 'RPG', 'TD', 'RTS', 'MMO', 'MMORPG', '2D', '3D', 'VR', 'NES', 'SNES', 'GBA', 'FIFA', 'NBA', 'NFL', 'NHL', 'MLB', 'UFC', 'MMA', 'WWE', 'WW2', 'WW1', 'PvP', 'CO']);
const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs']);
function prettifyName(raw) {
	if (!raw) return 'this game';
	let s = String(raw);
	// Split camelCase / PascalCase: insert a space before each capital that
	// follows a lowercase letter or digit. Keeps acronyms (XYZ → XYZ) intact.
	s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	// Replace separators (hyphen, underscore, dot) with spaces.
	s = s.replace(/[-_.]+/g, ' ');
	// Insert a space between digit-runs and following letters, *unless* they
	// form a familiar pattern like `1v1`, `2v2`, `1on1` — those are titles
	// of their own genre, so preserve them with a special-case match.
	s = s.replace(/(\d+)v(\d+)/gi, ' $1v$2 ').replace(/(\d+)on(\d+)/gi, ' $1on$2 ');
	// Collapse extra whitespace.
	s = s.replace(/\s+/g, ' ').trim();
	// Title-case with small-word exceptions and acronym re-uppercasing.
	const words = s.split(' ');
	return words.map((w, i) => {
		const upper = w.toUpperCase();
		if (ACRONYMS.has(upper)) return upper;
		if (i > 0 && SMALL_WORDS.has(w.toLowerCase())) return w.toLowerCase();
		// Keep `1v1`, `1on1`, `2D`, `Xv3` stylings as-is if they start with a digit.
		if (/^\d/.test(w)) return w;
		return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
	}).join(' ');
}

// Compose the 1-2 sentence pitch from tags + type + name.
function pitchFor(name, tags, type) {
	const t = TYPE_COPY[type] ?? TYPE_COPY.webgl;
	const display = prettifyName(name);
	// Run lenient inference over the slug-name so games without curated tags
	// still land on a relevant pitch template instead of the generic fallback.
	const inferred = inferPitchTags(name, tags);
	const tagList = inferred.filter(tag => TAG_COPY[tag]);
	if (tagList.length === 0) {
		return `${display} is ${t.article} ${t.label} you can pick up in a single browser tab. No downloads, no signups — just press play.`;
	}
	// Use the first matching tag for the primary verb-phrase, the second tag
	// (if any) as a qualifier. This keeps copy varied across the catalog
	// without sounding templated when a player scrolls multiple cards.
	const [primaryTag, secondaryTag] = tagList;
	const [verb, qualifier] = TAG_COPY[primaryTag];
	let pitch = `In ${display}, ${verb} ${qualifier}.`;
	if (secondaryTag && secondaryTag !== primaryTag) {
		const [v2] = TAG_COPY[secondaryTag];
		pitch += ` Expect to ${v2} along the way.`;
	} else {
		pitch += ` Plays right in the browser, no installs needed.`;
	}
	return pitch;
}

const out = { ...existing };
let written = 0;
let skipped = 0;

for (const g of games) {
	const slug = (g.url && /^Assets\/([^/]+)\//.exec(g.url)?.[1]) ?? null;
	if (!slug) continue;
	if (ONLY && slug !== ONLY) continue;
	if (out[slug]?.manual && !FORCE) { skipped++; continue; }
	out[slug] = {
		pitch: pitchFor(g.name, g.tags, g.type),
		difficulty: difficultyFor(g.name, g.tags),
		durationMin: durationFor(g.type, g.tags),
		manual: out[slug]?.manual ?? false,
	};
	written++;
}

writeFileSync(OUT, JSON.stringify(out, null, '\t') + '\n');
console.log(`[generate-descriptions] wrote ${written}, preserved ${skipped} manual entries → ${OUT}`);
