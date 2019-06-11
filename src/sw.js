// self.addEventListener('install', async event => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(staticAssets);
// });

// self.addEventListener('fetch', async event => {
//   const req = event.request;
//   if (/.*(json)$/.test(req.url)) {
//     event.respondWith(networkFirst(req));
//   } else {
//     event.respondWith(cacheFirst(req));
//   }
// });

// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cachedResponse = await cache.match(req);
//   // console.log('cachedResponse', cachedResponse)
//   return cachedResponse || networkFirst(req);
// }

// async function networkFirst(req) {
//   const cache = await caches.open(cacheName);
//   console.log('cache, req', { cache, req })
//   try {
//     const fresh = await fetch(req);
//     cache.put(req, fresh.clone());
//     return fresh;
//   } catch (e) { 
//     const cachedResponse = await cache.match(req);
//     return cachedResponse;
//   }
// }

// const cacheName = 'pwa-conf-v1';
// const staticAssets = [
//   './',
//   './index.html',
//   './app.js',
//   './styles.css'
// ];

// if ('workbox' in self) {
//   console.log('self', self)
//   workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// }

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BD_dTiDGgJhSY_SfhGhnuyxmMILU_DeeikoY6L3jqegLlULxxbORwUMNMDJPhBekSGesJlVEK3IK5C0ZYtSLcig'
    )
    const options = {
      applicationServerKey,
      userVisibleOnly: true
    }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('push', async event => {
  console.log('event push', event)
});

// function subscribeUserToPush() {
//   return navigator.serviceWorker.register('/service-worker.js')
//   .then(function(registration) {
//     const subscribeOptions = {
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(
//         'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
//       )
//     };

//     return registration.pushManager.subscribe(subscribeOptions);
//   })
//   .then(function(pushSubscription) {
//     console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
//     return pushSubscription;
//   });
// }
