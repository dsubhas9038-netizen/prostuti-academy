'use client';

import React from 'react';
import {
    FileQuestion,
    Search,
    BookOpen,
    ClipboardList,
    Bookmark,
    AlertCircle,
    Inbox
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type EmptyStateType =
    | 'no-results'
    | 'no-data'
    | 'no-questions'
    | 'no-tests'
    | 'no-bookmarks'
    | 'error'
    | 'custom';

interface EmptyStateProps {
    type?: EmptyStateType;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
    className?: string;
}

const defaultContent: Record<EmptyStateType, { icon: React.ReactNode; title: string; description: string }> = {
    'no-results': {
        icon: <Search className="h-12 w-12" />,
        title: 'কোনো ফলাফল পাওয়া যায়নি',
        description: 'তোমার সার্চ অনুযায়ী কিছু পাওয়া যায়নি। অন্য কিছু দিয়ে সার্চ করে দেখো।',
    },
    'no-data': {
        icon: <Inbox className="h-12 w-12" />,
        title: 'কোনো ডেটা নেই',
        description: 'এখানে এখনো কিছু নেই।',
    },
    'no-questions': {
        icon: <FileQuestion className="h-12 w-12" />,
        title: 'কোনো প্রশ্ন নেই',
        description: 'এই অধ্যায়ে এখনো কোনো প্রশ্ন যোগ করা হয়নি।',
    },
    'no-tests': {
        icon: <ClipboardList className="h-12 w-12" />,
        title: 'কোনো টেস্ট নেই',
        description: 'এখনো কোনো মক টেস্ট available নেই।',
    },
    'no-bookmarks': {
        icon: <Bookmark className="h-12 w-12" />,
        title: 'কোনো বুকমার্ক নেই',
        description: 'তুমি এখনো কোনো প্রশ্ন বুকমার্ক করোনি।',
    },
    'error': {
        icon: <AlertCircle className="h-12 w-12" />,
        title: 'কিছু ভুল হয়েছে',
        description: 'একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করো।',
    },
    'custom': {
        icon: <BookOpen className="h-12 w-12" />,
        title: '',
        description: '',
    },
};

function EmptyState({
    type = 'no-data',
    title,
    description,
    icon,
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction,
    className,
}: EmptyStateProps) {
    const defaults = defaultContent[type];

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-12 px-4 text-center',
                className
            )}
        >
            {/* Icon */}
            <div className="text-gray-400 dark:text-gray-500 mb-4">
                {icon || defaults.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title || defaults.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                {description || defaults.description}
            </p>

            {/* Actions */}
            {(actionLabel || secondaryActionLabel) && (
                <div className="flex items-center gap-3">
                    {secondaryActionLabel && (
                        <Button variant="outline" onClick={onSecondaryAction}>
                            {secondaryActionLabel}
                        </Button>
                    )}
                    {actionLabel && (
                        <Button onClick={onAction}>
                            {actionLabel}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export { EmptyState };
