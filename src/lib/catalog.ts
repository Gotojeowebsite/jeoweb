/**
 * Typed access to the existing games_list.json / game_health.json / recently_added.json
 * artifacts. The legacy pipeline (scan.js, broken_game_scanner.py, build-game-health.js)
 * keeps writing these — we just type them and read at build time.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// process.cwd() === the Astro project root at build time.
const ROOT = process.cwd();

export type GameType = 'webgl' | 'flash' | 'retro';
export type RawGameType = 'webgl' | 'flash' | 'gba' | 'snes' | 'nes' | 'retro' | string;

export type GameStatus = 'broken' | 'maintenance' | 'unverified' | 'probable_broken' | 'unknown' | 'healthy';

export type Difficulty = 'easy' | 'med' | 'hard';

export interface GameDescription {
	pitch: string;
	difficulty: Difficulty;
	durationMin: [number, number];
	/** When true, generate-descriptions.mjs leaves this entry untouched on
	 * re-runs. Set this on hand-curated overrides for top games. */
	manual?: boolean;
}

export interface Game {
	name: string;
	url: string;
	image: string | null;
	type: GameType;
	rawType?: RawGameType;
	addedDate: string;
	size: number;
	tags: string[];
	genre?: string;
	/** 1-2 sentence editorial pitch. Sourced from game_descriptions.json
	 * (build artifact). May be undefined for games not yet generated. */
	pitch?: string;
	/** Difficulty bucket surfaced on cards and the detail page. */
	difficulty?: Difficulty;
	/** Inclusive [min, max] minutes per play session — drives the "≈5-15 min"
	 * chip on cards. */
	durationMin?: [number, number];
	/** Display-friendly name derived from the slug at build time so cards
	 * don't show "1on1SoccerBigHeads" or "crossy-road-space". */
	displayName?: string;
	/** Canonical merged verdict — from game_health.json when present, otherwise
	 * the HTML-marker status from games_list.json. Frontend should treat
	 * `probable_broken` and `unknown` as live (no hide); only `broken` and
	 * `maintenance` hide the game from default catalog views. */
	status?: GameStatus;
	/** Confidence level on the status verdict — only set when sourced from
	 * game_health.json. Higher confidence = more agreeing signals. */
	confidence?: 'high' | 'medium' | 'low';
	requested?: boolean;
	leaderboard?: 'score' | 'time' | false;
}

function normalizeType(t: RawGameType | undefined): GameType {
	if (t === 'flash') return 'flash';
	if (t === 'webgl') return 'webgl';
	// gba, snes, nes, retro and anything else from EmulatorJS → retro
	if (t) return 'retro';
	return 'webgl';
}

export interface HealthVerdict {
	verdict: GameStatus;
	confidence?: 'high' | 'medium' | 'low';
	source?: string;
	reason?: string;
	last_verified_at?: number;
	last_known_good?: number;
	signals?: Record<string, unknown>;
}

let _games: Game[] | null = null;
let _health: Record<string, HealthVerdict> | null = null;
let _recent: Game[] | null = null;
let _descriptions: Record<string, GameDescription> | null = null;
let _similar: Record<string, string[]> | null = null;

// Pretty-print a slug-like game name. Mirrors the logic in
// scripts/generate-descriptions.mjs so cards, detail pages, and pitches
// all show the same title. Kept here (and not imported) so the type-checked
// Astro build doesn't pull a .mjs module — duplication is intentional.
const NAME_ACRONYMS = new Set(['IO','FPS','RPG','TD','RTS','MMO','MMORPG','2D','3D','VR','NES','SNES','GBA','FIFA','NBA','NFL','NHL','MLB','UFC','MMA','WWE','WW2','WW1','PvP','CO']);
const NAME_SMALL = new Set(['a','an','and','as','at','but','by','for','in','of','on','or','the','to','vs']);
export function prettifyGameName(raw: string | undefined | null): string {
	if (!raw) return 'this game';
	let s = String(raw)
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_.]+/g, ' ')
		.replace(/(\d+)v(\d+)/gi, ' $1v$2 ')
		.replace(/(\d+)on(\d+)/gi, ' $1on$2 ')
		.replace(/\s+/g, ' ')
		.trim();
	return s.split(' ').map((w, i) => {
		const up = w.toUpperCase();
		if (NAME_ACRONYMS.has(up)) return up;
		if (i > 0 && NAME_SMALL.has(w.toLowerCase())) return w.toLowerCase();
		if (/^\d/.test(w)) return w;
		return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
	}).join(' ');
}

