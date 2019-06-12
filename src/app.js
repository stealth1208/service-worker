run();

async function run() {
  checkSupporting();
  const sw = await registerSw();
}

function checkSupporting() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker is not supported!');
  }
}
async function registerSw() {
  try {
    const serviceWorker = navigator.serviceWorker.register('./sw.js');
    return serviceWorker;
  } catch (error) {
    throw new Error('Register service worker fail!');
  }
}
console.log("App")