// sw.js
const CACHE_NAME = 'language-puzzles-cache-v2';

const urlsToCache = [
  '/language-puzzles/',
  '/language-puzzles/index.html',
  '/language-puzzles/english.html',
  '/language-puzzles/french.html',
  '/language-puzzles/german.html',
  '/language-puzzles/offline.html',
  '/language-puzzles/icon-192.png',
  '/language-puzzles/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
