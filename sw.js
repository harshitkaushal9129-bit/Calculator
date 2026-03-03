const CACHE_NAME = 'mi-player-v1';
const ASSETS = [
  'https://harshitkaushal9129-bit.github.io/Calculator/index.html',
  'https://harshitkaushal9129-bit.github.io/Calculator/kaushalji.jpg',
  'https://harshitkaushal9129-bit.github.io/Calculator/manifest.json'
];

// Install Event - Files ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event - Offline hone par cache se file dena
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
