const CACHE_NAME = 'mi-player-v16-elite';
const ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js',
  'https://cdn-icons-png.flaticon.com/512/727/727218.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Sari zaroori files ko offline ke liye save karna
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // Agar cache mein file milti hai toh wahi dikhao, nahi toh network se lo
      return res || fetch(e.request);
    })
  );
});
