'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mobileNavLinks } from '@/lib/utils/navigation';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavProps {
    className?: string;
}

function MobileNav({ className }: MobileNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Check if link is active
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    // Handle protected route clicks
    const handleClick = (link: typeof mobileNavLinks[0], e: React.MouseEvent) => {
        if (link.requiresAuth && !isAuthenticated) {
            e.preventDefault();
            router.push('/login');
        }
    };

    // Don't show on certain pages (like test taking page)
    const hideOnPaths = ['/mock-tests/[testId]'];
    const shouldHide = hideOnPaths.some(path => {
        const regex = new RegExp(path.replace('[testId]', '[^/]+'));
        return regex.test(pathname);
    });

    if (shouldHide) return null;

    return (
        <>
            {/* Bottom Navigation */}
            <nav
                className={cn(
                    'fixed bottom-0 left-0 right-0 z-40',
                    'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg',
                    'border-t border-gray-200 dark:border-gray-800',
                    'lg:hidden', // Hide on desktop
                    'safe-area-bottom', // For notched phones
                    className
                )}
            >
                <div className="flex items-center justify-around h-16 px-2">
                    {mobileNavLinks.map((link) => {
                        const isActive = isActiveLink(link.href);
                        const Icon = link.icon;

                        // If requires auth and not authenticated, show login icon
                        if (link.requiresAuth && !isAuthenticated) {
                            return (
                                <Link
                                    key={link.href}
                                    href="/login"
                                    className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors"
                                >
                                    <LogIn className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] font-medium text-gray-400">
                                        Login
                                    </span>
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(link, e)}
                                className={cn(
                                    'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg',
                                    'transition-all duration-200',
                                    'min-w-[60px]',
                                    isActive
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                )}
                            >
                                {/* Icon with active indicator */}
                                <div className="relative">
                                    <Icon
                                        className={cn(
                                            'h-5 w-5 transition-transform',
                                            isActive && 'scale-110'
                                        )}
                                    />
                                    {isActive && (
                                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                                    )}
                                </div>

                                {/* Label */}
                                <span
                                    className={cn(
                                        'text-[10px] font-medium',
                                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                                    )}
                                >
                                    {link.labelBn}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Spacer for fixed bottom nav */}
            <div className="h-16 lg:hidden" />
        </>
    );
}

export default MobileNav;
