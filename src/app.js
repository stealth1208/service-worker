import './styles.css';

// class PWAConfApp {
//   constructor() {
//     this.speakersDiv = document.querySelector('.speakers');
//     this.scheduleDiv = document.querySelector('.schedule');
//     this.init();
//   }

//   async init() {
//     this.loadSpeakers();
//     this.loadSchedule();
//   }

//   async loadSpeakers() {
//     // this.speakers = await this.fetchJSON('./speakers.json');
//     this.speakers = (await import('./speakers.json')).default;
//     this.speakersDiv.innerHTML = this.speakers
//       .map(this.toSpeakerBlock)
//       .join('\n');
//   }

//   async loadSchedule() {
//     // const rawSchedule = await this.fetchJSON('./schedule.json');
//     const rawSchedule = (await import('./schedule.json')).default;

//     // Add speaker details to array
//     this.schedule = rawSchedule.map(this.addSpeakerDetails, this);
//     this.scheduleDiv.innerHTML = this.schedule
//       .map(this.toScheduleBlock)
//       .join('\n');
//   }

//   toSpeakerBlock(speaker) {
//     return `
//         <div class="speaker" onclick="run()">
//           <img src="${speaker.picture}" alt="${speaker.name}">
//           <div>${speaker.name}</div>
//         </div>`;
//   }

//   toScheduleBlock(scheduleItem) {
//     return `
//       <div class="schedule-item ${scheduleItem.category}">
//         <div class="title-and-time">
//           <div class="time">${scheduleItem.startTime}</div>
//           <div class="title-and-speaker">
//             <div class="title">${scheduleItem.title}</div>
//             <div class="speaker">${
//               scheduleItem.speaker ? scheduleItem.speaker.name : '&nbsp;'
//             }</div>
//           </div>
//         </div>
//         <p class="description">${scheduleItem.description}</p>
//       </div>
//     `;
//   }

//   addSpeakerDetails(item) {
//     if (item.speakerId) {
//       return Object.assign({}, item, {
//         speaker: this.speakers.find(s => s.id === item.speakerId)
//       });
//     }
//     return Object.assign({}, item);
//   }

//   // async fetchJSON(url) {
//   //   const res = await fetch(url);
//   //   return res.json();
//   // }
// }

window.addEventListener('load', async (e) => {
  // new PWAConfApp();
  // run();
  const button = document.querySelector('.button');
  button.onclick = run;
});

async function run() {
  checkSupporting();
  const swRegistration = await registerSW();
  await requestNotificationPermission();
}

function checkSupporting() {
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    console.log('navigator', navigator)
    alert("Service Worker isn't supported on this browser!")
  }

  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    alert("Push isn't supported on this browser!")
  }
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const serviceWorker = await navigator.serviceWorker.register('./sw.js');
      return serviceWorker;
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.');
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden');
  }
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  console.log('permission', permission)
  if(permission !== 'granted'){
    throw new Error('Permission not granted for Notification');
  }
}

const options = {
  "//": "Visual Options",
  "body": "<String>",
  "icon": "<URL String>",
  "image": "<URL String>",
  "badge": "<URL String>",
  "vibrate": "<Array of Integers>",
  "sound": "<URL String>",
  "dir": "<String of 'auto' | 'ltr' | 'rtl'>",
  "//": "Behavioural Options",
  "tag": "<String>",
  "data": "<Anything>",
  "requireInteraction": "<boolean>",
  "renotify": "<Boolean>",
  "silent": "<Boolean>",
  "//": "Both Visual & Behavioural Options",
  "actions": "<Array of Strings>",
  "//": "Information Option. No visual affect.",
  "timestamp": "<Long>"
}


const showLocalNotification = (title, body, swRegistration) => {
  const customs = {
      body,
      "requireInteraction": false,
  };
  swRegistration.showNotification(title, customs);
}