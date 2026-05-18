/**
 * Brand voice — playful, low-key, never patronizing. Every empty / loading
 * / error / toast string the UI shows reads from here, so the personality
 * stays consistent and tone changes ship in one PR.
 */

export const LOAD_LINES = [
	'Polishing pixels…',
	'Waking the cartridge…',
	'Blowing on the connector…',
	'Calibrating joystick…',
	'Untangling the cord…',
	'Hatching the boss…',
	'Stretching before the run…',
	'Counting lives…',
];

export const EMPTY_SEARCH = [
	'Nothing matches that — try a softer filter?',
	'No hits. Loosen the spelling and try again.',
	'Drawing a blank. Maybe pop a tag off?',
];

export const EMPTY_FAVORITES = [
	"You haven't favorited anything yet. The little heart on each card pins it here.",
];

export const EMPTY_RECENTS = [
	"Once you play a game it'll show up here — instantly resumable.",
];

export const NOT_FOUND = {
	headline: "I looked. I really did. No game here.",
	body: "The link might be old, or the game got renamed. Try one of these:",
};

export const OFFLINE = {
	headline: "Catching some z's until you're back online.",
	body: "Jeo runs offline once it's been opened — your favorites and recents are safe. Reconnect to load new games.",
};

export const ERROR_GENERIC = "Something tripped. Refresh and we'll try again.";

export const TOAST = {
	favoriteAdded: 'Added to favorites',
	favoriteRemoved: 'Removed from favorites',
	saved: 'Saved',
	copied: 'Link copied',
	shared: 'Shared',
};

export const ACHIEVE = {
	unlockedPrefix: 'Unlocked',
	streakPrefix: 'Streak',
};

export const DAILY_DROP_INTRO = [
	"Jeo says: today's vibe is…",
	'Hand-picked for right now:',
	'Pulled fresh from the cartridge bin:',
	"If you only play one thing today:",
];

export const ONBOARD = {
	title1: 'Welcome to Jeo.',
	body1: 'Pick a face. We can change it later.',
	title2: 'Pick a vibe.',
	body2: 'Accent colors the buttons and the highlights.',
	title3: 'Pick a first game.',
	body3: "Anything healthy and quick to load. You're one click from playing.",
	finish: "Let's go",
	skip: 'Skip',
};

export const STREAK = {
	chip: (days: number) => `${days}d`,
	tooltip: (days: number) => days === 0
		? 'No streak yet — play any game today to start one.'
		: days === 1
			? '1-day streak. Tomorrow makes two.'
			: `${days}-day streak. Don't break it.`,
};

/** Deterministic-per-day pick — same line all day, fresh tomorrow. */
function todayKey(): string {
	return new Date().toISOString().slice(0, 10);
}

function hash(s: string): number {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
	return h;
}

export function pickDaily<T>(arr: readonly T[], salt = ''): T {
	if (!arr.length) throw new Error('voice.pickDaily: empty array');
	return arr[hash(todayKey() + salt) % arr.length];
}

export function pickRandom<T>(arr: readonly T[]): T {
	if (!arr.length) throw new Error('voice.pickRandom: empty array');
	return arr[Math.floor(Math.random() * arr.length)];
}
