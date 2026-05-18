/** @jsxImportSource preact */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { EMPTY_SEARCH, pickRandom } from '../lib/voice';

// Tiny serialized shape the host passes via data-games. Mirrors what the
// catalog loader exports but trimmed for transport. We keep `tags` for the
// fuzzy-match weight.
export type PaletteGame = {
	slug: string;
	name: string;
	type: 'webgl' | 'flash' | 'retro';
	tags: string[];
	status?: 'broken' | 'maintenance' | 'unverified' | 'probable_broken' | 'healthy';
};

interface PaletteProps {
	games: PaletteGame[];
}

type Command = {
	id: string;
	title: string;
	keywords: string;
	glyph: string;
	run: () => void;
};

const FAVS_KEY = 'jeo-favs';
const RECENT_KEY = 'jeoweb-recently-played';
const MAX_RESULTS = 12;

// Token-set + substring score. Fast enough for 600 games on keypress.
// Pure function so the memoization is stable.
function score(query: string, game: PaletteGame): number {
	if (!query) return 0;
	const q = query.toLowerCase();
	const name = game.name.toLowerCase();
	const slug = game.slug.toLowerCase();
	let s = 0;
	// Exact-prefix wins decisively.
	if (name.startsWith(q) || slug.startsWith(q)) s += 100;
	// Substring in name / slug.
	if (name.includes(q)) s += 40;
	if (slug.includes(q)) s += 25;
	// Each query token that matches a tag adds a smaller bonus.
	const qTokens = q.split(/\s+/).filter(Boolean);
	for (const t of game.tags || []) {
		const tl = t.toLowerCase();
		for (const qt of qTokens) if (tl.includes(qt)) s += 8;
	}
	// Per-token AND for multi-word queries (each token must hit somewhere).
	for (const qt of qTokens) {
		if (!(name.includes(qt) || slug.includes(qt) || (game.tags || []).some((t) => t.toLowerCase().includes(qt)))) {
			return 0;  // any unmatched query token disqualifies
		}
	}
	return s;
}

function readLocalSet(key: string): Set<string> {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return new Set();
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return new Set(parsed.map(String));
		// Some legacy formats stored objects; pull out the slugs.
		if (parsed && typeof parsed === 'object') return new Set(Object.keys(parsed));
	} catch { /* ignore */ }
	return new Set();
}

function typeBadgeColor(t: PaletteGame['type']): string {
	if (t === 'flash') return 'var(--semantic-flash)';
	if (t === 'retro') return 'var(--semantic-retro)';
	return 'var(--semantic-webgl)';
}

function commandsFor(games: PaletteGame[], setOpen: (v: boolean) => void): Command[] {
	const go = (href: string) => () => { setOpen(false); window.location.href = href; };
	const playable = games.filter(g => g.status !== 'broken' && g.status !== 'maintenance');
	const pickRandomGame = (pool: PaletteGame[]) => {
		const p = pool[Math.floor(Math.random() * pool.length)];
		if (p) { setOpen(false); window.location.href = `/play/${p.slug}`; }
	};
	return [
		{ id: 'home',     title: 'Go home',            keywords: 'home main start',                   glyph: '⌂', run: go('/') },
		{ id: 'random',   title: 'Surprise me',        keywords: 'random surprise pick play',         glyph: '🎲', run: () => pickRandomGame(playable) },
		{ id: 'rand-flash', title: 'Play random Flash', keywords: 'random flash ruffle classic',     glyph: '⚡', run: () => pickRandomGame(playable.filter(g => g.type === 'flash')) },
		{ id: 'rand-retro', title: 'Play random Retro', keywords: 'random retro snes gba nes emu',   glyph: '🎮', run: () => pickRandomGame(playable.filter(g => g.type === 'retro')) },
		{ id: 'flash',    title: 'Browse Flash',       keywords: 'flash ruffle browse',               glyph: '⚡', run: go('/flash') },
		{ id: 'retro',    title: 'Browse Retro',       keywords: 'retro emulator browse snes gba',    glyph: '🎮', run: go('/retro') },
		{ id: 'new',      title: 'Newly added',        keywords: 'new latest recent fresh',           glyph: '✨', run: go('/new') },
		{ id: 'requested',title: 'Community requests', keywords: 'requested community ask',           glyph: '✉', run: go('/requested') },
		{ id: 'profile',  title: 'My profile',         keywords: 'profile me stats',                  glyph: '◉', run: go('/profile') },
		{ id: 'settings', title: 'Open settings',      keywords: 'settings preferences',              glyph: '⚙', run: go('/settings') },
		{
			id: 'theme',
			title: 'Toggle theme',
			keywords: 'theme dark light mode color',
			glyph: '◐',
			run: () => {
				const cur = document.documentElement.getAttribute('data-theme') ?? 'dark';
				const next = cur === 'dark' ? 'light' : 'dark';
				document.documentElement.setAttribute('data-theme', next);
				try { localStorage.setItem('jeo-theme', next); } catch (_) {}
				setOpen(false);
			},
		},
		{
			id: 'maintenance',
			title: 'Toggle "Show maintenance" games',
			keywords: 'maintenance broken hidden show toggle',
			glyph: '🛠',
			run: () => {
				const cur = localStorage.getItem('jeo-show-maintenance') === '1';
				try { localStorage.setItem('jeo-show-maintenance', cur ? '0' : '1'); } catch (_) {}
				setOpen(false);
				window.location.reload();
			},
		},
		{ id: 'feed',     title: 'RSS / Atom feed',    keywords: 'rss atom feed subscribe',           glyph: '📡', run: go('/feed.xml') },
		{ id: 'status',   title: 'Catalog status',     keywords: 'status health verified broken',     glyph: '◉', run: go('/status') },
		{ id: 'report',
		  title: 'Report a broken game',
		  keywords: 'report broken bug issue feedback',
		  glyph: '⚠',
		  run: () => { setOpen(false); window.open('https://github.com/Gotojeowebsite/jeoweb/issues/new?labels=broken-game', '_blank', 'noopener'); },
		},
	];
}

