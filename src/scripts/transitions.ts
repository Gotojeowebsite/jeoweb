/**
 * Astro ClientRouter glue — assigns view-transition-name on the source
 * card and the destination iframe so the cover image morphs into the
 * player when the user opens a game.
 *
 * Survives reduced-motion: when the user prefers reduced motion, the
 * View Transitions API still cross-fades but skips the shared-element
 * animation we'd set up here, because nothing is named.
 */

function isReducedMotion(): boolean {
	return typeof matchMedia !== 'undefined'
		&& matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let lastClickedSlug: string | null = null;

document.addEventListener('click', (e) => {
	const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="/play/"]');
	if (!a) return;
	const slug = (a.dataset.slug as string | undefined)
		?? a.getAttribute('href')?.replace(/^\/play\//, '').split(/[\/?#]/)[0];
	if (!slug) return;
	lastClickedSlug = slug;
	if (isReducedMotion()) return;
	// Tag the cover image on the card so the View Transitions API can
	// share-element it into the destination cover on /play/<slug>.
	const card = a.classList.contains('card') ? a : a.querySelector<HTMLElement>('.card');
	const cover = (card ?? a).querySelector<HTMLElement>('.card-cover, .card-cover img');
	if (cover) cover.style.setProperty('view-transition-name', 'jeo-player-cover');
}, { passive: true });

// On the destination route, the LaunchOverlay reads this attribute on body
// to know which slug to focus and to inherit the morphed cover. Astro fires
// astro:after-swap after the new DOM is in place.
document.addEventListener('astro:after-swap', () => {
	if (!lastClickedSlug) return;
	const overlay = document.querySelector<HTMLElement>(`[data-launch-overlay][data-slug="${lastClickedSlug}"]`);
	if (overlay) overlay.dataset.justArrived = '1';
});

export {};
