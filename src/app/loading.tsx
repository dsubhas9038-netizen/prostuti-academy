import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
            {/* Animated Logo */}
            <div className="relative mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Loading...
                </h2>
                <p className="text-sm text-gray-500">
                    অপেক্ষা করো, content load হচ্ছে...
                </p>
            </div>

            {/* Loading bar */}
            <div className="mt-8 w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-loading-bar" />
            </div>
        </div>
    );
}
