const CACHE_NAME = 'jeoweb-pwa-cache-v3';

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
        event.respondWith(fetch(req).catch(() => caches.match(req)));
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