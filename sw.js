// sw.js - Service Worker Code for Kaushal Calculator Pro with File Sharing

const CACHE_NAME = 'kaushal-pro-v2'; // Manifest file se match karne ke liye update kiya
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './kaushalji.jpg'
];

// Install event - फाइलें कैश (save) करने के लिए
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opening cache and caching assets');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Fetch event - Share Target API aur Offline support ke liye
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // Agar app files handle kar raha hai (POST request to index.html)
    if (e.request.method === 'POST' && url.pathname.endsWith('index.html')) {
        e.respondWith(
            e.request.formData().then((formData) => {
                const file = formData.get('media'); // 'media' wo name hai jo manifest mein set kiya
                console.log('File received:', file);

                // Yahan aap IndexedDB mein file save karne ka logic daal sakte hain
                // For now, redirect back to index
                return Response.redirect('./index.html?shared=true');
            })
        );
        return;
    }

    // Default: Offline hone par cache se files load karna
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

// Activate event - पुराने कैश को हटाने के लिए
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
