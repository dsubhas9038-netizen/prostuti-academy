// Service Worker for ProstutiAcademy
// Provides offline support and caching

const CACHE_NAME = 'prostuti-academy-v1';
const STATIC_CACHE = 'prostuti-static-v1';
const DYNAMIC_CACHE = 'prostuti-dynamic-v1';

// Files to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/offline',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Cache strategies
const CACHE_STRATEGIES = {
    cacheFirst: ['/_next/static/', '/icons/', '/fonts/'],
    networkFirst: ['/api/', '/_next/data/'],
    staleWhileRevalidate: ['/images/', '/screenshots/'],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) return;

    // Determine caching strategy
    const strategy = getCacheStrategy(url.pathname);

    event.respondWith(handleRequest(request, strategy));
});

// Get cache strategy for a path
function getCacheStrategy(pathname) {
    for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
        if (patterns.some((pattern) => pathname.includes(pattern))) {
            return strategy;
        }
    }
    return 'networkFirst'; // Default strategy
}

// Handle request based on strategy
async function handleRequest(request, strategy) {
    switch (strategy) {
        case 'cacheFirst':
            return cacheFirst(request);
        case 'networkFirst':
            return networkFirst(request);
        case 'staleWhileRevalidate':
            return staleWhileRevalidate(request);
        default:
            return networkFirst(request);
    }
}

// Cache First strategy - for static assets
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        return getOfflineFallback(request);
    }
}

// Network First strategy - for dynamic content
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        return getOfflineFallback(request);
    }
}

// Stale While Revalidate - serve cached, update in background
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    // Fetch in background
    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then((c) => c.put(request, networkResponse.clone()));
            }
            return networkResponse;
        })
        .catch(() => null);

    // Return cached or wait for network
    return cachedResponse || fetchPromise || getOfflineFallback(request);
}

// Get offline fallback
async function getOfflineFallback(request) {
    // For navigation requests, show offline page
    if (request.mode === 'navigate') {
        const offlinePage = await caches.match('/offline');
        if (offlinePage) {
            return offlinePage;
        }
    }

    // For images, return placeholder
    if (request.destination === 'image') {
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect fill="#f3f4f6" width="200" height="200"/>
        <text fill="#9ca3af" x="50%" y="50%" text-anchor="middle" dy=".3em">Offline</text>
      </svg>`,
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }

    // For other requests, return network error
    return new Response('Network unavailable', {
        status: 503,
        statusText: 'Service Unavailable',
    });
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.urls || [];
        caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.addAll(urlsToCache);
        });
    }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }

    if (event.tag === 'sync-bookmarks') {
        event.waitUntil(syncBookmarks());
    }
});

// Sync progress data
async function syncProgress() {
    // This will be implemented to sync IndexedDB data with Firestore
    console.log('[SW] Syncing progress data...');
}

// Sync bookmarks
async function syncBookmarks() {
    console.log('[SW] Syncing bookmarks...');
}

// Push notification handler
self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};

    const options = {
        body: data.body || 'New update from ProstutiAcademy',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
        },
        actions: [
            { action: 'open', title: 'Open' },
            { action: 'dismiss', title: 'Dismiss' },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'ProstutiAcademy', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open' || !event.action) {
        const url = event.notification.data?.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

console.log('[SW] Service Worker loaded');
