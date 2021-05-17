// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

// Registration of the service worker is completed within the script.js file.


// Event listener for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Setup the cache name and define the urls that will be cached.
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './index.html',
  './style.css',
  './scripts/router.js',
  './scripts/script.js',
  './components/entry-page.js',
  './components/journal-entry.js',
  'https://cse110lab6.herokuapp.com/entries'
];

// Event listener for installation
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener for fetch requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

  // Register the service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }