const CACHE_NAME = 'matt-card-v1';
// List all files the PWA needs for offline access. Make sure all your assets are listed here.
const urlsToCache = [
  '/', 
  'index.html',
  'style.css',
  'script.js',
  'logowide.png', 
  'photo1.jpg',
  'favicon.ico', 
  'favicon.png' 
];

// Installation: Caching all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache, pre-caching all required assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation: Cleaning up old caches (to allow updates to the card)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete any caches that don't match the current CACHE_NAME
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetching: Serve content from cache first, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache match - fetch from network
        return fetch(event.request);
      })
  );
});
