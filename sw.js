// Cache version. The literal "__BUILD_VERSION__" gets stamped at deploy
// time by scripts/link-assets-into-dist.mjs so every build invalidates
// stale clients automatically — no more "user has to hard-refresh after a
// release" support tickets. Falls back to a date string for local dev.
const CACHE_NAME = 'jeoweb-pwa-cache-__BUILD_VERSION__';

// Core app shell — kept lean so install never fails on a missing file.
// Hashed Astro bundles are picked up by the stale-while-revalidate
// handler on first fetch; we don't list them here because their names
// change every build.
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.svg',
    '/notavailable.svg',
    '/games_catalog.json',
    '/game_health_slim.json',
    '/offline/'
];

const IMAGE_FALLBACK = '/notavailable.svg';

// Game asset extensions that should NEVER be cached. These are large binary
// blobs (Unity, Godot, emulator BIOSes/ROMs, etc.) — caching them bloats
// IndexedDB and, worse, pins a broken/partial build forever once stored.
const NO_CACHE_EXT = /\.(unityweb|wasm|data|pck|mem|symbols|nes|smc|gba|bin|iso|zip|7z|rar)(\?|$)/i;

// Game folders served from /Assets/. Always go network-first so a re-downloaded
// game shows up immediately, with no stale fallback from the SW cache.
const GAME_PATH = /\/Assets\//i;

let lastProgressUpdate = 0;
const PROGRESS_THROTTLE = 100; // ms

async function fetchWithProgress(request, clientId) {
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
                        postProgress(clientId, url, loaded, total, true);
                        controller.close();
                        break;
                    }
                    loaded += value.byteLength;

                    const now = Date.now();
                    if (now - lastProgressUpdate > PROGRESS_THROTTLE) {
                        lastProgressUpdate = now;
                        postProgress(clientId, url, loaded, total, false);
                    }

                    controller.enqueue(value);
                }
            } catch (err) {
                controller.error(err);
            }
        }
    });

    return new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
    });
}

// Post a progress message to the single client that requested the asset.
// Earlier versions broadcast to every controlled client via clients.matchAll(),
// which spammed background tabs and other windows on every chunk.
function postProgress(clientId, url, loaded, total, isDone) {
    if (!clientId) return;
    self.clients.get(clientId).then(client => {
        if (!client) return;
        client.postMessage({
            type: 'PROGRESS_UPDATE',
            url: url,
            loaded: loaded,
            total: total,
            isDone: isDone
        });
    });
}

self.addEventListener('install', (event) => {
    // Tolerant precache: a single missing/404 asset must not abort the install.
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            Promise.allSettled(STATIC_ASSETS.map((url) => cache.add(url)))
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || !req.url.startsWith('http')) return;

    const url = req.url;

    // Game assets and large binaries: network-first, no caching.
    if (GAME_PATH.test(url) || NO_CACHE_EXT.test(url)) {
        event.respondWith(fetchWithProgress(req, event.clientId).catch(() => fetch(req).catch(() => caches.match(req))));
        return;
    }

    // Platform assets: stale-while-revalidate.
    event.respondWith(
        caches.match(req).then(cached => {
            const networked = fetch(req).then(res => {
                if (res && res.ok) {
                    caches.open(CACHE_NAME).then(c => c.put(req, res.clone())).catch(() => {});
                }
                return res;
            }).catch(() => cached);
            return cached || networked;
        }).catch(() => {
            if (req.destination === 'image') {
                return caches.match(IMAGE_FALLBACK);
            }
        })
    );
});

self.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// ---- Web push (Phase 5) ----------------------------------------------------
// Pushes are sent payload-less by the Worker Cron, so the notification text
// lives here. If a payload ever is attached, it overrides the defaults.
self.addEventListener('push', (event) => {
    let title = 'Jeoweb';
    let body = 'Your daily challenge is ready — and your streak is waiting! 🔥';
    if (event.data) {
        try {
            const d = event.data.json();
            if (d.title) title = d.title;
            if (d.body) body = d.body;
        } catch (e) { /* payload-less push — keep defaults */ }
    }
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: '/icon.svg',
            badge: '/icon.svg',
            tag: 'jeo-daily',
            data: { url: '/' },
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.url) || '/';
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const c of list) {
                if (c.url.includes(self.registration.scope) && 'focus' in c) return c.focus();
            }
            return self.clients.openWindow(url);
        })
    );
});
