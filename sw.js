const CACHE_NAME = 'mi-player-v2.0-pro';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://harshitkaushal9129-bit.github.io/Dashboard-of-snt/' // Official Portal for offline access
];

// 1. Install Event: Fast Caching
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Naye update ko turant apply karne ke liye
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pro Cache: Shielding Assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// 2. Activate Event: Memory Management
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Turant control lene ke liye
});

// 3. Fetch Event: Smart Strategy (Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
  // Sirf GET requests ko handle karein
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          // Nayi file ko cache mein update karte rahein (Dynamic Caching)
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Agar net nahi hai toh cache se do
          return cachedResponse;
        });

        // Response fast dene ke liye cache pehle return karein, 
        // par background mein network se update bhi karein
        return cachedResponse || fetchedResponse;
      });
    })
  );
});

// 4. Background Sync (Optional: Future Features ke liye)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-playlists') {
    console.log('Syncing data in background...');
  }
});
