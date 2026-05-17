/**
 * Listens for jeo:achievement-unlock events and surfaces a toast with
 * confetti. Re-evaluates on hot-paths: page load (catches retroactive
 * unlocks after migrations) and storage events (multi-tab consistency).
 */

import { evaluate, type Achievement } from '../lib/achievements';
import { confetti } from './confetti';
import { ICON_PATHS } from '../components/icons';

const ICON_SVG = (path: string) =>
	`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;

function showToast(a: Achievement) {
	const host = document.getElementById('jeo-achievement-toast');
	if (!host) return;
	const path = ICON_PATHS[a.icon as keyof typeof ICON_PATHS] ?? ICON_PATHS.trophy;
	host.innerHTML = `
		<div class="achievement-toast__icon">${ICON_SVG(path)}</div>
		<div class="achievement-toast__body">
			<div class="achievement-toast__eyebrow">Unlocked</div>
			<div class="achievement-toast__name">${a.name}</div>
			<div class="achievement-toast__desc">${a.desc}</div>
		</div>`;
	host.hidden = false;
	confetti({ x: window.innerWidth - 200, y: window.innerHeight - 120 });
	window.clearTimeout((host as any)._t);
	(host as any)._t = window.setTimeout(() => { host.hidden = true; }, 4500);
}

window.addEventListener('jeo:achievement-unlock', (e: Event) => {
	const a = (e as CustomEvent<Achievement>).detail;
	if (!a) return;
	showToast(a);
});

// Re-evaluate on load — catches new unlocks earned via legacy state.
// Defer one tick so storage migrations settle first.
window.setTimeout(() => {
	try { evaluate(); } catch {}
}, 0);

// Multi-tab: re-evaluate when local state shifts elsewhere.
window.addEventListener('storage', e => {
	if (!e.key) return;
	if (e.key.startsWith('jeo-')) {
		try { evaluate(); } catch {}
	}
});

export {};
