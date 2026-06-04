/**
 * Grid runtime: search, filter, sort, density.
 *
 * Single source of truth: an in-memory `allGames` array hydrated from the
 * SSR cards plus `data-rest` JSON. Every filter/sort/surprise operates on
 * that array, not on the DOM. The DOM is reconciled to match the filtered
 * state — cards keep their identity (one node per slug, cached in
 * `nodes`) so favorites and event listeners survive across rerenders.
 *
 * Why this matters: the previous version walked
 * `grid.querySelectorAll('.card')`, which only sees cards that have
 * already been progressively appended by an IntersectionObserver. A user
 * searching for a game in the unscrolled tail got zero results. That bug
 * is fixed here by materializing all 600+ cards into the DOM up front
 * (cost: small one-time hydration after first paint; benefit: correct
 * search/sort across the whole catalog).
 */

type Difficulty = 'easy' | 'med' | 'hard';

type SerializedGame = {
	name: string;
	url: string;
	image: string | null;
	type: 'webgl' | 'flash' | 'retro';
	tags: string[];
	status: string | null;
	displayName?: string | null;
	difficulty?: Difficulty | null;
	durationMin?: [number, number] | null;
};

type Game = SerializedGame & {
	slug: string;
	displayName: string;
	difficulty: Difficulty | null;
	durationMin: [number, number] | null;
	haystack: string;
};

// Mirrors prettifyGameName() in src/lib/catalog.ts. Kept in sync by hand
// so we don't drag an ES import into a runtime-bundled script that needs
// to start fast on first paint.
const RT_ACRONYMS = new Set(['IO','FPS','RPG','TD','RTS','MMO','MMORPG','2D','3D','VR','NES','SNES','GBA','FIFA','NBA','NFL','NHL','MLB','UFC','MMA','WWE','WW2','WW1','PvP','CO']);
const RT_SMALL = new Set(['a','an','and','as','at','but','by','for','in','of','on','or','the','to','vs']);
function prettifyName(raw: string): string {
	if (!raw) return '';
	let s = raw
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_.]+/g, ' ')
		.replace(/(\d+)v(\d+)/gi, ' $1v$2 ')
		.replace(/(\d+)on(\d+)/gi, ' $1on$2 ')
		.replace(/\s+/g, ' ')
		.trim();
	return s.split(' ').map((w, i) => {
		const up = w.toUpperCase();
		if (RT_ACRONYMS.has(up)) return up;
		if (i > 0 && RT_SMALL.has(w.toLowerCase())) return w.toLowerCase();
		if (/^\d/.test(w)) return w;
		return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
	}).join(' ');
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
	easy: 'Easy', med: 'Medium', hard: 'Tough',
};

function chipsHtml(g: { difficulty: Difficulty | null; durationMin: [number, number] | null; tags: string[] }): string {
	const parts: string[] = [];
	if (g.difficulty) {
		parts.push(`<span class="card-chip card-chip--diff-${g.difficulty}">${DIFFICULTY_LABEL[g.difficulty]}</span>`);
	}
	if (g.durationMin) {
		const [lo, hi] = g.durationMin;
		const range = lo === hi ? `≈${lo} min` : `≈${lo}-${hi} min`;
		parts.push(`<span class="card-chip card-chip--time">${range}</span>`);
	}
	if (!parts.length && g.tags?.length) {
		parts.push(`<span class="card-chip card-chip--ghost">${escapeHtml(g.tags.slice(0, 2).join(' · '))}</span>`);
	}
	return parts.length ? `<div class="card-sub">${parts.join('')}</div>` : '';
}

type SortMode = 'added' | 'az' | 'za' | 'random' | 'rating';
type TypeFilter = 'all' | 'webgl' | 'flash' | 'retro';

const SHOW_MAINTENANCE_KEY = 'jeo-show-maintenance';
const FAVS_KEY = 'jeo-favs';

