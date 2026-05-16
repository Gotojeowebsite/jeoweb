/**
 * Records a "recent" entry whenever a game launches via /play/<slug>/.
 * Read by ContinueBand and (later) the Recents rail.
 * Lives in localStorage as 'jeo-recent' — bounded to 20 entries.
 */
type Recent = { slug: string; name: string; image: string | null; lastPlayed: number };

function readMeta(): Recent | null {
	const el = document.querySelector<HTMLElement>('[data-jeo-game]');
	if (!el) return null;
	const slug = el.dataset.slug;
	const name = el.dataset.name;
	const image = el.dataset.image;
	if (!slug || !name) return null;
	return { slug, name, image: image || null, lastPlayed: Date.now() };
}

const entry = readMeta();
if (entry) {
	try {
		const raw = localStorage.getItem('jeo-recent');
		const list = (raw ? JSON.parse(raw) : []) as Recent[];
		const filtered = list.filter(r => r.slug !== entry.slug);
		filtered.unshift(entry);
		localStorage.setItem('jeo-recent', JSON.stringify(filtered.slice(0, 20)));
	} catch (_) {}
}
export {};
