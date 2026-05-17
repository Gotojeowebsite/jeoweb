/**
 * Wire UI sounds to the existing DOM via delegated listeners. Lazy: the
 * AudioContext only spins up after the first interaction, satisfying the
 * autoplay policy.
 *
 * Triggers:
 *   - card hover  → blip (150 ms throttle per element)
 *   - .btn--primary click → pop
 *   - link click to /play/* → launch (the curtain rise)
 *   - jeo:achievement-unlock → chime
 *   - Cmd-K palette open → swoosh
 */

import { sound } from '../lib/sound';

let firstInteractionDone = false;
function onFirstInteraction() {
	if (firstInteractionDone) return;
	firstInteractionDone = true;
	sound.wire();
}
window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });

// Per-element hover throttle so a fast mouse sweep doesn't machine-gun blips.
const HOVER_COOLDOWN = 150;
const hoverLast = new WeakMap<Element, number>();

document.addEventListener('mouseenter', (e) => {
	const t = e.target as HTMLElement | null;
	const card = t?.closest?.('.card');
	if (!card) return;
	const last = hoverLast.get(card) ?? 0;
	const now = Date.now();
	if (now - last < HOVER_COOLDOWN) return;
	hoverLast.set(card, now);
	sound.play('blip');
}, true);

document.addEventListener('click', (e) => {
	const t = e.target as HTMLElement | null;
	if (!t) return;
	if (t.closest('.btn--primary')) {
		sound.play('pop');
	}
	const playLink = t.closest<HTMLAnchorElement>('a[href^="/play/"]');
	if (playLink) {
		sound.play('launch');
	}
}, true);

window.addEventListener('jeo:achievement-unlock', () => sound.play('chime'));
window.addEventListener('jeo:cmdk-open', () => sound.play('swoosh'));

export {};
