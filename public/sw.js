/**
 * Service worker — v7 (Astro tree).
 *
 * Strategy:
 *   - Stale-while-revalidate for navigation requests and Astro hashed assets.
 *   - Network-first for the game iframes (/Assets/<slug>/...) — never serve
 *     stale game binaries; size budget is too high.
 *   - Cache-first for the brand assets (icon, og-default, mascot).
 *   - Aggressive cleanup of all legacy `jeoweb-pwa-cache-v*` versions on activate.
 *
 * Save-manager bridge: `fetchWithProgress` streams game downloads and posts
 * { type: 'PROGRESS_UPDATE' } messages to every controlled client, throttled
 * to 100 ms — same contract the legacy /sw.js exposed.
 */
const CACHE = 'jeo-v7';

const PRECACHE = [
	'/',
	'/offline',
	'/manifest.json',
	'/icon.svg',
	'/og-default.svg',
	'/notavailable.svg',
	'/brand/jeo-mascot.svg',
];

const HASHED_PREFIX = '/_astro/';
const GAME_PREFIX   = '/Assets/';
// Binary game payloads we never cache aggressively — too big, too volatile.
const NEVER_CACHE_EXT = /\.(?:wasm|unityweb|data|pck|mem|nes|smc|gba|bin|iso|zip|7z|rar|swf)$/i;
const IMAGE_FALLBACK = '/notavailable.svg';

let lastProgressUpdate = 0;
const PROGRESS_THROTTLE = 100;

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
			.then(keys => Promise.all(
				keys
					// Wipe any cache that isn't our current one — covers both the legacy
					// jeoweb-pwa-cache-v* family and any prior jeo-v* incarnations.
					.filter(k => k !== CACHE)
					.map(k => caches.delete(k))
			))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', event => {
	const req = event.request;
	if (req.method !== 'GET') return;

	const url = new URL(req.url);
	if (url.origin !== self.location.origin) return;

	// Game payloads: network-first with progress streaming.
	if (url.pathname.startsWith(GAME_PREFIX)) {
		if (NEVER_CACHE_EXT.test(url.pathname)) {
			// Stream progress for huge binaries but never put them in cache.
			event.respondWith(fetchWithProgress(req).catch(() => fetch(req)));
			return;
		}
		event.respondWith(networkFirstWithProgress(req));
		return;
	}

	// Hashed Astro assets — cache-first, they're immutable.
	if (url.pathname.startsWith(HASHED_PREFIX)) {
		event.respondWith(cacheFirst(req));
		return;
	}

	// Navigation requests and everything else: stale-while-revalidate.
	event.respondWith(staleWhileRevalidate(req, /* offlineFallback */ req.mode === 'navigate'));
});

async function cacheFirst(req) {
	const cache = await caches.open(CACHE);
	const hit = await cache.match(req);
	if (hit) return hit;
	try {
		const res = await fetch(req);
		if (res.ok) cache.put(req, res.clone());
		return res;
	} catch (_) {
		return Response.error();
	}
}

async function networkFirstWithProgress(req) {
	const cache = await caches.open(CACHE);
	try {
		const res = await fetchWithProgress(req);
		if (res.ok) cache.put(req, res.clone());
		return res;
	} catch (_) {
		const hit = await cache.match(req);
		return hit ?? Response.error();
	}
}

async function staleWhileRevalidate(req, offlineFallback) {
	const cache = await caches.open(CACHE);
	const hit = await cache.match(req);
	const fetchPromise = fetch(req).then(res => {
		if (res.ok) cache.put(req, res.clone());
		return res;
	}).catch(async () => {
		if (offlineFallback) {
			const off = await cache.match('/offline');
			if (off) return off;
		}
		if (req.destination === 'image') {
			const fallback = await cache.match(IMAGE_FALLBACK);
			if (fallback) return fallback;
		}
		return hit;
	});
	return hit ?? fetchPromise;
}

async function fetchWithProgress(request) {
	const response = await fetch(request);
	if (!response.ok || !response.body) return response;

	const contentLength = response.headers.get('content-length');
	if (!contentLength) return response;

	const total = parseInt(contentLength, 10);
	let loaded = 0;
	const url = request.url;

	const reader = response.body.getReader();
	const stream = new ReadableStream({
		async start(controller) {
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						broadcastProgress(url, loaded, total, true);
						controller.close();
						break;
					}
					loaded += value.byteLength;
					const now = Date.now();
					if (now - lastProgressUpdate > PROGRESS_THROTTLE) {
						lastProgressUpdate = now;
						broadcastProgress(url, loaded, total, false);
					}
					controller.enqueue(value);
				}
			} catch (err) {
				controller.error(err);
			}
		},
	});

	return new Response(stream, {
		headers: response.headers,
		status: response.status,
		statusText: response.statusText,
	});
}

function broadcastProgress(url, loaded, total, isDone) {
	self.clients.matchAll().then(clients => {
		clients.forEach(client => {
			client.postMessage({ type: 'PROGRESS_UPDATE', url, loaded, total, isDone });
		});
	});
}

self.addEventListener('message', event => {
	const data = event.data || {};
	if (data.type === 'SKIP_WAITING') self.skipWaiting();
});

// ---- Web push -------------------------------------------------------------
self.addEventListener('push', event => {
	let title = 'Jeo';
	let body = "Your daily challenge is ready — and your streak's still warm. 🔥";
	if (event.data) {
		try {
			const d = event.data.json();
			if (d.title) title = d.title;
			if (d.body) body = d.body;
		} catch (_) { /* payload-less push */ }
	}
	event.waitUntil(
		self.registration.showNotification(title, {
			body,
			icon: '/icon.svg',
			badge: '/icon.svg',
			tag: 'jeo-daily',
			data: { url: '/' },
		})
	);
});

self.addEventListener('notificationclick', event => {
	event.notification.close();
	const url = (event.notification.data && event.notification.data.url) || '/';
	event.waitUntil(
		self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
			for (const c of list) {
				if (c.url.includes(self.registration.scope) && 'focus' in c) return c.focus();
			}
			return self.clients.openWindow(url);
		})
	);
});
