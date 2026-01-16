'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SocialDividerProps {
    text?: string;
    className?: string;
}

function SocialDivider({
    text = 'অথবা',
    className
}: SocialDividerProps) {
    return (
        <div className={cn('relative flex items-center py-4', className)}>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
            <span className="flex-shrink mx-4 text-sm text-gray-500">
                {text}
            </span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        </div>
    );
}

export default SocialDivider;
