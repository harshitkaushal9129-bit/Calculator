const CACHE_NAME = 'mi-player-pro-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js'
];

// Install: Turant naya version cache mein lena
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate: Purane kachre (old cache) ko saaf karna
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch Strategy: Stale-While-Revalidate
// Matlab: Pehle purana dikhao (fast), piche se naya download karo
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchedResponse = fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                // Agar net bilkul nahi hai toh sirf cache se chalega
                return cachedResponse;
            });

            return cachedResponse || fetchedResponse;
        })
    );
});

// Auto-Update Logic: Jab net aaye toh naya version check kare
self.addEventListener('sync', (event) => {
    if (event.tag === 'check-for-updates') {
        event.waitUntil(
            // Background mein files refresh karna
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
        );
    }
});
