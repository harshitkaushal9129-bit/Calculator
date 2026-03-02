// sw.js - Simple Service Worker for MI Player Pro

const CACHE_NAME = 'mi-player-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './kaushalji.jpg'
];

// Install: Cache save karo
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch: Offline chalne ke liye files do
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

// Activate: Purana cache hatao
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
});
