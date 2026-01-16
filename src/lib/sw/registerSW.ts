// Service Worker Registration Utility
// Handles SW registration, updates, and messaging

'use client';

interface SWConfig {
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
    onOfflineReady?: () => void;
    onError?: (error: Error) => void;
}

// Check if service workers are supported
export function isServiceWorkerSupported(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator;
}

// Register service worker
export async function registerServiceWorker(config: SWConfig = {}): Promise<ServiceWorkerRegistration | null> {
    if (!isServiceWorkerSupported()) {
        console.log('[SW] Service workers not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
        });

        console.log('[SW] Service Worker registered:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // New update available
                            console.log('[SW] New content available');
                            config.onUpdate?.(registration);
                        } else {
                            // Content cached for offline
                            console.log('[SW] Content cached for offline use');
                            config.onSuccess?.(registration);
                            config.onOfflineReady?.();
                        }
                    }
                });
            }
        });

        return registration;
    } catch (error) {
        console.error('[SW] Registration failed:', error);
        config.onError?.(error as Error);
        return null;
    }
}

// Unregister service worker
export async function unregisterServiceWorker(): Promise<boolean> {
    if (!isServiceWorkerSupported()) {
        return false;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        const success = await registration.unregister();
        console.log('[SW] Unregistered:', success);
        return success;
    } catch (error) {
        console.error('[SW] Unregister failed:', error);
        return false;
    }
}

// Skip waiting and activate new SW
export function skipWaiting(): void {
    if (!isServiceWorkerSupported()) return;

    const controller = navigator.serviceWorker.controller;
    if (controller) {
        controller.postMessage({ type: 'SKIP_WAITING' });
    }
}

// Send URLs to cache
export function cacheUrls(urls: string[]): void {
    if (!isServiceWorkerSupported()) return;

    const controller = navigator.serviceWorker.controller;
    if (controller) {
        controller.postMessage({ type: 'CACHE_URLS', urls });
    }
}

// Check for SW updates
export async function checkForUpdates(): Promise<void> {
    if (!isServiceWorkerSupported()) return;

    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
        console.log('[SW] Checked for updates');
    } catch (error) {
        console.error('[SW] Update check failed:', error);
    }
}

// Get SW registration
export async function getRegistration(): Promise<ServiceWorkerRegistration | null> {
    if (!isServiceWorkerSupported()) return null;

    try {
        return await navigator.serviceWorker.ready;
    } catch {
        return null;
    }
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        console.log('[Notification] Not supported');
        return 'denied';
    }

    const permission = await Notification.requestPermission();
    console.log('[Notification] Permission:', permission);
    return permission;
}

// Subscribe to push notifications
export async function subscribeToPush(vapidPublicKey: string): Promise<PushSubscription | null> {
    if (!isServiceWorkerSupported()) return null;

    try {
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
        });

        console.log('[Push] Subscribed:', subscription.endpoint);
        return subscription;
    } catch (error) {
        console.error('[Push] Subscription failed:', error);
        return null;
    }
}

// Unsubscribe from push
export async function unsubscribeFromPush(): Promise<boolean> {
    if (!isServiceWorkerSupported()) return false;

    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
            const success = await subscription.unsubscribe();
            console.log('[Push] Unsubscribed:', success);
            return success;
        }
        return false;
    } catch (error) {
        console.error('[Push] Unsubscribe failed:', error);
        return false;
    }
}

// Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Show notification
export function showNotification(title: string, options?: NotificationOptions): void {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
        new Notification(title, options);
    }
}

export default {
    isServiceWorkerSupported,
    registerServiceWorker,
    unregisterServiceWorker,
    skipWaiting,
    cacheUrls,
    checkForUpdates,
    getRegistration,
    requestNotificationPermission,
    subscribeToPush,
    unsubscribeFromPush,
    showNotification,
};
