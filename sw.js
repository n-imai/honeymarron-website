const CACHE_VERSION = 'v1';
const STATIC_CACHE = `hm-static-${CACHE_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.webmanifest',
  '/assets/analytics.js',
  '/assets/site.js',
  '/assets/apple-touch-icon.png',
  '/assets/favicon.svg',
  '/apps/awardcert/',
  '/apps/voicycare/',
  '/privacy.html',
  '/terms.html',
  '/contact.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const cloned = response.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});


