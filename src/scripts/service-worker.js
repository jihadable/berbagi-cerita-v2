self.addEventListener('push', (event) => {
    const showNotification = async () => {
        const data = event.data.json();
        console.log('Push Notification diterima:', data);
    
        self.registration.showNotification(data.title, {
            body: data.body
        });
    };
     
    event.waitUntil(showNotification());
});

const CACHE_NAME = 'berbagi-cerita-v2';
const getAssets = async () => {
    const response = await fetch('/asset-manifest.json');
    const assets = await response.json();
    return [
        '/',
        '/index.html',
        `/${assets['main.js']}`, // Ambil nama bundle.js secara dinamis
        '/manifest.json',
        '/assets/icon192.png',
        '/assets/icon512.png',
    ];
};

// Install Service Worker dan Cache Aset
self.addEventListener('install', (event) => {
    event.waitUntil(
        getAssets().then((urlsToCache) => {
            return caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache));
        }).catch((error) => {
            console.error('Gagal memuat aset:', error);
        })
    );
});
  

// Ambil dari Cache saat Offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update Cache saat Service Worker diaktifkan
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
