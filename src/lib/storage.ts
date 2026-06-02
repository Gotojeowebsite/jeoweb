/**
 * Versioned preferences bag for Jeo. Centralises every "this is who I am
 * in this browser" knob — theme, accent, density, sound, avatar, onboarding
 * state — so components don't sprinkle localStorage reads/writes.
 *
 * Migrates legacy keys (jeo-theme, jeo-accent, jeo-favs, jeo-recent,
 * site-theme, site-accent) on first read and leaves them in place so the
 * legacy site keeps working until cutover settles.
 */

export type ThemePref = 'light' | 'dark' | 'auto';
export type DensityPref = 'comfy' | 'dense';
export type CloakPref = 'none' | 'classroom' | 'drive' | 'canvas' | 'docs' | 'custom';
export type CursorPref = 'default' | 'crosshair' | 'neon' | 'pixel';

export type Prefs = {
	v: 1;
	theme: ThemePref;
	accent: string | null;
	accentPreset: string | null;
	sound: boolean;
	soundVolume: number;
	density: DensityPref;
	avatar: string;
	onboarded: boolean;
	cloakPreset: CloakPref;
	cloakTitle: string;
	cloakIcon: string;
	panicKey: string;
	panicUrl: string;
	cursorStyle: CursorPref;
};

const KEY = 'jeo-prefs-v1';
const DEFAULTS: Prefs = {
	v: 1,
	theme: 'auto',
	accent: null,
	accentPreset: null,
	sound: true,
	soundVolume: 0.55,
	density: 'comfy',
	avatar: 'wave',
	onboarded: false,
	cloakPreset: 'none',
	cloakTitle: '',
	cloakIcon: '',
	panicKey: '`',
	panicUrl: 'https://classroom.google.com',
	cursorStyle: 'default',
};

function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

let cache: Prefs | null = null;

function migrate(): Partial<Prefs> {
	if (!isBrowser()) return {};
	const out: Partial<Prefs> = {};
	const legacyTheme = localStorage.getItem('jeo-theme') ?? localStorage.getItem('site-theme');
	if (legacyTheme === 'light' || legacyTheme === 'dark') out.theme = legacyTheme;
	const legacyAccent = localStorage.getItem('jeo-accent') ?? localStorage.getItem('site-accent');
	if (legacyAccent && /^#[0-9a-f]{6}$/i.test(legacyAccent)) out.accent = legacyAccent;
	return out;
}

export function readPrefs(): Prefs {
	if (cache) return cache;
	if (!isBrowser()) {
		const fresh: Prefs = { ...DEFAULTS };
		cache = fresh;
		return fresh;
	}
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === 'object' && parsed.v === 1) {
				const merged: Prefs = { ...DEFAULTS, ...parsed };
				cache = merged;
				return merged;
			}
		}
	} catch (_) { /* ignore */ }
	const next: Prefs = { ...DEFAULTS, ...migrate() };
	cache = next;
	try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (_) {}
	return next;
}

export function writePrefs(patch: Partial<Prefs>): Prefs {
	const next: Prefs = { ...readPrefs(), ...patch, v: 1 };
	cache = next;
	if (isBrowser()) {
		try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (_) {}
	}
	// Notify any listeners in this tab.
	if (isBrowser()) {
		window.dispatchEvent(new CustomEvent('jeo:prefs', { detail: next }));
	}
	return next;
}

export function getPref<K extends keyof Prefs>(key: K): Prefs[K] {
	return readPrefs()[key];
}

export function setPref<K extends keyof Prefs>(key: K, value: Prefs[K]): Prefs {
	return writePrefs({ [key]: value } as Partial<Prefs>);
}

export function resetPrefs(): void {
	cache = { ...DEFAULTS };
	if (isBrowser()) {
		try { localStorage.removeItem(KEY); } catch (_) {}
	}
}

export function onPrefsChange(handler: (p: Prefs) => void): () => void {
	if (!isBrowser()) return () => {};
	const listener = (e: Event) => handler((e as CustomEvent<Prefs>).detail);
	window.addEventListener('jeo:prefs', listener);
	return () => window.removeEventListener('jeo:prefs', listener);
}

// Helpers for the localStorage-backed lists the legacy site already owns.
// Kept here so consumers don't reach into raw keys.
export function getFavorites(): Set<string> {
	if (!isBrowser()) return new Set();
	try {
		const raw = localStorage.getItem('jeo-favs') ?? localStorage.getItem('jeo-favorites');
		if (!raw) return new Set();
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return new Set(parsed.map(String));
		if (parsed && typeof parsed === 'object') return new Set(Object.keys(parsed));
	} catch (_) {}
	return new Set();
}

export function setFavorites(set: Set<string>): void {
	if (!isBrowser()) return;
	try { localStorage.setItem('jeo-favs', JSON.stringify([...set])); } catch (_) {}
}

export type RecentEntry = { slug: string; name: string; image: string | null; lastPlayed: number };

export function getRecents(): RecentEntry[] {
	if (!isBrowser()) return [];
	try {
		const raw = localStorage.getItem('jeo-recent');
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			return parsed
				.map(p => typeof p === 'string' ? null : p as RecentEntry)
				.filter(Boolean) as RecentEntry[];
		}
	} catch (_) {}
	return [];
}
