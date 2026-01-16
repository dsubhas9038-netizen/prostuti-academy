'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw, X, Signal, SignalLow, SignalMedium, SignalHigh } from 'lucide-react';
import { useOffline, useOnlineStatus } from '@/hooks/useOffline';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
    className?: string;
    variant?: 'banner' | 'badge' | 'toast';
    showOnOnline?: boolean;
}

// Offline Banner - shows at top when offline
export function OfflineBanner({ className }: { className?: string }) {
    const { isOffline, wasOffline, isOnline } = useOffline();
    const [showReconnected, setShowReconnected] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Show reconnected message
    useEffect(() => {
        if (isOnline && wasOffline) {
            setShowReconnected(true);
            const timer = setTimeout(() => setShowReconnected(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOnline, wasOffline]);

    // Reset dismissed when going offline again
    useEffect(() => {
        if (isOffline) {
            setIsDismissed(false);
        }
    }, [isOffline]);

    if (isDismissed) return null;

    // Show reconnected message
    if (showReconnected) {
        return (
            <div className={cn(
                'fixed top-0 left-0 right-0 z-50 bg-green-500 text-white py-2 px-4',
                'flex items-center justify-center gap-2 text-sm font-medium',
                'animate-slide-down',
                className
            )}>
                <Wifi className="h-4 w-4" />
                <span>আবার অনলাইন! ✅</span>
            </div>
        );
    }

    // Show offline banner
    if (isOffline) {
        return (
            <div className={cn(
                'fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white py-2 px-4',
                'flex items-center justify-between gap-2 text-sm',
                'animate-slide-down',
                className
            )}>
                <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 animate-pulse" />
                    <span className="font-medium">অফলাইন মোড</span>
                    <span className="hidden sm:inline text-amber-100">- সেভ করা কনটেন্ট দেখতে পারবে</span>
                </div>
                <button
                    onClick={() => setIsDismissed(true)}
                    className="p-1 hover:bg-amber-600 rounded"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return null;
}

// Offline Badge - small indicator
export function OfflineBadge({ className }: { className?: string }) {
    const { isOffline, connectionQuality } = useOffline();

    const getIcon = () => {
        if (isOffline) return <WifiOff className="h-3 w-3" />;
        switch (connectionQuality) {
            case 'excellent': return <SignalHigh className="h-3 w-3" />;
            case 'good': return <SignalMedium className="h-3 w-3" />;
            case 'moderate': return <SignalLow className="h-3 w-3" />;
            case 'poor': return <Signal className="h-3 w-3" />;
            default: return <Wifi className="h-3 w-3" />;
        }
    };

    const getColor = () => {
        if (isOffline) return 'bg-red-500 text-white';
        switch (connectionQuality) {
            case 'excellent': return 'bg-green-500 text-white';
            case 'good': return 'bg-green-400 text-white';
            case 'moderate': return 'bg-amber-500 text-white';
            case 'poor': return 'bg-red-400 text-white';
            default: return 'bg-green-500 text-white';
        }
    };

    return (
        <div className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            getColor(),
            className
        )}>
            {getIcon()}
            <span className="hidden sm:inline">
                {isOffline ? 'Offline' : connectionQuality}
            </span>
        </div>
    );
}

// Offline Toast - popup notification
export function OfflineToast({ className }: { className?: string }) {
    const { isOffline, isOnline, wasOffline, cacheInfo } = useOffline();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOffline) {
            setIsVisible(true);
        } else if (isOnline && wasOffline) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOffline, isOnline, wasOffline]);

    if (!isVisible) return null;

    return (
        <div className={cn(
            'fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50',
            'bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700',
            'p-4 animate-slide-up',
            className
        )}>
            <div className="flex items-start gap-3">
                <div className={cn(
                    'p-2 rounded-lg',
                    isOffline ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-green-100 dark:bg-green-900/30'
                )}>
                    {isOffline ? (
                        <WifiOff className="h-5 w-5 text-amber-600" />
                    ) : (
                        <Wifi className="h-5 w-5 text-green-600" />
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                        {isOffline ? '📴 অফলাইন' : '✅ আবার অনলাইন'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {isOffline
                            ? `${cacheInfo.questions} প্রশ্ন সেভ আছে`
                            : 'ডেটা সিঙ্ক হচ্ছে...'
                        }
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

// Combined Offline Indicator
function OfflineIndicator({
    className,
    variant = 'banner',
    showOnOnline = false
}: OfflineIndicatorProps) {
    const isOnline = useOnlineStatus();

    if (isOnline && !showOnOnline) return null;

    switch (variant) {
        case 'banner':
            return <OfflineBanner className={className} />;
        case 'badge':
            return <OfflineBadge className={className} />;
        case 'toast':
            return <OfflineToast className={className} />;
        default:
            return <OfflineBanner className={className} />;
    }
}

// Storage Info Component
export function StorageInfo({ className }: { className?: string }) {
    const { storage, cacheInfo, refreshStorage, refreshCacheInfo } = useOffline();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await Promise.all([refreshStorage(), refreshCacheInfo()]);
        setIsRefreshing(false);
    };

    return (
        <div className={cn(
            'bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm',
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    💾 অফলাইন স্টোরেজ
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    isLoading={isRefreshing}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>

            {/* Storage bar */}
            {storage && (
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>{storage.usageFormatted} used</span>
                        <span>{storage.usagePercent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${Math.min(storage.usagePercent, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Cache stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {cacheInfo.questions}
                    </p>
                    <p className="text-xs text-gray-500">প্রশ্ন</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {cacheInfo.bookmarks}
                    </p>
                    <p className="text-xs text-gray-500">বুকমার্ক</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {cacheInfo.tests}
                    </p>
                    <p className="text-xs text-gray-500">টেস্ট</p>
                </div>
            </div>

            {cacheInfo.lastSynced && (
                <p className="text-xs text-gray-500 text-center mt-3">
                    Last synced: {new Date(cacheInfo.lastSynced).toLocaleString('bn-BD')}
                </p>
            )}
        </div>
    );
}

export default OfflineIndicator;
