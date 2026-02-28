// sw.js - Service Worker Code for MI PLAYER PRO

const CACHE_NAME = 'mi-player-v1';
const ASSETS = [
    './',
    './index.html', // यहाँ सुनिश्चित करें कि आपकी HTML फाइल का नाम index.html ही है
    './manifest.json'
    // यदि आपके पास कोई लोगो या CSS फाइल है तो आप उसे यहाँ जोड़ सकते हैं
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

// Fetch event - ऑफलाइन होने पर कैश से फाइलें लोड करने के लिए
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // अगर कैश में फाइल है, तो उसे दिखाओ, नहीं तो इंटरनेट से लाओ
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
