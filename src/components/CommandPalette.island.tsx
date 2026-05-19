/** @jsxImportSource preact */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { EMPTY_SEARCH, pickRandom } from '../lib/voice';

// Tiny serialized shape the host passes via data-games. Mirrors what the
// catalog loader exports but trimmed for transport. We keep `tags` for the
// fuzzy-match weight.
export type PaletteGame = {
	slug: string;
	name: string;
	displayName?: string;
	pitch?: string;
	type: 'webgl' | 'flash' | 'retro';
	tags: string[];
	status?: 'broken' | 'maintenance' | 'unverified' | 'probable_broken' | 'healthy';
};

interface PaletteProps {
	games: PaletteGame[];
}

const FAVS_KEY = 'jeo-favs';
const RECENT_KEY = 'jeoweb-recently-played';
const MAX_RESULTS = 12;

// Token-set + substring score. Fast enough for 600 games on keypress.
// Pure function so the memoization is stable.
function score(query: string, game: PaletteGame): number {
	if (!query) return 0;
	const q = query.toLowerCase();
	const name = game.name.toLowerCase();
	const display = (game.displayName ?? game.name).toLowerCase();
	const slug = game.slug.toLowerCase();
	const pitch = (game.pitch ?? '').toLowerCase();
	let s = 0;
	// Exact-prefix wins decisively — match against the display name first
	// so users typing "world" find "Where in the World Is Carmen Sandiego".
	if (display.startsWith(q) || name.startsWith(q) || slug.startsWith(q)) s += 100;
	// Substring in name / slug / display name.
	if (display.includes(q)) s += 50;
	if (name.includes(q)) s += 40;
	if (slug.includes(q)) s += 25;
	// Description match — lower weight so descriptions don't outrank a
	// title hit. Catches "puzzle" → all puzzle games when a tag doesn't.
	if (pitch.includes(q)) s += 15;
	// Each query token that matches a tag adds a smaller bonus.
	const qTokens = q.split(/\s+/).filter(Boolean);
	for (const t of game.tags || []) {
		const tl = t.toLowerCase();
		for (const qt of qTokens) if (tl.includes(qt)) s += 8;
	}
	// Per-token AND for multi-word queries (each token must hit somewhere).
	for (const qt of qTokens) {
		if (!(
			name.includes(qt) ||
			display.includes(qt) ||
			slug.includes(qt) ||
			pitch.includes(qt) ||
			(game.tags || []).some((t) => t.toLowerCase().includes(qt))
		)) {
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

export default function CommandPalette({ games }: PaletteProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [highlight, setHighlight] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		if (open) {
			setQuery('');
			setHighlight(0);
			// Defer one tick so the input is mounted.
			window.setTimeout(() => inputRef.current?.focus(), 0);
			document.body.style.overflow = 'hidden';
			window.dispatchEvent(new CustomEvent('jeo:cmdk-open'));
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [open]);

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

	// Search results: ranked + truncated. Excluded when query is empty
	// (pinned takes over).
	const results = useMemo<PaletteGame[]>(() => {
		if (!query) return pinned;
		const scored: Array<[number, PaletteGame]> = [];
		for (const g of games) {
			const s = score(query, g);
			if (s > 0) scored.push([s, g]);
		}
		scored.sort((a, b) => b[0] - a[0]);
		return scored.slice(0, MAX_RESULTS).map(([, g]) => g);
	}, [query, games, pinned]);

	const navigate = (slug: string) => {
		setOpen(false);
		window.location.href = `/play/${slug}`;
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlight((h) => Math.min(h + 1, results.length - 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlight((h) => Math.max(h - 1, 0));
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const pick = results[highlight];
			if (pick) navigate(pick.slug);
		}
	};

	if (!open) return null;

	const sectionLabel = query ? `${results.length} result${results.length === 1 ? '' : 's'}` : (pinned.length ? 'Jump back in' : 'Type to search');

	return (
		<div class="jeo-cmdk-backdrop" onClick={() => setOpen(false)}>
			<div class="jeo-cmdk" role="dialog" aria-modal="true" aria-label="Search games" onClick={(e) => e.stopPropagation()}>
				<div class="jeo-cmdk__input">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/>
						<line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
					<input
						ref={inputRef}
						type="text"
						placeholder="Search games, tags, slugs…"
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
					{results.length === 0 && (
						<li class="jeo-cmdk__empty">{pickRandom(EMPTY_SEARCH)}</li>
					)}
					{results.map((g, i) => (
						<li
							role="option"
							aria-selected={i === highlight}
							class={`jeo-cmdk__item${i === highlight ? ' is-active' : ''}`}
							onMouseMove={() => setHighlight(i)}
							onClick={() => navigate(g.slug)}
						>
							<span class="jeo-cmdk__type" style={`color:${typeBadgeColor(g.type)}`} aria-hidden="true">
								{g.type === 'flash' ? '⚡' : g.type === 'retro' ? '🎮' : '◆'}
							</span>
							<span class="jeo-cmdk__name">{g.displayName ?? g.name}</span>
							{g.status === 'broken' && <span class="jeo-cmdk__tag jeo-cmdk__tag--broken">broken</span>}
							{g.status === 'maintenance' && <span class="jeo-cmdk__tag jeo-cmdk__tag--warn">maintenance</span>}
							{g.status === 'probable_broken' && <span class="jeo-cmdk__tag jeo-cmdk__tag--warn">probable broken</span>}
							{favs.has(g.slug) && <span class="jeo-cmdk__tag" title="Favorite">♥</span>}
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
