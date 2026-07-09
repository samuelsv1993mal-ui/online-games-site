const CACHE_NAME = 'smq-games-v21';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/client.js',
  '/firebase-config.js',
  '/manifest.webmanifest',
  '/assets/smq-logo.svg',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/apple-touch-icon.png',
  '/assets/favicon-16.png',
  '/assets/favicon-32.png',
  '/assets/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/socket.io/')) return;
  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        if (response.ok && url.origin === location.origin) caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match('/index.html')))
  );
});
