const CACHE_NAME = 'jeoweb-pwa-cache-v4';
const GAME_CACHE_PREFIX = 'jeoweb-game-';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/modules/GameContainer.js',
    '/assets/js/modules/InputManager.js',
    '/assets/js/modules/StateManager.js',
    '/assets/images/placeholder-missing.png',
    '/games_list.json'
];

// Game asset extensions that should NEVER be cached opportunistically (only
// when the user explicitly downloads a game for offline play via the new
// CACHE_GAME_FOR_OFFLINE message). These are large binary blobs that bloat
// IndexedDB and pin partial/broken builds.
const NO_CACHE_EXT = /\.(unityweb|wasm|data|pck|mem|symbols|nes|smc|gba|bin|iso|zip|7z|rar)(\?|$)/i;

// Game folders served from /Assets/. Default behavior: network-first with
// per-slug cache lookup so a user who downloaded a game offline gets a hit
// without slowing down everyone else.
const GAME_PATH = /\/Assets\//i;
const GAME_SLUG_RE = /\/Assets\/([^\/]+)\//i;

let lastProgressUpdate = 0;
const PROGRESS_THROTTLE = 100; // ms

function gameCacheNameForSlug(slug) {
    return GAME_CACHE_PREFIX + slug;
}

function slugFromGameUrl(url) {
    try {
        const m = url.match(GAME_SLUG_RE);
        if (m && m[1]) return decodeURIComponent(m[1]);
    } catch {}
    return null;
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
        }
    });

    return new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
    });
}

function broadcastProgress(url, loaded, total, isDone) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'PROGRESS_UPDATE',
                url: url,
                loaded: loaded,
                total: total,
                isDone: isDone
            });
        });
    });
}

function broadcast(message) {
    self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
        clients.forEach(client => client.postMessage(message));
    });
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys
                .filter(k => k !== CACHE_NAME && !k.startsWith(GAME_CACHE_PREFIX))
                .map(k => caches.delete(k))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || !req.url.startsWith('http')) return;

    const url = req.url;

    // Game assets: check per-slug cache FIRST (for users who explicitly
    // downloaded the game for offline play), then go network-first.
    if (GAME_PATH.test(url) || NO_CACHE_EXT.test(url)) {
        event.respondWith((async () => {
            const slug = slugFromGameUrl(url);
            if (slug) {
                try {
                    const cache = await caches.open(gameCacheNameForSlug(slug));
                    const hit = await cache.match(req, { ignoreSearch: true });
                    if (hit) return hit;
                } catch {}
            }
            try {
                return await fetchWithProgress(req);
            } catch (e) {
                // Last-ditch fallback (e.g., offline + game wasn't pre-cached):
                // try any cache that has it (covers cache-version transitions).
                const anyCache = await caches.match(req);
                if (anyCache) return anyCache;
                throw e;
            }
        })());
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
                return caches.match('/assets/images/placeholder-missing.png');
            }
        })
    );
});

// ---------------------------------------------------------------------------
// Per-game offline pre-cache. The frontend calls
//   navigator.serviceWorker.controller.postMessage({ type: 'CACHE_GAME_FOR_OFFLINE', slug })
// to fetch every "required" file in Assets/<slug>/.offline-manifest.json and
// stash it in caches.open('jeoweb-game-<slug>'). Subsequent fetches return
// the cached copy first.

async function fetchManifest(slug) {
    const url = `/Assets/${encodeURIComponent(slug)}/.offline-manifest.json`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
    return res.json();
}

async function cacheGameForOffline(slug, client) {
    const reportTo = (msg) => {
        if (client && client.postMessage) client.postMessage(msg);
        broadcast(msg);
    };

    let manifest;
    try {
        manifest = await fetchManifest(slug);
    } catch (e) {
        reportTo({ type: 'OFFLINE_CACHE_FAILED', slug, error: `no manifest: ${e.message}` });
        return;
    }

    const files = Array.isArray(manifest.files) ? manifest.files.filter(f => f.required) : [];
    if (!files.length) {
        reportTo({ type: 'OFFLINE_CACHE_DONE', slug, total: 0, cached: 0 });
        return;
    }

    const cache = await caches.open(gameCacheNameForSlug(slug));
    let cached = 0, failed = 0;
    let bytes = 0;
    for (const f of files) {
        const url = `/Assets/${encodeURIComponent(slug)}/${f.path.split('/').map(encodeURIComponent).join('/')}`;
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) { failed += 1; continue; }
            const clone = res.clone();
            await cache.put(url, res);
            try {
                const buf = await clone.arrayBuffer();
                bytes += buf.byteLength;
            } catch {}
            cached += 1;
            reportTo({
                type: 'OFFLINE_CACHE_PROGRESS', slug,
                done: cached + failed, total: files.length,
                last: f.path, bytes,
            });
        } catch (e) {
            failed += 1;
        }
    }
    reportTo({ type: 'OFFLINE_CACHE_DONE', slug, total: files.length, cached, failed, bytes });
}

async function uncacheGame(slug, client) {
    const name = gameCacheNameForSlug(slug);
    const ok = await caches.delete(name);
    const msg = { type: 'OFFLINE_UNCACHE_DONE', slug, ok };
    if (client && client.postMessage) client.postMessage(msg);
    broadcast(msg);
}

async function listOfflineGames(client) {
    const keys = await caches.keys();
    const slugs = keys
        .filter(k => k.startsWith(GAME_CACHE_PREFIX))
        .map(k => k.slice(GAME_CACHE_PREFIX.length));
    // Approximate size by summing response-body byte counts.
    const detail = [];
    for (const slug of slugs) {
        try {
            const cache = await caches.open(gameCacheNameForSlug(slug));
            const entries = await cache.keys();
            let bytes = 0;
            for (const req of entries) {
                try {
                    const res = await cache.match(req);
                    if (!res) continue;
                    const buf = await res.clone().arrayBuffer();
                    bytes += buf.byteLength;
                } catch {}
            }
            detail.push({ slug, files: entries.length, bytes });
        } catch {
            detail.push({ slug, files: 0, bytes: 0 });
        }
    }
    const msg = { type: 'OFFLINE_LIST', games: detail };
    if (client && client.postMessage) client.postMessage(msg);
    return detail;
}

self.addEventListener('message', (event) => {
    const data = event.data || {};
    const client = event.source;
    if (data.type === 'CACHE_GAME_FOR_OFFLINE' && data.slug) {
        event.waitUntil(cacheGameForOffline(String(data.slug), client));
    } else if (data.type === 'UNCACHE_GAME' && data.slug) {
        event.waitUntil(uncacheGame(String(data.slug), client));
    } else if (data.type === 'LIST_OFFLINE_GAMES') {
        event.waitUntil(listOfflineGames(client));
    } else if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
