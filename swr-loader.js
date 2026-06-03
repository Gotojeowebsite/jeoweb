/* Jeoweb SWR Loader — Stale-While-Revalidate catalog loader.
 * Loads game catalog instantly from localStorage cache, then
 * fetches fresh data from network in the background.
 * Exposes: window.JeoSWR */
(function () {
	'use strict';
	if (window.JeoSWR) return;

	const CACHE_KEY = 'jeo-catalog-cache';
	const CACHE_META_KEY = 'jeo-catalog-meta';
	const MAX_AGE_MS = 30 * 60 * 1000; // 30 min — revalidate after this

	/* ─── Cache helpers ─── */

	function getFromCache() {
		try {
			const data = localStorage.getItem(CACHE_KEY);
			const meta = JSON.parse(localStorage.getItem(CACHE_META_KEY) || '{}');
			if (!data) return null;
			return {
				games: JSON.parse(data),
				cachedAt: meta.cachedAt || 0,
				etag: meta.etag || '',
				isStale: Date.now() - (meta.cachedAt || 0) > MAX_AGE_MS,
			};
		} catch {
			return null;
		}
	}

	function saveToCache(games, etag) {
		try {
			localStorage.setItem(CACHE_KEY, JSON.stringify(games));
			localStorage.setItem(CACHE_META_KEY, JSON.stringify({
				cachedAt: Date.now(),
				etag: etag || '',
				count: games.length,
			}));
		} catch (e) {
			// localStorage may be full — try to clear old data
			console.warn('[JeoSWR] Cache write failed:', e.message);
			try {
				localStorage.removeItem(CACHE_KEY);
				localStorage.removeItem(CACHE_META_KEY);
			} catch {}
		}
	}

	/* ─── Network fetch ─── */

	async function fetchCatalog(url, cachedEtag) {
		const headers = {};
		if (cachedEtag) {
			headers['If-None-Match'] = cachedEtag;
		}

		try {
			const resp = await fetch(url, {
				headers,
				cache: 'no-cache', // bypass browser HTTP cache so we use our own
			});

			if (resp.status === 304) {
				// Not modified — cache is still good
				return { games: null, notModified: true, etag: cachedEtag };
			}

			if (!resp.ok) {
				throw new Error(`HTTP ${resp.status}`);
			}

			const games = await resp.json();
			const etag = resp.headers.get('ETag') || '';
			return { games, notModified: false, etag };
		} catch (e) {
			console.warn('[JeoSWR] Network fetch failed:', e.message);
			return { games: null, notModified: false, error: e.message };
		}
	}

	/* ─── Main SWR Logic ─── */

	async function loadCatalog(url, onStaleData, onFreshData) {
		url = url || '/games_catalog.json';

		// Step 1: Serve from cache immediately
		const cached = getFromCache();
		if (cached && cached.games) {
			console.log(`[JeoSWR] Serving ${cached.games.length} games from cache (age: ${Math.round((Date.now() - cached.cachedAt) / 1000)}s)`);
			if (onStaleData) onStaleData(cached.games, cached.isStale);
		}

		// Step 2: Always revalidate in background
		const result = await fetchCatalog(url, cached?.etag);

		if (result.notModified) {
			console.log('[JeoSWR] Cache validated — data unchanged');
			// Update timestamp so it doesn't keep re-validating
			if (cached) saveToCache(cached.games, cached.etag);
			return cached?.games || [];
		}

		if (result.games) {
			console.log(`[JeoSWR] Fresh data: ${result.games.length} games`);
			saveToCache(result.games, result.etag);
			if (onFreshData) onFreshData(result.games);
			return result.games;
		}

		if (result.error && cached?.games) {
			console.warn('[JeoSWR] Network failed, using stale cache');
			return cached.games;
		}

		// No cache, no network — last resort: try inline data
		if (window.GAMES_LIST && Array.isArray(window.GAMES_LIST)) {
			console.log('[JeoSWR] Using inline GAMES_LIST fallback');
			return window.GAMES_LIST;
		}

		return [];
	}

	/* ─── Utility ─── */

	function clearCache() {
		try {
			localStorage.removeItem(CACHE_KEY);
			localStorage.removeItem(CACHE_META_KEY);
		} catch {}
	}

	function getCacheInfo() {
		try {
			const meta = JSON.parse(localStorage.getItem(CACHE_META_KEY) || '{}');
			return {
				cachedAt: meta.cachedAt ? new Date(meta.cachedAt).toISOString() : null,
				count: meta.count || 0,
				ageMs: meta.cachedAt ? Date.now() - meta.cachedAt : Infinity,
				isStale: meta.cachedAt ? Date.now() - meta.cachedAt > MAX_AGE_MS : true,
			};
		} catch {
			return { cachedAt: null, count: 0, ageMs: Infinity, isStale: true };
		}
	}

	window.JeoSWR = {
		loadCatalog,
		clearCache,
		getCacheInfo,
	};
})();
