const CACHE_NAME = 'jeoweb-pwa-cache-v4';

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

// Game asset extensions that should NEVER be cached. These are large binary
// blobs (Unity, Godot, emulator BIOSes/ROMs, etc.) — caching them bloats
// IndexedDB and, worse, pins a broken/partial build forever once stored.
const NO_CACHE_EXT = /\.(unityweb|wasm|data|pck|mem|symbols|nes|smc|gba|bin|iso|zip|7z|rar)(\?|$)/i;

// Game folders served from /Assets/. Always go network-first so a re-downloaded
// game shows up immediately, with no stale fallback from the SW cache.
const GAME_PATH = /\/Assets\//i;

let lastProgressUpdate = 0;
const PROGRESS_THROTTLE = 100; // ms

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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
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
        event.respondWith(fetchWithProgress(req).catch(() => fetch(req).catch(() => caches.match(req))));
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

self.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