function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9 ]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function slugFromUrl(url: string, fallbackName: string): string {
	const m = url.match(/^Assets\/([^/]+)\//);
	if (m) return m[1];
	return normalize(fallbackName).replace(/\s+/g, '-');
}

function buildHaystack(name: string, slug: string, type: string, tags: string[]): string {
	return [
		normalize(name),
		slug.replace(/-/g, ' '),
		type,
		tags.map(normalize).join(' '),
	].join(' ');
}

function isBrokenStatus(status: string | null | undefined): boolean {
	return status === 'broken' || status === 'maintenance';
}

function typeIconMarkup(type: Game['type']): string {
	if (type === 'flash') return '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>';
	if (type === 'retro')
		return '<rect width="20" height="14" x="2" y="6" rx="3"/><circle cx="8" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="17" cy="12" r="1.2"/>';
	return '<path d="M9.94 2.83 12 5l2.06-2.17a4 4 0 0 1 5.66 5.66L12 16l-7.71-7.51a4 4 0 0 1 5.65-5.66Z"/>';
}

function escapeHtml(s: string): string {
	return s.replace(/[<>&"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[m]!));
}

function createCard(g: Game, favs: Set<string>): HTMLElement {
	const isBroken = isBrokenStatus(g.status);
	const isProbable = g.status === 'probable_broken';
	const isUnverified = g.status === 'unverified';
	const variantClass = isBroken
		? ' card--broken'
		: isProbable
		? ' card--probable'
		: isUnverified
		? ' card--unverified'
		: '';
	const ribbon = isBroken
		? (g.status === 'maintenance' ? 'Maintenance' : 'Broken')
		: isProbable
		? 'Probably broken'
		: null;

	const a = document.createElement('a');
	a.className = 'card fx-tilt fx-ripple' + variantClass;
	a.href = `/play/${g.slug}`;
	a.dataset.slug = g.slug;
	a.dataset.name = g.name;
	a.dataset.type = g.type;
	a.dataset.status = g.status ?? 'healthy';
	a.dataset.tags = g.tags.join('|');

	const displayName = g.displayName || prettifyName(g.name);
	const safeName = escapeHtml(g.name);
	const safeDisplay = escapeHtml(displayName);
	const favActive = favs.has(g.slug) ? ' is-active' : '';
	const ribbonHtml = ribbon
		? `<div class="card-broken-ribbon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>${ribbon}</span></div>`
		: '';
	// Mirror the GameCard <picture> structure for runtime-rendered tiles so
	// the WebP siblings written by scripts/convert-covers-to-webp.mjs get
	// picked up everywhere — not just the first 60 SSR cards.
	const imgHtml = g.image
		? (() => {
			const escaped = escapeHtml(g.image);
			const hasWebpSource = !/\.(webp|svg|ico|gif)$/i.test(g.image);
			const webp = hasWebpSource ? escapeHtml(g.image.replace(/\.[^.]+$/, '.webp')) : null;
			const source = webp ? `<source srcset="/${webp}" type="image/webp">` : '';
			return `<picture>${source}<img src="/${escaped}" alt="" loading="lazy" decoding="async" width="400" height="225"></picture>`;
		})()
		: `<div class="card-cover-empty" aria-hidden="true"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="6" rx="3"/><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><circle cx="15" cy="11" r=".5" fill="currentColor"/><circle cx="17" cy="13" r=".5" fill="currentColor"/></svg></div>`;
	const subHtml = chipsHtml(g);

	a.innerHTML = `
		<div class="card-cover">
			${imgHtml}
			<span class="card-type card-type--${g.type}" title="${g.type}">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${typeIconMarkup(g.type)}</svg>
			</span>
			<button class="card-fav${favActive}" type="button" aria-label="Favorite ${safeName}" data-fav-toggle="${g.slug}">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="${favs.has(g.slug) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
			</button>
			${ribbonHtml}
		</div>
		<div class="card-meta">
			<div class="card-title">${safeDisplay}</div>
			${subHtml}
		</div>
	`;
	return a;
}

const wrap = document.querySelector<HTMLElement>('[data-grid]');
if (wrap) {
	const grid = wrap.querySelector<HTMLElement>('#grid')!;
	const empty = wrap.querySelector<HTMLElement>('#grid-empty')!;
	const counter = wrap.querySelector<HTMLElement>('#grid-result-count')!;
	const sentinel = wrap.querySelector<HTMLElement>('#grid-sentinel');

	const searchInput = document.querySelector<HTMLInputElement>('#grid-search');
	const searchClear = document.querySelector<HTMLButtonElement>('#grid-search-clear');
	const typeButtons = document.querySelectorAll<HTMLButtonElement>('.filter-types .seg-btn');
	const densityButtons = document.querySelectorAll<HTMLButtonElement>('.density-toggle .density-btn');
	const sortSelect = document.querySelector<HTMLSelectElement>('#grid-sort');
	const surpriseBtn = document.querySelector<HTMLButtonElement>('#surprise-me');
	const maintenanceToggle = document.querySelector<HTMLInputElement>('#grid-maintenance');

	// ---- Hydrate from SSR + data-rest --------------------------------------
	const favs = new Set<string>(
		(() => {
			try { return JSON.parse(localStorage.getItem(FAVS_KEY) ?? '[]'); }
			catch { return []; }
		})(),
	);

	const ssrCardEls = [...grid.querySelectorAll<HTMLAnchorElement>('a.card')];
	const nodes = new Map<string, HTMLElement>();
	const ssrGames: Game[] = [];

	for (const el of ssrCardEls) {
		const slug = el.dataset.slug ?? '';
		if (!slug) continue;
		const name = el.dataset.name ?? '';
		const type = (el.dataset.type ?? 'webgl') as Game['type'];
		const tags = (el.dataset.tags ?? '').split('|').filter(Boolean);
		const status = el.dataset.status ?? null;
		const imgEl = el.querySelector('img');
		const image = imgEl?.getAttribute('src')?.replace(/^\//, '') ?? null;
		const displayName = el.dataset.displayName || prettifyName(name);
		const difficulty = (el.dataset.difficulty || null) as Difficulty | null;
		const dMin = Number(el.dataset.durationMin);
		const dMax = Number(el.dataset.durationMax);
		const durationMin: [number, number] | null = Number.isFinite(dMin) && Number.isFinite(dMax) && dMin > 0
			? [dMin, dMax] : null;
		const haystack = buildHaystack(name, slug, type, tags);
		ssrGames.push({
			slug,
			name,
			url: `Assets/${slug}/`,
			image,
			type,
			tags,
			status,
			displayName,
			difficulty,
			durationMin,
			haystack,
		});
		nodes.set(slug, el);
		// Sync favorite state on SSR card to current localStorage.
		const favBtn = el.querySelector<HTMLButtonElement>('[data-fav-toggle]');
		if (favBtn) {
			if (favs.has(slug)) favBtn.classList.add('is-active');
			else favBtn.classList.remove('is-active');
		}
	}

	const rest: SerializedGame[] = (() => {
		try { return JSON.parse(wrap.dataset.rest ?? '[]'); }
		catch { return []; }
	})();
	const restGames: Game[] = rest.map(g => {
		const slug = slugFromUrl(g.url, g.name);
		return {
			...g,
			slug,
			displayName: g.displayName || prettifyName(g.name),
			difficulty: g.difficulty ?? null,
			durationMin: g.durationMin ?? null,
			haystack: buildHaystack(g.name, slug, g.type, g.tags ?? []),
		};
	});

	const allGames: Game[] = [...ssrGames, ...restGames];
	const originalOrder = new Map(allGames.map((g, i) => [g.slug, i]));

	// ---- State ---------------------------------------------------------------
	let showBroken = localStorage.getItem(SHOW_MAINTENANCE_KEY) === '1';
	if (maintenanceToggle) maintenanceToggle.checked = showBroken;
	let typeFilter: TypeFilter = 'all';
	let query = '';
	let sort: SortMode = 'added';
	let randomSeed: Game[] | null = null;

	// ---- Global ratings state -----------------------------------------------
	/** Map from slug → { avg: number; count: number } loaded from backend. */
	const globalRatings = new Map<string, { avg: number; count: number }>();

	function applyGlobalRatings(data: Record<string, { avg: number; count: number }>) {
		globalRatings.clear();
		for (const [slug, r] of Object.entries(data)) {
			if (r && r.count >= 1) globalRatings.set(slug, r);
		}
		if (sort === 'rating') render();
	}

	async function fetchAndApplyRatings() {
		try {
			// Prefer JeoRatings (already handles caching, backend URL, optimistic updates)
			if ((window as any).JeoRatings) {
				const data = await (window as any).JeoRatings.fetchGlobalRatings();
				if (data && typeof data === 'object') { applyGlobalRatings(data); return; }
			}
			// Direct backend fetch fallback
			let backendUrl: string | null = null;
			try {
				const ls = localStorage.getItem('jeo:backendUrl');
				if (ls && /^https?:\/\//.test(ls) && !/REPLACE|YOUR-/i.test(ls)) backendUrl = ls.replace(/\/+$/, '');
			} catch {}
			if (!backendUrl) {
				const meta = document.querySelector<HTMLMetaElement>('meta[name="jeo-backend"]');
				const v = meta?.content?.trim();
				if (v && /^https?:\/\//.test(v) && !/REPLACE|YOUR-/i.test(v)) backendUrl = v.replace(/\/+$/, '');
			}
			if (!backendUrl) return;
			const res = await fetch(backendUrl + '/api/ratings', { signal: AbortSignal.timeout(5000) });
			if (!res.ok) return;
			const data = await res.json() as { ratings?: Record<string, { avg: number; count: number }> };
			if (data?.ratings) applyGlobalRatings(data.ratings);
		} catch (e) {
			console.debug('[grid] fetchAndApplyRatings failed:', e);
		}
	}

	function visibleGames(): Game[] {
		const q = normalize(query);
		const tokens = q ? q.split(' ').filter(Boolean) : [];
		const filtered = allGames.filter(g => {
			if (!showBroken && isBrokenStatus(g.status)) return false;
			if (typeFilter !== 'all' && g.type !== typeFilter) return false;
			if (!tokens.length) return true;
			return tokens.every(t => g.haystack.includes(t));
		});
		if (sort === 'az') return filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
		if (sort === 'za') return filtered.slice().sort((a, b) => b.name.localeCompare(a.name));
		if (sort === 'rating') {
			return filtered.slice().sort((a, b) => {
				const rA = globalRatings.get(a.slug);
				const rB = globalRatings.get(b.slug);
				const avgA = rA ? rA.avg : -1;
				const avgB = rB ? rB.avg : -1;
				if (avgB !== avgA) return avgB - avgA;
				// tiebreak: more votes = more trustworthy
				const cA = rA ? rA.count : 0;
				const cB = rB ? rB.count : 0;
				if (cB !== cA) return cB - cA;
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'random') {
			if (!randomSeed) {
				randomSeed = filtered.slice().sort(() => Math.random() - 0.5);
			} else {
				const seedSet = new Set(filtered.map(g => g.slug));
				randomSeed = randomSeed.filter(g => seedSet.has(g.slug));
				const have = new Set(randomSeed.map(g => g.slug));
				for (const g of filtered) if (!have.has(g.slug)) randomSeed.push(g);
			}
			return randomSeed;
		}
		return filtered.slice().sort((a, b) => (originalOrder.get(a.slug)! - originalOrder.get(b.slug)!));
	}

	// ---- DOM reconcile -------------------------------------------------------
	function render() {
		const visible = visibleGames();
		const visibleSlugs = new Set(visible.map(g => g.slug));

		// Materialize missing cards. New ones go into the DOM in document
		// fragments to keep layout/paint cost low.
		const newFrag = document.createDocumentFragment();
		for (const g of visible) {
			if (!nodes.has(g.slug)) {
				const node = createCard(g, favs);
				nodes.set(g.slug, node);
				newFrag.appendChild(node);
			}
		}
		if (newFrag.childNodes.length) grid.appendChild(newFrag);

		// Order visible nodes to match `visible`. Single fragment so the
		// browser only repaints once.
		const orderFrag = document.createDocumentFragment();
		for (const g of visible) {
			const node = nodes.get(g.slug)!;
			node.style.display = '';
			orderFrag.appendChild(node);
		}
		grid.appendChild(orderFrag);

		// Hide everything not in `visible`.
		for (const [slug, node] of nodes) {
			if (!visibleSlugs.has(slug)) node.style.display = 'none';
		}

		counter.textContent = `${visible.length.toLocaleString()} ${visible.length === 1 ? 'game' : 'games'}`;
		empty.hidden = visible.length > 0;
	}

	// Drop the legacy scroll sentinel — all cards now live in the DOM and
	// the browser handles long-list scroll natively. Lazy <img> attrs
	// already defer image bytes until each card scrolls into view.
	if (sentinel) sentinel.remove();

	// ---- Wire up handlers ----------------------------------------------------
	function syncSearchUi() {
		if (searchClear) searchClear.hidden = !searchInput?.value;
	}

	function clearSearch() {
		if (!searchInput) return;
		searchInput.value = '';
		query = '';
		if (sort === 'random') randomSeed = null;
		syncSearchUi();
		render();
		searchInput.focus();
	}

	// Search is cheap on 600 rows — no debounce, every keystroke runs.
	searchInput?.addEventListener('input', () => {
		query = searchInput.value;
		// Clear stable shuffle when the underlying filter changes.
		if (sort === 'random') randomSeed = null;
		syncSearchUi();
		render();
	});
	// Allow Escape inside the search field to clear quickly.
	searchInput?.addEventListener('keydown', e => {
		if (e.key === 'Escape' && searchInput.value) {
			e.stopPropagation();
			clearSearch();
		}
	});
	searchClear?.addEventListener('click', clearSearch);

	// Enter in the search field launches the first match — feels like a
	// "lucky" jump and saves the user from scanning the grid when they
	// know what they want.
	searchInput?.addEventListener('keydown', e => {
		if (e.key !== 'Enter') return;
		const first = visibleGames().find(g => !isBrokenStatus(g.status));
		if (first) {
			e.preventDefault();
			window.location.href = `/play/${first.slug}`;
		}
	});

	// Arrow-key navigation across the grid. Treats the grid as a 2D layout
	// (computed from offsetTop bands) so up/down skips a row, not a card.
	grid.addEventListener('keydown', e => {
		if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
		const focused = document.activeElement as HTMLElement | null;
		if (!focused || !focused.classList.contains('card')) return;
		const visible = [...grid.querySelectorAll<HTMLAnchorElement>('a.card')]
			.filter(c => c.style.display !== 'none');
		const idx = visible.indexOf(focused as HTMLAnchorElement);
		if (idx < 0) return;
		e.preventDefault();
		let next = focused as HTMLAnchorElement | null;
		if (e.key === 'ArrowLeft')  next = visible[idx - 1] ?? null;
		if (e.key === 'ArrowRight') next = visible[idx + 1] ?? null;
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			const dir = e.key === 'ArrowDown' ? 1 : -1;
			const row = focused.offsetTop;
			// Walk until we find the first card on a different row whose
			// horizontal position is closest to the current card's left.
			const targets = visible.filter(c => Math.sign(c.offsetTop - row) === dir);
			if (!targets.length) return;
			const myLeft = focused.offsetLeft;
			const closestRow = targets[0].offsetTop;
			next = targets
				.filter(c => c.offsetTop === closestRow)
				.reduce<HTMLAnchorElement | null>((best, c) =>
					!best || Math.abs(c.offsetLeft - myLeft) < Math.abs(best.offsetLeft - myLeft) ? c : best,
				null);
		}
		next?.focus();
	});

	typeButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			typeButtons.forEach(b => b.classList.remove('is-active'));
			btn.classList.add('is-active');
			typeFilter = (btn.dataset.type ?? 'all') as TypeFilter;
			if (sort === 'random') randomSeed = null;
			render();
		});
	});

	densityButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			densityButtons.forEach(b => b.classList.remove('is-active'));
			btn.classList.add('is-active');
			grid.dataset.density = btn.dataset.density ?? 'comfy';
		});
	});

	sortSelect?.addEventListener('change', () => {
		const next = (sortSelect.value as SortMode) || 'added';
		sort = next;
		randomSeed = null;
		render();
	});

	maintenanceToggle?.addEventListener('change', () => {
		showBroken = maintenanceToggle.checked;
		localStorage.setItem(SHOW_MAINTENANCE_KEY, showBroken ? '1' : '0');
		if (sort === 'random') randomSeed = null;
		render();
	});

	function pickSurprise(): void {
		// Surprise picks from the full filtered set, excluding broken games
		// even if the user has them toggled on (no one wants a broken
		// "random" pick).
		const pool = visibleGames().filter(g => !isBrokenStatus(g.status));
		if (!pool.length) return;
		const choice = pool[Math.floor(Math.random() * pool.length)];
		window.location.href = `/play/${choice.slug}`;
	}
	surpriseBtn?.addEventListener('click', pickSurprise);

	try {
		const params = new URLSearchParams(window.location.search);
		if (params.get('action') === 'surprise') {
			setTimeout(pickSurprise, 0);
		}
		// Deep-linkable search: /?q=... pre-fills the field on landing.
		const qParam = params.get('q');
		if (qParam && searchInput) {
			searchInput.value = qParam;
			query = qParam;
			syncSearchUi();
		}
	} catch (_) {}

	// `/` focuses search (unless the user is already typing somewhere).
	document.addEventListener('keydown', e => {
		const target = e.target as HTMLElement | null;
		if (e.key === '/' && target && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
			e.preventDefault();
			searchInput?.focus();
		}
	});

	// Favorites toggle — delegation handles cards rendered after init.
	document.addEventListener('click', e => {
		const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-fav-toggle]');
		if (!btn) return;
		e.preventDefault();
		e.stopPropagation();
		const slug = btn.dataset.favToggle!;
		const svg = btn.querySelector('svg');
		if (favs.has(slug)) {
			favs.delete(slug);
			btn.classList.remove('is-active');
			if (svg) svg.setAttribute('fill', 'none');
		} else {
			favs.add(slug);
			btn.classList.add('is-active');
			if (svg) svg.setAttribute('fill', 'currentColor');
		}
		try { localStorage.setItem(FAVS_KEY, JSON.stringify([...favs])); } catch (_) {}
	});

	// Initial render — captures the URL-driven `?q=` if present.
	render();

	// Fetch global ratings after first paint so the page feels instant.
	// When sort=rating is selected, this will auto-trigger a re-render.
	setTimeout(fetchAndApplyRatings, 500);

	// Re-render when JeoRatings (ratings.js) delivers fresh global data.
	window.addEventListener('jeo:ratingsUpdated', (e: Event) => {
		const detail = (e as CustomEvent<{ global: Record<string, { avg: number; count: number }> }>).detail;
		if (detail?.global) applyGlobalRatings(detail.global);
	});
}

export {};
