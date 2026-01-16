'use client';

import React from 'react';
import Link from 'next/link';
import {
    Sparkles,
    ChevronRight,
    Clock,
    Star,
    TrendingUp
} from 'lucide-react';
import { RecommendedItem } from '@/types/dashboard';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RecommendedContentProps {
    items: RecommendedItem[];
    maxItems?: number;
    showReason?: boolean;
    className?: string;
}

// Priority config
const priorityConfig = {
    high: { color: '#EF4444', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Urgent', labelBn: 'জরুরি', icon: '🔥' },
    medium: { color: '#F59E0B', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Important', labelBn: 'গুরুত্বপূর্ণ', icon: '⭐' },
    low: { color: '#22C55E', bg: 'bg-green-100 dark:bg-green-900/30', label: 'Suggested', labelBn: 'সুপারিশকৃত', icon: '💡' },
};

// Type config
const typeConfig = {
    question: { icon: '📝', color: '#3B82F6' },
    test: { icon: '🧪', color: '#8B5CF6' },
    resource: { icon: '📄', color: '#22C55E' },
    chapter: { icon: '📚', color: '#F59E0B' },
};

function RecommendedContent({
    items,
    maxItems = 3,
    showReason = true,
    className
}: RecommendedContentProps) {
    const displayedItems = items.slice(0, maxItems);

    return (
        <Card className={className}>
            <CardHeader
                title="Recommended for You"
                subtitle="তোমার জন্য সুপারিশ"
                icon={<Sparkles className="h-5 w-5 text-purple-500" />}
                action={
                    <Link href="/recommendations" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        See All <ChevronRight className="h-4 w-4" />
                    </Link>
                }
            />
            <CardBody>
                <div className="space-y-3">
                    {displayedItems.map((item, index) => {
                        const priority = priorityConfig[item.priority];
                        const type = typeConfig[item.type];

                        return (
                            <Link key={item.id} href={item.href}>
                                <div
                                    className={cn(
                                        'p-4 rounded-xl border-2 transition-all group',
                                        'hover:shadow-md hover:-translate-y-0.5',
                                        item.priority === 'high'
                                            ? 'border-red-200 dark:border-red-800 hover:border-red-400'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-400',
                                        priority.bg
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Index/Icon */}
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: `${type.color}20` }}
                                        >
                                            {type.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
                                                    {item.titleBn}
                                                </h4>
                                                <Badge
                                                    size="sm"
                                                    style={{ backgroundColor: `${priority.color}20`, color: priority.color }}
                                                >
                                                    {priority.icon} {priority.labelBn}
                                                </Badge>
                                            </div>

                                            {item.descriptionBn && (
                                                <p className="text-xs text-gray-500 mb-2">
                                                    {item.descriptionBn}
                                                </p>
                                            )}

                                            {/* Reason */}
                                            {showReason && (
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    <TrendingUp className="h-3 w-3" />
                                                    <span>{item.reasonBn}</span>
                                                </div>
                                            )}

                                            {/* Metadata */}
                                            {item.metadata?.duration && (
                                                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{item.metadata.duration} mins</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {displayedItems.length === 0 && (
                    <div className="text-center py-8">
                        <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">কোনো সুপারিশ নেই</p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default RecommendedContent;