function scoreCommand(query: string, c: Command): number {
	if (!query) return 0;
	const q = query.toLowerCase();
	const t = c.title.toLowerCase();
	const k = c.keywords.toLowerCase();
	let s = 0;
	if (t.startsWith(q)) s += 120;
	if (t.includes(q))   s += 50;
	if (k.includes(q))   s += 30;
	return s;
}

export default function CommandPalette({ games }: PaletteProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [highlight, setHighlight] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const commands = useMemo(() => commandsFor(games, setOpen), [games]);

	// Persisted state read once on first open so the dialog feels instant.
	const [favs, setFavs] = useState<Set<string>>(() => new Set());
	const [recent, setRecent] = useState<string[]>([]);
	useEffect(() => {
		if (!open) return;
		setFavs(readLocalSet(FAVS_KEY));
		try {
			const raw = localStorage.getItem(RECENT_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				const slugs = Array.isArray(parsed)
					? parsed.map((p) => (typeof p === 'string' ? p : p?.slug)).filter(Boolean)
					: [];
				setRecent(slugs as string[]);
			}
		} catch { /* ignore */ }
	}, [open]);

	// Index games by slug once for O(1) lookups in the "pinned" sections.
	const bySlug = useMemo(() => {
		const m = new Map<string, PaletteGame>();
		for (const g of games) m.set(g.slug, g);
		return m;
	}, [games]);

	// Hotkey: Cmd/Ctrl+K toggles. Esc closes. / opens unless already typing.
	useEffect(() => {
		function onKeydown(e: KeyboardEvent) {
			const cmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
			if (cmdK) {
				e.preventDefault();
				setOpen((v) => !v);
				return;
			}
			if (e.key === 'Escape' && open) {
				e.preventDefault();
				setOpen(false);
				return;
			}
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	}, [open]);

	// Focus trap: when the palette is open, Tab / Shift-Tab is captured and
	// focus stays on the input. Arrow keys drive list navigation, so Tab
	// would otherwise leak focus out to the page chrome behind the modal.
	// Also restore focus to the element that opened the palette when we
	// close (the "restore focus" half of WAI-ARIA dialog guidance).
	const previousFocusRef = useRef<HTMLElement | null>(null);
	useEffect(() => {
		if (open) {
			previousFocusRef.current = document.activeElement as HTMLElement | null;
			setQuery('');
			setHighlight(0);
			// Defer one tick so the input is mounted.
			window.setTimeout(() => inputRef.current?.focus(), 0);
			document.body.style.overflow = 'hidden';
			window.dispatchEvent(new CustomEvent('jeo:cmdk-open'));
		} else {
			document.body.style.overflow = '';
			previousFocusRef.current?.focus?.();
		}
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onTab = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			e.preventDefault();
			inputRef.current?.focus();
		};
		document.addEventListener('keydown', onTab, true);
		return () => document.removeEventListener('keydown', onTab, true);
	}, [open]);

	type Item = { kind: 'game'; game: PaletteGame } | { kind: 'cmd'; cmd: Command };

	// Pinned section: favorites (filtered to those still in the catalog) +
	// recently-played minus dupes. Shown only when the query is empty.
	const pinned = useMemo<PaletteGame[]>(() => {
		if (query) return [];
		const seen = new Set<string>();
		const out: PaletteGame[] = [];
		for (const slug of recent) {
			if (out.length >= 6) break;
			const g = bySlug.get(slug);
			if (g && !seen.has(slug)) { out.push(g); seen.add(slug); }
		}
		for (const slug of favs) {
			if (out.length >= MAX_RESULTS) break;
			const g = bySlug.get(slug);
			if (g && !seen.has(slug)) { out.push(g); seen.add(slug); }
		}
		return out;
	}, [query, recent, favs, bySlug]);

	const cmdMatches = useMemo<Command[]>(() => {
		if (!query) {
			// Empty query: show a small pinned set of always-useful commands.
			return commands.filter(c => ['random', 'theme', 'settings'].includes(c.id));
		}
		const scored: Array<[number, Command]> = [];
		for (const c of commands) {
			const s = scoreCommand(query, c);
			if (s > 0) scored.push([s, c]);
		}
		scored.sort((a, b) => b[0] - a[0]);
		return scored.slice(0, 5).map(([, c]) => c);
	}, [query, commands]);

	// Search results for games: ranked + truncated. Empty-query falls back
	// to pinned (recents + favs).
	const gameResults = useMemo<PaletteGame[]>(() => {
		if (!query) return pinned;
		const scored: Array<[number, PaletteGame]> = [];
		for (const g of games) {
			const s = score(query, g);
			if (s > 0) scored.push([s, g]);
		}
		scored.sort((a, b) => b[0] - a[0]);
		return scored.slice(0, MAX_RESULTS).map(([, g]) => g);
	}, [query, games, pinned]);

	// Flat list — commands first, then games — for arrow-key navigation.
	const items = useMemo<Item[]>(() => {
		return [
			...cmdMatches.map<Item>(cmd => ({ kind: 'cmd', cmd })),
			...gameResults.map<Item>(game => ({ kind: 'game', game })),
		];
	}, [cmdMatches, gameResults]);

	const navigate = (slug: string) => {
		setOpen(false);
		window.location.href = `/play/${slug}`;
	};

	const activate = (item: Item) => {
		if (item.kind === 'cmd') item.cmd.run();
		else navigate(item.game.slug);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlight((h) => Math.min(h + 1, items.length - 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlight((h) => Math.max(h - 1, 0));
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const pick = items[highlight];
			if (pick) activate(pick);
		}
	};

	if (!open) return null;

	const sectionLabel = query
		? `${items.length} result${items.length === 1 ? '' : 's'}`
		: (pinned.length ? 'Jump back in' : 'Type to search — or pick a command');

	return (
		<div class="jeo-cmdk-backdrop" onClick={() => setOpen(false)}>
			<div class="jeo-cmdk" role="dialog" aria-modal="true" aria-label="Search games and commands" onClick={(e) => e.stopPropagation()}>
				<div class="jeo-cmdk__input">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/>
						<line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
					<input
						ref={inputRef}
						type="text"
						placeholder="Search games, tags, or commands…"
						value={query}
						onInput={(e: any) => { setQuery(e.currentTarget.value); setHighlight(0); }}
						onKeyDown={onKeyDown}
						aria-autocomplete="list"
						aria-controls="jeo-cmdk-list"
					/>
					<kbd>Esc</kbd>
				</div>
				<div class="jeo-cmdk__section-label">{sectionLabel}</div>
				<ul id="jeo-cmdk-list" class="jeo-cmdk__list" role="listbox">
					{items.length === 0 && (
						<li class="jeo-cmdk__empty">{pickRandom(EMPTY_SEARCH)}</li>
					)}
					{items.map((it, i) => it.kind === 'cmd' ? (
						<li
							role="option"
							aria-selected={i === highlight}
							class={`jeo-cmdk__item jeo-cmdk__item--cmd${i === highlight ? ' is-active' : ''}`}
							onMouseMove={() => setHighlight(i)}
							onClick={() => activate(it)}
						>
							<span class="jeo-cmdk__type" aria-hidden="true">{it.cmd.glyph}</span>
							<span class="jeo-cmdk__name">{it.cmd.title}</span>
							<span class="jeo-cmdk__tag">command</span>
							<span class="jeo-cmdk__enter" aria-hidden="true">↵</span>
						</li>
					) : (
						<li
							role="option"
							aria-selected={i === highlight}
							class={`jeo-cmdk__item${i === highlight ? ' is-active' : ''}`}
							onMouseMove={() => setHighlight(i)}
							onClick={() => activate(it)}
						>
							<span class="jeo-cmdk__type" style={`color:${typeBadgeColor(it.game.type)}`} aria-hidden="true">
								{it.game.type === 'flash' ? '⚡' : it.game.type === 'retro' ? '🎮' : '◆'}
							</span>
							<span class="jeo-cmdk__name">{it.game.name}</span>
							{it.game.status === 'broken' && <span class="jeo-cmdk__tag jeo-cmdk__tag--broken">broken</span>}
							{it.game.status === 'maintenance' && <span class="jeo-cmdk__tag jeo-cmdk__tag--warn">maintenance</span>}
							{it.game.status === 'probable_broken' && <span class="jeo-cmdk__tag jeo-cmdk__tag--warn">probable broken</span>}
							{favs.has(it.game.slug) && <span class="jeo-cmdk__tag" title="Favorite">♥</span>}
							<span class="jeo-cmdk__enter" aria-hidden="true">↵</span>
						</li>
					))}
				</ul>
				<div class="jeo-cmdk__hint">
					<kbd>↑↓</kbd> navigate · <kbd>↵</kbd> open · <kbd>⌘K</kbd> toggle
				</div>
			</div>
		</div>
	);
}
