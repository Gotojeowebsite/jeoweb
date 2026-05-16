/**
 * Service worker — v7 (new tree).
 *
 * Strategy:
 *   - Stale-while-revalidate for navigation requests and Astro hashed assets.
 *   - Network-first for the game iframes (/Assets/<slug>/...) — never serve
 *     stale game binaries; size budget is too high.
 *   - Cache-first for the brand assets (icon, og-default).
 *   - Aggressive cleanup of older cache versions on activate.
 *
 * Cutover: enabled when dist/ becomes the deploy artifact in Sprint 7.
 * Until then the legacy v6 SW continues to serve.
 */
const CACHE = 'jeo-v7';

const PRECACHE = [
	'/',
	'/manifest.json',
	'/icon.svg',
	'/og-default.svg',
];

const HASHED_PREFIX = '/_astro/';
const GAME_PREFIX   = '/Assets/';
// Binary game payloads we never cache aggressively — too big, too volatile.
const NEVER_CACHE_EXT = /\.(?:wasm|unityweb|data|pck|mem|nes|smc|gba|bin|iso|zip|7z|rar|swf)$/i;

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE).then(cache =>
			Promise.allSettled(PRECACHE.map(url => cache.add(url)))
		).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
			.then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', event => {
	const req = event.request;
	if (req.method !== 'GET') return;

	const url = new URL(req.url);
	if (url.origin !== self.location.origin) return;

	// Game payloads: network-first, never cache big binaries.
	if (url.pathname.startsWith(GAME_PREFIX)) {
		if (NEVER_CACHE_EXT.test(url.pathname)) return; // let the network handle it
		event.respondWith(networkFirst(req));
		return;
	}

	// Hashed Astro assets — cache-first, they're immutable.
	if (url.pathname.startsWith(HASHED_PREFIX)) {
		event.respondWith(cacheFirst(req));
		return;
	}

	// Navigation requests and everything else: stale-while-revalidate.
	if (req.mode === 'navigate' || req.destination === 'document') {
		event.respondWith(staleWhileRevalidate(req));
		return;
	}
	event.respondWith(staleWhileRevalidate(req));
});

async function cacheFirst(req) {
	const cache = await caches.open(CACHE);
	const hit = await cache.match(req);
	if (hit) return hit;
	try {
		const res = await fetch(req);
		if (res.ok) cache.put(req, res.clone());
		return res;
	} catch (err) {
		return Response.error();
	}
}

async function networkFirst(req) {
	const cache = await caches.open(CACHE);
	try {
		const res = await fetch(req);
		if (res.ok) cache.put(req, res.clone());
		return res;
	} catch (_) {
		const hit = await cache.match(req);
		return hit ?? Response.error();
	}
}

async function staleWhileRevalidate(req) {
	const cache = await caches.open(CACHE);
	const hit = await cache.match(req);
	const fetchPromise = fetch(req).then(res => {
		if (res.ok) cache.put(req, res.clone());
		return res;
	}).catch(() => hit);
	return hit ?? fetchPromise;
}
