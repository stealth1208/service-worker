const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './img/icons/pwa-icon-256.png'
];

self.addEventListener('install', async event => {
  console.log('Sw installed!');
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('activated', async event => {
  console.log('Sw activated!');
  // const cache = await caches.open(cacheName);
  // await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}
