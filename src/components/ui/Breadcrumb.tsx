'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
    label: string;
    labelBn?: string;
    href?: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    showHome?: boolean;
    separator?: React.ReactNode;
    className?: string;
}

function Breadcrumb({
    items,
    showHome = true,
    separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
    className,
}: BreadcrumbProps) {
    const allItems: BreadcrumbItem[] = showHome
        ? [{ label: 'Home', labelBn: 'হোম', href: '/', icon: <Home className="h-4 w-4" /> }, ...items]
        : items;

    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
            <ol className="flex items-center flex-wrap gap-1">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-1">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-1.5 text-sm',
                                        'text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors',
                                        'hover:underline underline-offset-4'
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ) : (
                                <span
                                    className={cn(
                                        'flex items-center gap-1.5 text-sm',
                                        isLast ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'
                                    )}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </span>
                            )}

                            {!isLast && (
                                <span className="mx-1" aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export { Breadcrumb };
export type { BreadcrumbProps };
