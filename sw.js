const CACHE_NAME = 'jeoweb-pwa-cache-v1'; // Change v1 to v2 to cache-bust (Task 6)

// Core platform assets to cache immediately
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Stale-while-revalidate strategy for dynamic game assets
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((fetchResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    // Dynamically cache game files as they are played
                    if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
                        cache.put(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                });
            });
        }).catch(() => {
            // Task 7: Asset Fallback if offline and image wasn't cached
            if (event.request.destination === 'image') {
                return caches.match('/assets/images/placeholder-missing.png');
            }
        })
    );
});