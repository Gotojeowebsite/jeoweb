/**
 * Local-only achievement engine. ~16 hardcoded unlocks, each derived from
 * play events + the existing localStorage state (favorites, recents,
 * play-days). No backend. Unlocks fire a CustomEvent that the toast +
 * sound + confetti subsystems hook.
 *
 * Storage shape:
 *   jeo-achievements:  { [id]: epochMs }  (when unlocked)
 *   jeo-play-counts:   { [slug]: count } (per-game launch counter)
 *   jeo-play-tags:     string[]           (unique tags played)
 */

import { current as currentStreak } from './streaks';

export interface Achievement {
	id: string;
	name: string;
	desc: string;
	icon: 'flame' | 'sparkles' | 'trophy' | 'heart' | 'gamepad' | 'zap' | 'package' | 'eye' | 'shield' | 'dice';
}

export const CATALOG: Achievement[] = [
	{ id: 'first-launch',   name: 'First play',          desc: 'You launched your first game.',              icon: 'sparkles' },
	{ id: 'ten-games',      name: 'Sampler',             desc: 'Launched 10 different games.',                icon: 'gamepad' },
	{ id: 'twenty-five',    name: 'Connoisseur',         desc: 'Launched 25 different games.',                icon: 'package' },
	{ id: 'flash-fanatic',  name: 'Flash fanatic',       desc: 'Played 5 Flash games.',                       icon: 'zap' },
	{ id: 'retro-rebel',    name: 'Retro rebel',         desc: 'Played 5 retro / emulator games.',            icon: 'gamepad' },
	{ id: 'web-warrior',    name: 'Web warrior',         desc: 'Played 10 WebGL / browser games.',            icon: 'shield' },
	{ id: 'tastemaker',     name: 'Tastemaker',          desc: 'Favorited 5 games.',                          icon: 'heart' },
	{ id: 'curator',        name: 'Curator',             desc: 'Favorited 15 games.',                         icon: 'heart' },
	{ id: 'streak-3',       name: '3-day streak',        desc: 'Played on 3 consecutive days.',               icon: 'flame' },
	{ id: 'streak-7',       name: 'Week-long streak',    desc: 'Played on 7 consecutive days.',               icon: 'flame' },
	{ id: 'streak-30',      name: 'Month-long streak',   desc: 'Played on 30 consecutive days.',              icon: 'flame' },
	{ id: 'night-owl',      name: 'Night owl',           desc: 'Played between midnight and 4am.',            icon: 'eye' },
	{ id: 'early-bird',     name: 'Early bird',          desc: 'Played before 7am.',                          icon: 'sparkles' },
	{ id: 'marathon',       name: 'Marathon',            desc: 'Played a single session for 30+ minutes.',    icon: 'trophy' },
	{ id: 'explorer',       name: 'Explorer',            desc: 'Played games covering 10 different tags.',    icon: 'dice' },
	{ id: 'completionist',  name: 'Completionist',       desc: 'Played the same game 5 times.',               icon: 'trophy' },
];

const KEY_UNLOCKS = 'jeo-achievements';
const KEY_COUNTS  = 'jeo-play-counts';
const KEY_TAGS    = 'jeo-play-tags';
const KEY_FAVS    = 'jeo-favs';

function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readObj<T extends object>(key: string, fallback: T): T {
	if (!isBrowser()) return fallback;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === 'object' ? parsed as T : fallback;
	} catch { return fallback; }
}
function writeObj(key: string, val: unknown): void {
	if (!isBrowser()) return;
	try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function readArr<T>(key: string): T[] {
	if (!isBrowser()) return [];
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed as T[] : [];
	} catch { return []; }
}

export function unlocked(): Record<string, number> {
	return readObj<Record<string, number>>(KEY_UNLOCKS, {});
}

export function isUnlocked(id: string): boolean {
	return id in unlocked();
}

function unlock(id: string) {
	if (!isBrowser()) return;
	const all = unlocked();
	if (all[id]) return;
	all[id] = Date.now();
	writeObj(KEY_UNLOCKS, all);
	const def = CATALOG.find(a => a.id === id);
	if (!def) return;
	window.dispatchEvent(new CustomEvent('jeo:achievement-unlock', { detail: def }));
}

export type PlayEvent = {
	slug: string;
	name?: string;
	type: 'webgl' | 'flash' | 'retro';
	tags?: string[];
};

/** Record that a game launched. Bumps counters, marks tag exposure,
 * evaluates any unlocks gated on this event. */
export function recordPlayStart(ev: PlayEvent): void {
	if (!isBrowser()) return;
	const counts = readObj<Record<string, number>>(KEY_COUNTS, {});
	counts[ev.slug] = (counts[ev.slug] ?? 0) + 1;
	writeObj(KEY_COUNTS, counts);

	const tags = new Set(readArr<string>(KEY_TAGS));
	for (const t of ev.tags ?? []) tags.add(t);
	writeObj(KEY_TAGS, [...tags]);

	evaluate(ev);
}

/** Record a session length on the way out — drives marathon. */
export function recordPlayEnd(durationMs: number): void {
	if (durationMs >= 30 * 60 * 1000) unlock('marathon');
}

export function evaluate(latest?: PlayEvent): void {
	const counts = readObj<Record<string, number>>(KEY_COUNTS, {});
	const slugs  = Object.keys(counts);
	const flashCount = slugs.filter(s => latest && /* per-slug type unknown */ false).length;
	// Per-type counts require a side table; we derive from the latest event
	// + a tiny rolling counter so we don't need to call the catalog API at
	// runtime. The rolling type counter sits next to counts.
	const typeCounts = readObj<Record<string, number>>('jeo-play-type-counts', { webgl: 0, flash: 0, retro: 0 });
	if (latest) {
		typeCounts[latest.type] = (typeCounts[latest.type] ?? 0) + 1;
		writeObj('jeo-play-type-counts', typeCounts);
	}

	// First-launch
	if (slugs.length >= 1) unlock('first-launch');
	if (slugs.length >= 10) unlock('ten-games');
	if (slugs.length >= 25) unlock('twenty-five');

	// Type-specific
	if ((typeCounts.flash ?? 0) >= 5)  unlock('flash-fanatic');
	if ((typeCounts.retro ?? 0) >= 5)  unlock('retro-rebel');
	if ((typeCounts.webgl ?? 0) >= 10) unlock('web-warrior');

	// Favorites
	const favs = readArr<string>(KEY_FAVS);
	if (favs.length >= 5)  unlock('tastemaker');
	if (favs.length >= 15) unlock('curator');

	// Streaks
	const s = currentStreak();
	if (s >= 3)  unlock('streak-3');
	if (s >= 7)  unlock('streak-7');
	if (s >= 30) unlock('streak-30');

	// Time of day
	const h = new Date().getHours();
	if (h >= 0 && h < 4) unlock('night-owl');
	if (h >= 4 && h < 7) unlock('early-bird');

	// Explorer
	const tags = readArr<string>(KEY_TAGS);
	if (tags.length >= 10) unlock('explorer');

	// Completionist — same slug played 5 times
	if (Object.values(counts).some(c => c >= 5)) unlock('completionist');

	// Silence the unused-var warning for the unused intermediate.
	void flashCount;
}

export function totals() {
	return {
		unlocked: Object.keys(unlocked()).length,
		total: CATALOG.length,
		streak: currentStreak(),
	};
}
