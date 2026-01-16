'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import { QuickLink } from '@/types/dashboard';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuickLinksProps {
    links: QuickLink[];
    variant?: 'default' | 'compact' | 'grid';
    className?: string;
}

function QuickLinks({ links, variant = 'default', className }: QuickLinksProps) {

    // Compact variant (horizontal)
    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-2 overflow-x-auto pb-2', className)}>
                {links.map((link) => (
                    <Link key={link.id} href={link.href}>
                        <div
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap',
                                'bg-white dark:bg-gray-800 shadow-sm',
                                'hover:shadow-md hover:-translate-y-0.5 transition-all'
                            )}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {link.labelBn}
                            </span>
                            {link.count !== undefined && (
                                <Badge size="sm" style={{ backgroundColor: `${link.color}20`, color: link.color }}>
                                    {link.count}
                                </Badge>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

    // Grid variant
    if (variant === 'grid') {
        return (
            <div className={cn('grid grid-cols-3 md:grid-cols-6 gap-3', className)}>
                {links.map((link) => (
                    <Link key={link.id} href={link.href}>
                        <div
                            className={cn(
                                'p-4 rounded-xl text-center',
                                'bg-white dark:bg-gray-800 shadow-sm',
                                'hover:shadow-md hover:-translate-y-1 transition-all',
                                'group'
                            )}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-2xl transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${link.color}20` }}
                            >
                                {link.icon}
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {link.labelBn}
                            </h4>
                            {link.count !== undefined && (
                                <p className="text-xs text-gray-500 mt-1">{link.count}+</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

    // Default variant (card with list)
    return (
        <Card className={className}>
            <CardHeader
                title="Quick Links"
                subtitle="দ্রুত এক্সেস"
                icon={<Zap className="h-5 w-5 text-yellow-500" />}
            />
            <CardBody>
                <div className="space-y-2">
                    {links.map((link) => (
                        <Link key={link.id} href={link.href}>
                            <div
                                className={cn(
                                    'flex items-center gap-3 p-3 rounded-xl',
                                    'hover:bg-gray-50 dark:hover:bg-gray-800',
                                    'transition-colors group'
                                )}
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${link.color}20` }}
                                >
                                    {link.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
                                        {link.labelBn}
                                    </h4>
                                    {link.count !== undefined && (
                                        <p className="text-xs text-gray-500">{link.count} available</p>
                                    )}
                                </div>

                                {/* Arrow */}
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

export default QuickLinks;
