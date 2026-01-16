'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CookieConsentProps {
    className?: string;
}

// Cookie categories
const cookieCategories = [
    {
        id: 'essential',
        name: 'Essential',
        nameBn: 'প্রয়োজনীয়',
        description: 'Required for the website to function properly',
        descriptionBn: 'ওয়েবসাইট সঠিকভাবে কাজ করার জন্য প্রয়োজনীয়',
        required: true,
        enabled: true,
    },
    {
        id: 'analytics',
        name: 'Analytics',
        nameBn: 'বিশ্লেষণ',
        description: 'Help us understand how you use the website',
        descriptionBn: 'আপনি কীভাবে ওয়েবসাইট ব্যবহার করেন তা বুঝতে সাহায্য করে',
        required: false,
        enabled: true,
    },
    {
        id: 'preferences',
        name: 'Preferences',
        nameBn: 'পছন্দ',
        description: 'Remember your settings and preferences',
        descriptionBn: 'আপনার সেটিংস এবং পছন্দ মনে রাখে',
        required: false,
        enabled: true,
    },
];

function CookieConsent({ className }: CookieConsentProps) {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState(
        cookieCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.enabled }), {} as Record<string, boolean>)
    );

    // Check if consent was already given
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Accept all cookies
    const handleAcceptAll = () => {
        const allEnabled = cookieCategories.reduce(
            (acc, cat) => ({ ...acc, [cat.id]: true }),
            {} as Record<string, boolean>
        );
        saveConsent(allEnabled);
    };

    // Accept only essential
    const handleAcceptEssential = () => {
        const essentialOnly = cookieCategories.reduce(
            (acc, cat) => ({ ...acc, [cat.id]: cat.required }),
            {} as Record<string, boolean>
        );
        saveConsent(essentialOnly);
    };

    // Save custom preferences
    const handleSavePreferences = () => {
        saveConsent(preferences);
        setShowSettings(false);
    };

    // Save to localStorage
    const saveConsent = (prefs: Record<string, boolean>) => {
        localStorage.setItem('cookieConsent', JSON.stringify({
            preferences: prefs,
            timestamp: new Date().toISOString(),
        }));
        setShowBanner(false);
    };

    // Toggle preference
    const togglePreference = (id: string) => {
        const category = cookieCategories.find(c => c.id === id);
        if (category?.required) return;
        setPreferences(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Main Banner */}
            <div
                className={cn(
                    'fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700',
                    'animate-slide-up',
                    showSettings && 'hidden',
                    className
                )}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Icon & Text */}
                        <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center shrink-0">
                                <Cookie className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    🍪 We use cookies
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    We use cookies to improve your experience. By using our site, you agree to our{' '}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowSettings(true)}
                                leftIcon={<Settings className="h-4 w-4" />}
                            >
                                Customize
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAcceptEssential}
                            >
                                Essential Only
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-indigo-500"
                                onClick={handleAcceptAll}
                                leftIcon={<Check className="h-4 w-4" />}
                            >
                                Accept All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-blue-500" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Cookie Settings
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            >
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Choose which cookies you want to allow. Essential cookies are required for the website to function.
                            </p>

                            {cookieCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {category.name}
                                            </p>
                                            {category.required && (
                                                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-gray-600 dark:text-gray-300">
                                                    Required
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {category.description}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                                        <input
                                            type="checkbox"
                                            checked={preferences[category.id]}
                                            onChange={() => togglePreference(category.id)}
                                            disabled={category.required}
                                            className="sr-only peer"
                                        />
                                        <div className={cn(
                                            'w-11 h-6 rounded-full transition-colors',
                                            'peer-checked:bg-blue-500',
                                            'bg-gray-300 dark:bg-gray-600',
                                            category.required && 'opacity-50 cursor-not-allowed',
                                            'after:content-[""] after:absolute after:top-0.5 after:left-0.5',
                                            'after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all',
                                            'peer-checked:after:translate-x-5'
                                        )} />
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-3">
                            <Button
                                variant="outline"
                                onClick={handleAcceptEssential}
                            >
                                Essential Only
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-blue-500 to-indigo-500"
                                onClick={handleSavePreferences}
                            >
                                Save Preferences
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation keyframes */}
            <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
}

export default CookieConsent;
