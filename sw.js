/* BioglowRX service worker: makes the site installable on phones ("Add to Home Screen").
   It caches nothing and simply passes every request to the network, so updates appear straight away. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
