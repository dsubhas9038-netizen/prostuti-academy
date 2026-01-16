'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OfflinePage() {
    const [isOnline, setIsOnline] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        // Check online status
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    // If back online, redirect to home
    useEffect(() => {
        if (isOnline) {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOnline]);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            await fetch('/', { method: 'HEAD' });
            window.location.reload();
        } catch {
            setIsRetrying(false);
        }
    };

    if (isOnline) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <WifiOff className="h-10 w-10 text-green-600 animate-pulse" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        আবার অনলাইন! 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        পেজ রিডাইরেক্ট হচ্ছে...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                        ProstutiAcademy
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    {/* Offline Icon */}
                    <div className="relative mb-8">
                        <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <WifiOff className="h-16 w-16 text-gray-400" />
                        </div>
                        {/* Animated rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-ping opacity-30" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        📴 অফলাইন মোড
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        ইন্টারনেট সংযোগ নেই। তোমার ডিভাইসে সেভ করা কনটেন্ট দেখতে পারো
                        অথবা ইন্টারনেট ফিরে এলে আবার চেষ্টা করো।
                    </p>

                    {/* Retry Button */}
                    <Button
                        onClick={handleRetry}
                        isLoading={isRetrying}
                        loadingText="চেষ্টা করছি..."
                        size="lg"
                        className="w-full mb-4"
                        leftIcon={<RefreshCw className="h-5 w-5" />}
                    >
                        আবার চেষ্টা করো
                    </Button>

                    {/* Cached Content Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 mb-6 shadow-sm">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-3 text-left">
                            💾 অফলাইনে যা দেখতে পারবে:
                        </h2>
                        <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>আগে দেখেছো এমন প্রশ্ন</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>সেভ করা PDF রিসোর্স</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>তোমার প্রগ্রেস ডেটা</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-amber-500">⏳</span>
                                <span>অনলাইন হলে সিঙ্ক হবে</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-left">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                            💡 <strong>টিপ:</strong> ইন্টারনেট থাকা অবস্থায় যত বেশি কনটেন্ট
                            ব্রাউজ করবে, অফলাইনে তত বেশি দেখতে পারবে!
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 text-center border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} ProstutiAcademy
                </p>
            </footer>
        </div>
    );
}
