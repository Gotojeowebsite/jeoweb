/**
 * Records a "recent" entry whenever a game launches via /play/<slug>/.
 * Also hooks the achievement + streak engines: marking today, evaluating
 * unlocks, recording the per-type counter.
 *
 * Read by ContinueBand, StickyResume, profile, and the Cmd-K palette.
 */
import { recordPlayStart } from '../lib/achievements';
import { markToday } from '../lib/streaks';

type Recent = { slug: string; name: string; image: string | null; lastPlayed: number };

function readMeta() {
	const el = document.querySelector<HTMLElement>('[data-jeo-game]');
	if (!el) return null;
	const slug = el.dataset.slug;
	const name = el.dataset.name;
	const image = el.dataset.image;
	const type = (el.dataset.type || 'webgl') as 'webgl' | 'flash' | 'retro';
	const tags = (el.dataset.tags || '').split('|').filter(Boolean);
	if (!slug || !name) return null;
	return { slug, name, image: image || null, type, tags, lastPlayed: Date.now() } as Recent & { type: 'webgl'|'flash'|'retro'; tags: string[] };
}

const entry = readMeta();
if (entry) {
	try {
		const raw = localStorage.getItem('jeo-recent');
		const list = (raw ? JSON.parse(raw) : []) as Recent[];
		const filtered = list.filter(r => r.slug !== entry.slug);
		filtered.unshift({ slug: entry.slug, name: entry.name, image: entry.image, lastPlayed: entry.lastPlayed });
		localStorage.setItem('jeo-recent', JSON.stringify(filtered.slice(0, 20)));
	} catch (_) {}
	try { markToday(); } catch (_) {}
	try { recordPlayStart({ slug: entry.slug, name: entry.name, type: entry.type, tags: entry.tags }); } catch (_) {}
}
export {};
