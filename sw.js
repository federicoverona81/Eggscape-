const CACHE = "panic-eggs-v1";
const ASSETS = [
  "/Eggscape-/",
  "/Eggscape-/index.html",
  "/Eggscape-/musica.mp3",
  "/Eggscape-/icons/icon-192.png",
  "/Eggscape-/icons/icon-512.png",
  "/Eggscape-/icons/maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
