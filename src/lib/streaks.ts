/**
 * Local play streak — derived from a bounded Set of ISO dates the user
 * played on. Stored as 'jeo-play-days'. Backend-free.
 */

const KEY = 'jeo-play-days';
const MAX_DAYS = 365;

function isBrowser(): boolean {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function todayISO(): string {
	return new Date().toISOString().slice(0, 10);
}

function readDays(): string[] {
	if (!isBrowser()) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter(d => typeof d === 'string').sort() : [];
	} catch { return []; }
}

function writeDays(days: string[]): void {
	if (!isBrowser()) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(days.slice(-MAX_DAYS)));
	} catch { /* quota */ }
}

export function markToday(): void {
	const today = todayISO();
	const days = readDays();
	if (days[days.length - 1] === today) return;
	days.push(today);
	writeDays(days);
	if (isBrowser()) {
		window.dispatchEvent(new CustomEvent('jeo:streak-update', { detail: current() }));
	}
}

export function playedToday(): boolean {
	return readDays().includes(todayISO());
}

function diffDays(aISO: string, bISO: string): number {
	const a = new Date(aISO + 'T00:00:00Z').getTime();
	const b = new Date(bISO + 'T00:00:00Z').getTime();
	return Math.round((b - a) / 86_400_000);
}

export function current(): number {
	const days = readDays();
	if (!days.length) return 0;
	const today = todayISO();
	const last = days[days.length - 1];
	// If the most recent play wasn't today or yesterday the streak is broken.
	if (diffDays(last, today) > 1) return 0;
	let streak = 1;
	for (let i = days.length - 2; i >= 0; i--) {
		const gap = diffDays(days[i], days[i + 1]);
		if (gap === 1) streak++;
		else if (gap === 0) continue;
		else break;
	}
	return streak;
}

export function longest(): number {
	const days = readDays();
	if (!days.length) return 0;
	let best = 1, run = 1;
	for (let i = 1; i < days.length; i++) {
		const gap = diffDays(days[i - 1], days[i]);
		if (gap === 1) { run++; if (run > best) best = run; }
		else if (gap === 0) continue;
		else { run = 1; }
	}
	return best;
}

export function allDays(): string[] { return readDays(); }
