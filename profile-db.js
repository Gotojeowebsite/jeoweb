/* Jeoweb Profile DB — IndexedDB user profile system.
 * Stores preferences, custom avatars, favorited games across sessions.
 * Falls back to localStorage if IndexedDB isn't available.
 * Exposes: window.JeoProfileDB */
(function () {
	'use strict';
	if (window.JeoProfileDB) return;

	const DB_NAME = 'jeo-profile';
	const DB_VERSION = 1;
	const STORES = {
		profile: 'profile',     // key-value: { key, value }
		favorites: 'favorites', // { slug, addedAt }
		history: 'history',     // { slug, lastPlayed, totalTime, playCount }
		saves: 'saves',         // { id, slug, data, label, createdAt }
		avatars: 'avatars',     // { id, dataUrl, name }
	};

	let db = null;
	let ready = false;
	const readyQueue = [];

	function init() {
		return new Promise((resolve, reject) => {
			if (!window.indexedDB) {
				console.warn('[JeoProfileDB] IndexedDB not available, using localStorage fallback');
				ready = true;
				resolve(null);
				return;
			}

			const req = indexedDB.open(DB_NAME, DB_VERSION);

			req.onupgradeneeded = (e) => {
				const d = e.target.result;

				if (!d.objectStoreNames.contains(STORES.profile)) {
					d.createObjectStore(STORES.profile, { keyPath: 'key' });
				}
				if (!d.objectStoreNames.contains(STORES.favorites)) {
					const fav = d.createObjectStore(STORES.favorites, { keyPath: 'slug' });
					fav.createIndex('addedAt', 'addedAt');
				}
				if (!d.objectStoreNames.contains(STORES.history)) {
					const hist = d.createObjectStore(STORES.history, { keyPath: 'slug' });
					hist.createIndex('lastPlayed', 'lastPlayed');
					hist.createIndex('playCount', 'playCount');
				}
				if (!d.objectStoreNames.contains(STORES.saves)) {
					const saves = d.createObjectStore(STORES.saves, { keyPath: 'id', autoIncrement: true });
					saves.createIndex('slug', 'slug');
					saves.createIndex('createdAt', 'createdAt');
				}
				if (!d.objectStoreNames.contains(STORES.avatars)) {
					d.createObjectStore(STORES.avatars, { keyPath: 'id', autoIncrement: true });
				}
			};

			req.onsuccess = (e) => {
				db = e.target.result;
				ready = true;
				readyQueue.forEach(fn => fn());
				readyQueue.length = 0;
				resolve(db);
			};

			req.onerror = (e) => {
				console.error('[JeoProfileDB] Failed to open DB:', e.target.error);
				ready = true;
				resolve(null);
			};
		});
	}

	function whenReady(fn) {
		if (ready) return fn();
		readyQueue.push(fn);
	}

	/* ─── Generic Store Helpers ─── */

	function tx(storeName, mode) {
		if (!db) return null;
		try {
			return db.transaction(storeName, mode).objectStore(storeName);
		} catch (e) {
			console.error('[JeoProfileDB] TX error:', e);
			return null;
		}
	}

	function put(storeName, data) {
		return new Promise((resolve, reject) => {
			const store = tx(storeName, 'readwrite');
			if (!store) { resolve(false); return; }
			const req = store.put(data);
			req.onsuccess = () => resolve(true);
			req.onerror = () => reject(req.error);
		});
	}

	function get(storeName, key) {
		return new Promise((resolve, reject) => {
			const store = tx(storeName, 'readonly');
			if (!store) { resolve(null); return; }
			const req = store.get(key);
			req.onsuccess = () => resolve(req.result || null);
			req.onerror = () => reject(req.error);
		});
	}

	function del(storeName, key) {
		return new Promise((resolve, reject) => {
			const store = tx(storeName, 'readwrite');
			if (!store) { resolve(false); return; }
			const req = store.delete(key);
			req.onsuccess = () => resolve(true);
			req.onerror = () => reject(req.error);
		});
	}

	function getAll(storeName) {
		return new Promise((resolve, reject) => {
			const store = tx(storeName, 'readonly');
			if (!store) { resolve([]); return; }
			const req = store.getAll();
			req.onsuccess = () => resolve(req.result || []);
			req.onerror = () => reject(req.error);
		});
	}

	function count(storeName) {
		return new Promise((resolve, reject) => {
			const store = tx(storeName, 'readonly');
			if (!store) { resolve(0); return; }
			const req = store.count();
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
	}

	/* ─── Profile Methods ─── */

	async function setPref(key, value) {
		if (!db) { try { localStorage.setItem('jeo-pdb-' + key, JSON.stringify(value)); } catch {} return; }
		await put(STORES.profile, { key, value });
	}

	async function getPref(key, fallback) {
		if (!db) { try { const v = localStorage.getItem('jeo-pdb-' + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
		const r = await get(STORES.profile, key);
		return r ? r.value : fallback;
	}

	/* ─── Favorites ─── */

	async function addFavorite(slug) {
		await put(STORES.favorites, { slug, addedAt: Date.now() });
	}

	async function removeFavorite(slug) {
		await del(STORES.favorites, slug);
	}

	async function isFavorite(slug) {
		const r = await get(STORES.favorites, slug);
		return !!r;
	}

	async function getAllFavorites() {
		return getAll(STORES.favorites);
	}

	/* ─── Play History ─── */

	async function recordPlay(slug, duration) {
		const existing = await get(STORES.history, slug) || { slug, lastPlayed: 0, totalTime: 0, playCount: 0 };
		existing.lastPlayed = Date.now();
		existing.totalTime += (duration || 0);
		existing.playCount += 1;
		await put(STORES.history, existing);
	}

	async function getPlayHistory(limit) {
		const all = await getAll(STORES.history);
		all.sort((a, b) => b.lastPlayed - a.lastPlayed);
		return limit ? all.slice(0, limit) : all;
	}

	/* ─── Saves ─── */

	async function saveGameState(slug, data, label) {
		await put(STORES.saves, {
			slug,
			data,
			label: label || 'Auto-save',
			createdAt: Date.now()
		});
	}

	async function getGameSaves(slug) {
		const all = await getAll(STORES.saves);
		return all.filter(s => s.slug === slug).sort((a, b) => b.createdAt - a.createdAt);
	}

	async function deleteSave(id) {
		await del(STORES.saves, id);
	}

	/* ─── Avatars ─── */

	async function saveAvatar(dataUrl, name) {
		await put(STORES.avatars, { dataUrl, name: name || 'Custom Avatar', createdAt: Date.now() });
	}

	async function getAvatars() {
		return getAll(STORES.avatars);
	}

	/* ─── Export / Import ─── */

	async function exportProfile() {
		const data = {
			version: 1,
			exported: Date.now(),
			profile: await getAll(STORES.profile),
			favorites: await getAll(STORES.favorites),
			history: await getAll(STORES.history),
			avatars: await getAll(STORES.avatars),
		};
		return JSON.stringify(data, null, 2);
	}

	async function importProfile(jsonString) {
		try {
			const data = JSON.parse(jsonString);
			if (data.version !== 1) throw new Error('Unknown profile version');

			for (const item of (data.profile || [])) await put(STORES.profile, item);
			for (const item of (data.favorites || [])) await put(STORES.favorites, item);
			for (const item of (data.history || [])) await put(STORES.history, item);
			for (const item of (data.avatars || [])) await put(STORES.avatars, item);

			return { success: true, imported: { profile: data.profile?.length || 0, favorites: data.favorites?.length || 0, history: data.history?.length || 0 } };
		} catch (e) {
			return { success: false, error: e.message };
		}
	}

	/* ─── Stats ─── */

	async function getStats() {
		const history = await getAll(STORES.history);
		const favorites = await count(STORES.favorites);
		const saves = await count(STORES.saves);
		const totalPlayTime = history.reduce((sum, h) => sum + (h.totalTime || 0), 0);
		const totalPlays = history.reduce((sum, h) => sum + (h.playCount || 0), 0);
		const mostPlayed = history.sort((a, b) => b.playCount - a.playCount).slice(0, 5);

		return {
			gamesPlayed: history.length,
			totalPlays,
			totalPlayTime,
			favoriteCount: favorites,
			saveCount: saves,
			mostPlayed: mostPlayed.map(h => ({ slug: h.slug, plays: h.playCount, time: h.totalTime })),
		};
	}

	/* ─── Initialize ─── */
	const initPromise = init();

	window.JeoProfileDB = {
		ready: initPromise,
		setPref,
		getPref,
		addFavorite,
		removeFavorite,
		isFavorite,
		getAllFavorites,
		recordPlay,
		getPlayHistory,
		saveGameState,
		getGameSaves,
		deleteSave,
		saveAvatar,
		getAvatars,
		exportProfile,
		importProfile,
		getStats,
	};
})();
