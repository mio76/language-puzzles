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

// Установка: кэшируем нужные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация: удаляем старые кэши
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Обработка запросов: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // Если сети нет и ресурс не найден в кэше — показываем offline.html
        if (event.request.destination === 'document') {
          return caches.match('/language-puzzles/offline.html');
        }
      });
    })
  );
});