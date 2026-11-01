const CACHE_NAME = 'avyone-cache-v5';
const ASSETS = [
  './',
  './index.html',
  './flights.html',
  './hotels.html',
  './private.html',
  './tourism.html',
  './cargo.html',
  './transfers.html',
  './lounge.html',
  './insurance.html',
  './ai.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon.svg',
  './avyone%20logo1.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => cache.match(event.request))
      .then((cached) => cached || fetch(event.request))
  );
});
