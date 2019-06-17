const preCacheName = "pre-cache-pra-v9",
    // List of static files to add to cache (css, scripts, images...)
    preCacheFiles = [
        "/offline.html",
        "/styles/styles.css",
        "/styles/hamburgers.min.css",
        "/assets/logo2.svg",
        "/assets/imago.svg",
        "/assets/overlapping-hexagons.svg",
        "/favicon.ico"
    ];


self.addEventListener("install", evt => {
    console.log('[ServiceWorker] Install');
    // Precache of static resources.
    evt.waitUntil(
        caches.open(preCacheName).then(cache => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(preCacheFiles);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', evt => {
    console.log('[ServiceWorker] Activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== preCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", evt => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // Fetch event handler.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }

    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(preCacheName)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );

    //// Final option to be developed
    // evt.respondWith(
    //     caches.match(evt.request).then(response => {
    //         if (!response) {
    //             // Fall back to the network fetch
    //             return fetch(evt.request);
    //         }
    //         return response;
    //     })
    // );
});
