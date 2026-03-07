const CACHE_NAME = 'mi-player-v1';
const ASSETS = [
  'https://harshitkaushal9129-bit.github.io/Calculator/manifest.json,
  'https://harshitkaushal9129-bit.github.io/Calculator/index.html',
  'https://cdn-icons-png.flaticon.com/512/727/727218.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
