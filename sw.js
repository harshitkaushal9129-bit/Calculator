const CACHE_NAME = 'mi-player-pro-v1';
const ASSETS_TO_CACHE = [
    '/',
    'index.html', // Aapki main file ka naam agar alag hai toh yahan change karein
    'manifest.json',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js'
];

// Install Event: Assets ko cache mein save karna
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching Files');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event: Purane caches ko delete karna
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event: Offline hone par cache se data dena
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
