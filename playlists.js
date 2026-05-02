/* Jeoweb Playlists — local-only named collections of games. */
(function () {
	if (window.JeoPlaylists) return;

	const KEY = 'jeo:playlists';
	const listeners = new Set();

	function load() {
		try {
			const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
			return Array.isArray(raw) ? raw.filter(p => p && p.id && Array.isArray(p.slugs)) : [];
		} catch { return []; }
	}
	function save(list) {
		try { localStorage.setItem(KEY, JSON.stringify(list)); }
		catch (e) { console.warn('playlists save failed', e); }
		listeners.forEach(fn => { try { fn(list); } catch (err) { console.error(err); } });
	}
	function genId() {
		return 'pl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
	}
	function normName(name) {
		return String(name || '').trim().slice(0, 60);
	}

	function list() { return load(); }
	function get(id) { return load().find(p => p.id === id) || null; }

	function create(name) {
		const trimmed = normName(name);
		if (!trimmed) return null;
		const all = load();
		// Disallow duplicate names (case-insensitive)
		if (all.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
			return all.find(p => p.name.toLowerCase() === trimmed.toLowerCase()) || null;
		}
		const playlist = { id: genId(), name: trimmed, slugs: [], createdAt: Date.now() };
		all.push(playlist);
		save(all);
		return playlist;
	}

	function rename(id, newName) {
		const all = load();
		const p = all.find(x => x.id === id);
		if (!p) return false;
		const trimmed = normName(newName);
		if (!trimmed) return false;
		p.name = trimmed;
		save(all);
		return true;
	}

	function remove(id) {
		const all = load().filter(p => p.id !== id);
		save(all);
	}

	function addGame(id, slug) {
		if (!slug) return false;
		const all = load();
		const p = all.find(x => x.id === id);
		if (!p) return false;
		if (p.slugs.includes(slug)) return false;
		p.slugs.push(slug);
		save(all);
		return true;
	}

	function removeGame(id, slug) {
		const all = load();
		const p = all.find(x => x.id === id);
		if (!p) return false;
		const before = p.slugs.length;
		p.slugs = p.slugs.filter(s => s !== slug);
		if (p.slugs.length === before) return false;
		save(all);
		return true;
	}

	function containsGame(id, slug) {
		const p = get(id);
		return !!(p && p.slugs.includes(slug));
	}

	function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

	window.JeoPlaylists = {
		list, get, create, rename, remove,
		addGame, removeGame, containsGame, onChange,
	};
})();
