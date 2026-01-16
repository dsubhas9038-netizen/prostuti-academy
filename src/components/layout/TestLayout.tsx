'use client';

import React from 'react';
import Link from 'next/link';
import { X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import { Button, Modal } from '@/components/ui';

interface TestLayoutProps {
    children: React.ReactNode;
    testTitle?: string;
    onExit?: () => void;
    showExitConfirm?: boolean;
    className?: string;
}

function TestLayout({
    children,
    testTitle = 'Mock Test',
    onExit,
    showExitConfirm = true,
    className,
}: TestLayoutProps) {
    const [isExitModalOpen, setIsExitModalOpen] = React.useState(false);

    const handleExitClick = () => {
        if (showExitConfirm) {
            setIsExitModalOpen(true);
        } else {
            onExit?.();
        }
    };

    const handleConfirmExit = () => {
        setIsExitModalOpen(false);
        onExit?.();
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            {/* Minimal Header */}
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo (small) */}
                        <Logo size="sm" showText={false} />

                        {/* Test Title */}
                        <h1 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                            {testTitle}
                        </h1>

                        {/* Exit Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleExitClick}
                            leftIcon={<X className="h-4 w-4" />}
                        >
                            <span className="hidden sm:inline">Exit Test</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={cn('flex-1', className)}>
                {children}
            </main>

            {/* Exit Confirmation Modal */}
            <Modal
                isOpen={isExitModalOpen}
                onClose={() => setIsExitModalOpen(false)}
                title="Exit Test?"
                size="sm"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-gray-900 dark:text-white mb-2">
                            তুমি কি সত্যিই পরীক্ষা থেকে বের হতে চাও?
                        </p>
                        <p className="text-sm text-gray-500">
                            তোমার এখনও পর্যন্ত দেওয়া উত্তরগুলো সংরক্ষিত থাকবে না।
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setIsExitModalOpen(false)}
                    >
                        চালিয়ে যাও
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirmExit}
                    >
                        বের হও
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default TestLayout;
