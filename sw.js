// sw.js - Service Worker Code for MI Player Pro

const CACHE_NAME = 'mi-player-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    // Agar koi CSS ya alag JS file hai toh yahan add karein
];

// Install event - Files ko cache mein save karne ke liye
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opening cache and caching assets');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Fetch event - Offline support ke liye files serve karna
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

// Activate event - Purane cache ko delete karne ke liye
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
