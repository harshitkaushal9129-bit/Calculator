const CACHE_NAME = 'kaushal-calc-v1';
const assets = ['./', './index.html', './manifest.json', './kaushalji.jpg'];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assets);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
