// useOffline Hook
// Monitors network status and provides offline utilities

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getStorageEstimate,
    formatBytes,
    getCacheMeta,
    STORES,
} from '@/lib/storage/indexedDB';

interface OfflineState {
    isOnline: boolean;
    isOffline: boolean;
    wasOffline: boolean;
    connectionType: string | null;
    effectiveType: string | null;
    downlink: number | null;
    rtt: number | null;
}

interface StorageInfo {
    usage: number;
    quota: number;
    usagePercent: number;
    usageFormatted: string;
    quotaFormatted: string;
}

interface UseOfflineReturn {
    // Network status
    isOnline: boolean;
    isOffline: boolean;
    wasOffline: boolean;
    connectionType: string | null;
    connectionQuality: 'excellent' | 'good' | 'moderate' | 'poor' | 'offline';
    // Storage
    storage: StorageInfo | null;
    refreshStorage: () => Promise<void>;
    // Cache info
    cacheInfo: {
        questions: number;
        bookmarks: number;
        tests: number;
        lastSynced: string | null;
    };
    refreshCacheInfo: () => Promise<void>;
    // Actions
    requestPersistentStorage: () => Promise<boolean>;
}

export function useOffline(): UseOfflineReturn {
    const [state, setState] = useState<OfflineState>({
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
        wasOffline: false,
        connectionType: null,
        effectiveType: null,
        downlink: null,
        rtt: null,
    });

    const [storage, setStorage] = useState<StorageInfo | null>(null);
    const [cacheInfo, setCacheInfo] = useState({
        questions: 0,
        bookmarks: 0,
        tests: 0,
        lastSynced: null as string | null,
    });

    // Update connection info
    const updateConnectionInfo = useCallback(() => {
        if (typeof navigator === 'undefined') return;

        const connection = (navigator as any).connection ||
            (navigator as any).mozConnection ||
            (navigator as any).webkitConnection;

        setState((prev) => ({
            ...prev,
            isOnline: navigator.onLine,
            isOffline: !navigator.onLine,
            wasOffline: prev.wasOffline || !navigator.onLine,
            connectionType: connection?.type || null,
            effectiveType: connection?.effectiveType || null,
            downlink: connection?.downlink || null,
            rtt: connection?.rtt || null,
        }));
    }, []);

    // Listen for online/offline events
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleOnline = () => {
            setState((prev) => ({ ...prev, isOnline: true, isOffline: false }));
            console.log('[Network] Back online');
        };

        const handleOffline = () => {
            setState((prev) => ({ ...prev, isOnline: false, isOffline: true, wasOffline: true }));
            console.log('[Network] Gone offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Listen for connection changes
        const connection = (navigator as any).connection;
        if (connection) {
            connection.addEventListener('change', updateConnectionInfo);
        }

        // Initial update
        updateConnectionInfo();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (connection) {
                connection.removeEventListener('change', updateConnectionInfo);
            }
        };
    }, [updateConnectionInfo]);

    // Refresh storage info
    const refreshStorage = useCallback(async () => {
        try {
            const estimate = await getStorageEstimate();
            setStorage({
                ...estimate,
                usageFormatted: formatBytes(estimate.usage),
                quotaFormatted: formatBytes(estimate.quota),
            });
        } catch (error) {
            console.error('[Storage] Failed to get estimate:', error);
        }
    }, []);

    // Refresh cache info
    const refreshCacheInfo = useCallback(async () => {
        try {
            const [questionsMeta, bookmarksMeta, testsMeta] = await Promise.all([
                getCacheMeta(STORES.QUESTIONS),
                getCacheMeta(STORES.BOOKMARKS),
                getCacheMeta(STORES.TESTS),
            ]);

            setCacheInfo({
                questions: questionsMeta?.count || 0,
                bookmarks: bookmarksMeta?.count || 0,
                tests: testsMeta?.count || 0,
                lastSynced: questionsMeta?.lastSynced || bookmarksMeta?.lastSynced || null,
            });
        } catch (error) {
            console.error('[Cache] Failed to get cache info:', error);
        }
    }, []);

    // Request persistent storage
    const requestPersistentStorage = useCallback(async (): Promise<boolean> => {
        if (navigator.storage && navigator.storage.persist) {
            const granted = await navigator.storage.persist();
            console.log('[Storage] Persistent storage:', granted ? 'granted' : 'denied');
            return granted;
        }
        return false;
    }, []);

    // Load storage and cache info on mount
    useEffect(() => {
        refreshStorage();
        refreshCacheInfo();
    }, [refreshStorage, refreshCacheInfo]);

    // Calculate connection quality
    const connectionQuality = (() => {
        if (state.isOffline) return 'offline';

        const effectiveType = state.effectiveType;
        if (effectiveType === '4g') return 'excellent';
        if (effectiveType === '3g') return 'good';
        if (effectiveType === '2g') return 'moderate';
        if (effectiveType === 'slow-2g') return 'poor';

        // Fallback based on RTT
        const rtt = state.rtt;
        if (rtt === null) return 'good'; // Assume good if unknown
        if (rtt < 100) return 'excellent';
        if (rtt < 300) return 'good';
        if (rtt < 700) return 'moderate';
        return 'poor';
    })();

    return {
        isOnline: state.isOnline,
        isOffline: state.isOffline,
        wasOffline: state.wasOffline,
        connectionType: state.connectionType,
        connectionQuality,
        storage,
        refreshStorage,
        cacheInfo,
        refreshCacheInfo,
        requestPersistentStorage,
    };
}

// Simple hook for just online/offline status
export function useOnlineStatus(): boolean {
    const [isOnline, setIsOnline] = useState(
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

export default useOffline;
