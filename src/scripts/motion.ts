/**
 * Motion runtime — wires the .fx-tilt and .fx-ripple utilities to mouse
 * events. Designed to be cheap: rAF-throttled, listener-pooled, opt-in via
 * data attributes so we don't pay for elements that don't want it.
 *
 * The actual animations live in motion.css; this file just toggles CSS
 * custom properties and spawns ink elements.
 */

function isReducedMotion(): boolean {
	return typeof matchMedia !== 'undefined'
		&& matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const MAX_TILT_DEG = 6;

let rafId = 0;
let pendingTarget: HTMLElement | null = null;
let pendingX = 0;
let pendingY = 0;

function applyTilt() {
	rafId = 0;
	if (!pendingTarget) return;
	const el = pendingTarget;
	const rect = el.getBoundingClientRect();
	const px = (pendingX - rect.left) / rect.width;
	const py = (pendingY - rect.top) / rect.height;
	const x = (px - 0.5) * 2 * MAX_TILT_DEG;
	const y = (0.5 - py) * 2 * MAX_TILT_DEG;
	el.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
	el.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
	el.style.setProperty('--tilt-lift', '-2px');
}

function clearTilt(el: HTMLElement) {
	el.style.setProperty('--tilt-x', '0deg');
	el.style.setProperty('--tilt-y', '0deg');
	el.style.setProperty('--tilt-lift', '0px');
}

function bindTilt() {
	if (isReducedMotion()) return;
	document.addEventListener('mousemove', (e) => {
		const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('.fx-tilt');
		if (!target) {
			if (pendingTarget) {
				clearTilt(pendingTarget);
				pendingTarget = null;
			}
			return;
		}
		pendingTarget = target;
		pendingX = e.clientX;
		pendingY = e.clientY;
		if (!rafId) rafId = requestAnimationFrame(applyTilt);
	}, { passive: true });
	document.addEventListener('mouseleave', () => {
		if (pendingTarget) {
			clearTilt(pendingTarget);
			pendingTarget = null;
		}
	}, { passive: true });
}

function bindRipple() {
	document.addEventListener('click', (e) => {
		const host = (e.target as HTMLElement | null)?.closest<HTMLElement>('.fx-ripple');
		if (!host) return;
		const rect = host.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const ink = document.createElement('span');
		ink.className = 'fx-ripple-ink';
		ink.style.left = `${x - 6}px`;
		ink.style.top  = `${y - 6}px`;
		host.appendChild(ink);
		window.setTimeout(() => ink.remove(), 600);
	}, { passive: true });
}

function init() {
	bindTilt();
	bindRipple();
}

// Re-init isn't necessary — listeners are delegated.
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}

export {};