function loadJson<T>(relative: string, fallback: T): T {
	try {
		const raw = readFileSync(resolve(ROOT, relative), 'utf8');
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

/** Build-time guard: refuse to ship an empty catalog. A run of scan.js
 *  that drops the catalog would otherwise silently deploy a blank site. */
function assertNonEmpty<T>(items: T[], file: string): T[] {
	if (!items.length) {
		throw new Error(
			`catalog: ${file} is empty. Refusing to build a blank site. ` +
			`Run \`node scan.js\` and confirm games_list.json has entries before retrying.`
		);
	}
	return items;
}

export function getAllGames(): Game[] {
	if (!_games) {
		const raw = assertNonEmpty(
			loadJson<Array<Partial<Game> & { type?: RawGameType }>>('games_list.json', []),
			'games_list.json',
		);
		const health = getHealth();
		const descriptions = getDescriptions();
		_games = raw.map((g) => {
			const name = g.name ?? 'Unknown';
			// Canonical verdict comes from game_health.json (schema 2). Falls
			// back to the games_list.json status field (HTML-marker derived)
			// only when no health entry exists. The HTML-marker path is the
			// least authoritative signal in the resolution chain.
			const verdict = health[name];
			const status: GameStatus | undefined = verdict ? verdict.verdict : g.status;
			// Slug is the Assets/<dir>/ folder name — mirrors gameSlug() but
			// inlined here so we can look up descriptions in the same pass.
			const slugMatch = /^Assets\/([^/]+)\//.exec(g.url ?? '');
			const slug = slugMatch ? slugMatch[1] : '';
			const desc = slug ? descriptions[slug] : undefined;
			return {
				name,
				url: g.url ?? '',
				image: g.image ?? null,
				type: normalizeType(g.type),
				rawType: g.type,
				addedDate: g.addedDate ?? '',
				size: g.size ?? 0,
				tags: g.tags ?? [],
				genre: g.genre,
				pitch: desc?.pitch,
				difficulty: desc?.difficulty,
				durationMin: desc?.durationMin,
				displayName: prettifyGameName(name),
				status,
				confidence: verdict?.confidence,
				requested: g.requested,
				leaderboard: g.leaderboard,
			};
		});
	}
	return _games;
}

export function getDescriptions(): Record<string, GameDescription> {
	if (!_descriptions) {
		_descriptions = loadJson<Record<string, GameDescription>>('game_descriptions.json', {});
	}
	return _descriptions;
}

/** Pre-computed similarity map written by scripts/build-similarity.mjs.
 * Empty object when the build hasn't run yet — callers should fall back
 * to runtime tag overlap. */
export function getSimilar(): Record<string, string[]> {
	if (!_similar) {
		_similar = loadJson<Record<string, string[]>>('similar.json', {});
	}
	return _similar;
}

/** Weekly editorial picks from scripts/rotate-featured.mjs. Committed by
 * the featured-rotation GH Actions cron every Monday — readers get a fresh
 * Hot This Week rail without any backend. Falls back to empty when the
 * file is missing so the home page degrades cleanly. */
export interface FeaturedPicks {
	week: string;
	generatedAt: string;
	picks: string[];
}
let _featured: FeaturedPicks | null = null;
export function getFeatured(): FeaturedPicks {
	if (_featured) return _featured;
	_featured = loadJson<FeaturedPicks>('featured.json', { week: '', generatedAt: '', picks: [] });
	return _featured;
}

/** Resolve a list of slugs into full Game objects via getAllGames(). Drops
 * any slug that doesn't resolve so a stale featured.json never renders
 * empty cards. */
export function gamesBySlugs(slugs: string[]): Game[] {
	const all = getAllGames();
	const map = new Map(all.map(g => [gameSlug(g), g] as const));
	const out: Game[] = [];
	for (const s of slugs) {
		const g = map.get(s);
		if (g && g.image) out.push(g);
	}
	return out;
}

export function getHealth(): Record<string, HealthVerdict> {
	if (!_health) {
		const raw = loadJson<{ games?: Record<string, HealthVerdict> }>(
			'game_health.json',
			{ games: {} }
		);
		_health = raw.games ?? {};
	}
	return _health;
}

export function getRecentlyAdded(): Game[] {
	if (_recent) return _recent;
	const raw = loadJson<Array<Partial<Game>>>('recently_added.json', []);
	// Recently-added is a thin pointer list — enrich by looking each slug up
	// in the main catalog so descriptions, displayName, difficulty, and
	// duration land on rail cards too. Otherwise the "Newly added" rail
	// shows raw slugs while the rest of the site shows prettified names.
	const all = getAllGames();
	const bySlug = new Map(all.map(g => [gameSlug(g), g] as const));
	const byName = new Map(all.map(g => [g.name, g] as const));
	const out: Game[] = [];
	for (const r of raw) {
		const slugMatch = /^Assets\/([^/]+)\//.exec(r.url ?? '');
		const slug = slugMatch ? slugMatch[1] : null;
		const hit = (slug && bySlug.get(slug)) || (r.name && byName.get(r.name)) || null;
		if (hit) {
			out.push(hit);
		} else if (r.name) {
			// Fall back to the raw entry but at least prettify the display
			// name so the rail doesn't show "zombiealienparasites".
			out.push({
				name: r.name,
				url: r.url ?? '',
				image: r.image ?? null,
				type: normalizeType(r.type as RawGameType),
				rawType: r.type as RawGameType | undefined,
				addedDate: r.addedDate ?? '',
				size: r.size ?? 0,
				tags: r.tags ?? [],
				displayName: prettifyGameName(r.name),
			});
		}
	}
	_recent = out;
	return out;
}

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function gameSlug(g: Game): string {
	// Mirrors scan.js: slug is the Assets/<dir> name; url is "Assets/<slug>/index.html".
	const match = /^Assets\/([^/]+)\//.exec(g.url);
	return match ? match[1] : slugify(g.name);
}

export function gameTypeLabel(t: GameType): string {
	return { webgl: 'WebGL', flash: 'Flash', retro: 'Retro' }[t];
}

/** Stable deterministic pick — useful for "Game of the Day" SSR. */
export function pickOfTheDay(games: Game[], dateKey = new Date().toISOString().slice(0, 10)): Game | null {
	if (!games.length) return null;
	let hash = 0;
	for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
	return games[hash % games.length] ?? null;
}

export function getCatalogStats() {
	const all = getAllGames();
	const stats = { total: all.length, webgl: 0, flash: 0, retro: 0, requested: 0 };
	for (const g of all) {
		if (g.type === 'webgl') stats.webgl++;
		else if (g.type === 'flash') stats.flash++;
		else if (g.type === 'retro') stats.retro++;
		if (g.requested) stats.requested++;
	}
	return stats;
}
