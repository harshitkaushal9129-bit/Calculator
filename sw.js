// sw.js - Service Worker Code for MI Player Pro

const CACHE_NAME = 'mi-player-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './kaushalji.jpg'
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

// Fetch event - Offline support aur Share Target handle karne ke liye
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // Share Target handling: Jab app share ke through open ho
    if (url.searchParams.has('link')) {
        console.log('Shared file received:', url.searchParams.get('link'));
        // Yahan aap shared file ko index.html mein process kar sakte hain
    }

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
