// Memuat pustaka Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat');

    // Precache dari Webpack (InjectManifest akan menggantikan self.__WB_MANIFEST)
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

    const CACHE_NAME = 'berbagi-cerita-v2';
    const additionalAssets = [
        '/asset-manifest.json',
        '/manifest.json',
        '/assets/icon192.png',
        '/assets/icon512.png',
    ];

    // Cache tambahan secara manual
    workbox.core.setCacheNameDetails({ prefix: CACHE_NAME });
    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.addAll(additionalAssets))
        );
    });

    // Ambil dari cache atau fetch ke jaringan
    self.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    });

    // Bersihkan cache lama saat SW diperbarui
    self.addEventListener('activate', (event) => {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
        );
    });

    // Notifikasi push
    self.addEventListener('push', (event) => {
        const showNotification = async () => {
            const data = event.data?.json() || {};
            console.log('Push Notification diterima:', data);

            await self.registration.showNotification(data.title || 'Notifikasi', {
                body: data.body || 'Anda memiliki pemberitahuan baru.',
            });
        };
        event.waitUntil(showNotification());
    });

} else {
    console.error('Workbox gagal dimuat');
}