'use strict';

self.addEventListener('push', function (event) {
  let messageData = event.data.json();
  let title = messageData.title;
  let options = messageData.options;

  event.waitUntil(self.registration.showNotification(title, options));
  const promiseFetch = fetch(options.data.received);
  event.waitUntil(promiseFetch);
});

self.addEventListener('install', function (event) {
  return event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function (event) {
  return event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function (event) {

  let url = event.notification.data.opened;
  const promiseChain = clients.openWindow(url, "_blank");
  event.waitUntil(promiseChain);
  event.notification.close();
});

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log("pushsubscriptionchange");
});
