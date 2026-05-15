/**
 * Grid runtime: search, type filter, density, progressive append.
 * Loads as a deferred module so it doesn't block paint.
 * Will be replaced by the virtualized Preact island in Sprint 1.
 */

type SerializedGame = {
	name: string;
	url: string;
	image: string | null;
	type: 'webgl' | 'flash' | 'retro';
	tags: string[];
	status: string | null;
};

const wrap = document.querySelector<HTMLElement>('[data-grid]');
if (wrap) {
	const grid = wrap.querySelector<HTMLElement>('#grid')!;
	const empty = wrap.querySelector<HTMLElement>('#grid-empty')!;
	const counter = wrap.querySelector<HTMLElement>('#grid-result-count')!;
	const sentinel = wrap.querySelector<HTMLElement>('#grid-sentinel')!;

	const remaining: SerializedGame[] = JSON.parse(wrap.dataset.rest ?? '[]');
	let revealed = 0;
	const BATCH = 60;

	let typeFilter: 'all' | 'webgl' | 'flash' | 'retro' = 'all';
	let query = '';

	const searchInput = document.querySelector<HTMLInputElement>('#grid-search');
	const typeButtons = document.querySelectorAll<HTMLButtonElement>('.filter-types .seg-btn');
	const densityButtons = document.querySelectorAll<HTMLButtonElement>('.density-toggle .density-btn');

	function matchesFilter(name: string, type: string, tags: string[]): boolean {
		if (typeFilter !== 'all' && type !== typeFilter) return false;
		if (!query) return true;
		const q = query.toLowerCase();
		if (name.toLowerCase().includes(q)) return true;
		return tags.some(t => t.toLowerCase().includes(q));
	}

	function applyFilters() {
		let shown = 0;
		grid.querySelectorAll<HTMLElement>('.card').forEach(card => {
			const name = card.dataset.name ?? '';
			const type = card.dataset.type ?? 'webgl';
			const tags = (card.dataset.tags ?? '').split('|').filter(Boolean);
			const ok = matchesFilter(name, type, tags);
			card.style.display = ok ? '' : 'none';
			if (ok) shown++;
		});
		empty.hidden = shown > 0;
		counter.textContent = `${shown.toLocaleString()} games`;
	}

	function createCard(g: SerializedGame): HTMLElement {
		const slug = (g.url.match(/^Assets\/([^/]+)\//) ?? [, ''])[1];
		const isBroken = g.status === 'broken' || g.status === 'maintenance';
		const typeIcon =
			g.type === 'flash'
				? '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor" />'
				: g.type === 'retro'
				? '<rect width="22" height="14" x="1" y="5" rx="4" fill="currentColor"/>'
				: '<circle cx="12" cy="12" r="3" fill="currentColor"/>';
		const a = document.createElement('a');
		a.className = 'card' + (isBroken ? ' card--broken' : '');
		a.href = `/game/${slug}`;
		a.dataset.slug = slug;
		a.dataset.name = g.name;
		a.dataset.type = g.type;
		a.dataset.tags = (g.tags ?? []).join('|');
		a.innerHTML = `
			<div class="card-cover">
				${g.image
					? `<img src="/${g.image}" alt="" loading="lazy" decoding="async" width="400" height="225">`
					: '<div class="card-cover-empty" aria-hidden="true"></div>'}
				<span class="card-type card-type--${g.type}" title="${g.type}">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${typeIcon}</svg>
				</span>
				<button class="card-fav" type="button" aria-label="Favorite ${g.name.replace(/"/g, '&quot;')}" data-fav-toggle="${slug}">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
				</button>
				${isBroken ? '<div class="card-broken-ribbon"><span>Maintenance</span></div>' : ''}
			</div>
			<div class="card-meta">
				<div class="card-title">${g.name.replace(/[<>&]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]!))}</div>
				${g.tags?.length ? `<div class="card-sub">${g.tags.slice(0, 2).join(' · ')}</div>` : ''}
			</div>
		`;
		return a;
	}

	function revealNext() {
		const slice = remaining.slice(revealed, revealed + BATCH);
		const frag = document.createDocumentFragment();
		for (const g of slice) frag.appendChild(createCard(g));
		grid.appendChild(frag);
		revealed += slice.length;
		applyFilters();
		if (revealed >= remaining.length) {
			io.disconnect();
			sentinel.remove();
		}
	}

	const io = new IntersectionObserver(
		entries => {
			for (const entry of entries) if (entry.isIntersecting) revealNext();
		},
		{ rootMargin: '600px' },
	);
	if (remaining.length) io.observe(sentinel);
	else sentinel.remove();

	// Annotate initial SSR cards with tags so the filter has data.
	grid.querySelectorAll<HTMLElement>('.card').forEach(card => {
		if (!card.dataset.tags) card.dataset.tags = '';
	});

	let searchT: number | null = null;
	searchInput?.addEventListener('input', () => {
		if (searchT) window.clearTimeout(searchT);
		searchT = window.setTimeout(() => {
			query = searchInput.value.trim();
			applyFilters();
		}, 120);
	});

	typeButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			typeButtons.forEach(b => b.classList.remove('is-active'));
			btn.classList.add('is-active');
			typeFilter = (btn.dataset.type ?? 'all') as typeof typeFilter;
			applyFilters();
		});
	});

	densityButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			densityButtons.forEach(b => b.classList.remove('is-active'));
			btn.classList.add('is-active');
			grid.dataset.density = btn.dataset.density ?? 'comfy';
		});
	});

	// `/` focuses search.
	document.addEventListener('keydown', e => {
		const target = e.target as HTMLElement | null;
		if (e.key === '/' && target && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
			e.preventDefault();
			searchInput?.focus();
		}
	});

	// Favorites toggle — local storage only for now; account sync lands in Sprint 5.
	try {
		const favs = new Set<string>(JSON.parse(localStorage.getItem('jeo-favs') ?? '[]'));
		grid.querySelectorAll<HTMLButtonElement>('[data-fav-toggle]').forEach(btn => {
			const slug = btn.dataset.favToggle!;
			if (favs.has(slug)) btn.classList.add('is-active');
		});
		document.addEventListener('click', e => {
			const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-fav-toggle]');
			if (!btn) return;
			e.preventDefault();
			e.stopPropagation();
			const slug = btn.dataset.favToggle!;
			if (favs.has(slug)) {
				favs.delete(slug);
				btn.classList.remove('is-active');
			} else {
				favs.add(slug);
				btn.classList.add('is-active');
			}
			localStorage.setItem('jeo-favs', JSON.stringify([...favs]));
		});
	} catch (_) {}
}

export {};
