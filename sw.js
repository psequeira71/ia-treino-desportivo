'use strict';
const VERSION='ia-treino-pedro-sequeira-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/hero.jpg',...Array.from({length:13},(_,i)=>`./assets/slide-${String(i+1).padStart(2,'0')}.jpg`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const clone=response.clone();caches.open(VERSION).then(cache=>cache.put(event.request,clone));}return response;})));});
