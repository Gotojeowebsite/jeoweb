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
	status?: 'broken' | 'maintenance' | 'unverified' | 'healthy';
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
	verdict: 'healthy' | 'broken' | 'maintenance' | 'unverified';
	lastChecked: string;
	signals?: Record<string, unknown>;
}

let _games: Game[] | null = null;
let _health: Record<string, HealthVerdict> | null = null;
let _recent: Game[] | null = null;

function loadJson<T>(relative: string, fallback: T): T {
	try {
		const raw = readFileSync(resolve(ROOT, relative), 'utf8');
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

export function getAllGames(): Game[] {
	if (!_games) {
		const raw = loadJson<Array<Partial<Game> & { type?: RawGameType }>>('games_list.json', []);
		_games = raw.map(g => ({
			name: g.name ?? 'Unknown',
			url: g.url ?? '',
			image: g.image ?? null,
			type: normalizeType(g.type),
			rawType: g.type,
			addedDate: g.addedDate ?? '',
			size: g.size ?? 0,
			tags: g.tags ?? [],
			genre: g.genre,
			status: g.status,
			requested: g.requested,
			leaderboard: g.leaderboard,
		}));
	}
	return _games;
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
	if (!_recent) _recent = loadJson<Game[]>('recently_added.json', []);
	return _recent;
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
