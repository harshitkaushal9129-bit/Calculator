self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mi-player-v1').then((cache) => {
      return cache.addAll(['/', 'index.html']); // Apni files ke naam yaha likhein
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
