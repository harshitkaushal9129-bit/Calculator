const CACHE_NAME = 'kaushal-pro-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './kaushalji.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching essential assets...');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
