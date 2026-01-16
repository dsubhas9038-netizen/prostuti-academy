'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarProps {
    src?: string | null;
    alt?: string;
    name?: string;
    fallback?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    onClick?: () => void;
}

const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
};

const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getColorFromName(name: string): string {
    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-amber-500',
        'bg-yellow-500',
        'bg-lime-500',
        'bg-green-500',
        'bg-emerald-500',
        'bg-teal-500',
        'bg-cyan-500',
        'bg-sky-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-violet-500',
        'bg-purple-500',
        'bg-fuchsia-500',
        'bg-pink-500',
        'bg-rose-500',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
}

function Avatar({
    src,
    alt,
    name,
    fallback,
    size = 'md',
    className,
    onClick,
}: AvatarProps) {
    const [imageError, setImageError] = useState(false);

    const displayName = name || fallback;
    const showImage = src && !imageError;
    const showInitials = !showImage && displayName;
    const showFallback = !showImage && !showInitials;

    return (
        <div
            className={cn(
                'relative inline-flex items-center justify-center rounded-full overflow-hidden',
                'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium',
                sizeClasses[size],
                showInitials && displayName && getColorFromName(displayName),
                showInitials && 'text-white',
                onClick && 'cursor-pointer hover:opacity-90 transition-opacity',
                className
            )}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
        >
            {showImage && (
                <img
                    src={src}
                    alt={alt || displayName || 'Avatar'}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                />
            )}

            {showInitials && displayName && (
                <span>{getInitials(displayName)}</span>
            )}

            {showFallback && (
                <User className={cn('text-gray-400', iconSizes[size])} />
            )}
        </div>
    );
}

// Avatar Group Component
interface AvatarGroupProps {
    avatars: Array<{ src?: string; name?: string }>;
    max?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
}

function AvatarGroup({
    avatars,
    max = 4,
    size = 'md',
    className,
}: AvatarGroupProps) {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
        <div className={cn('flex -space-x-2', className)}>
            {visibleAvatars.map((avatar, index) => (
                <Avatar
                    key={index}
                    src={avatar.src}
                    name={avatar.name}
                    size={size}
                    className="ring-2 ring-white dark:ring-gray-900"
                />
            ))}

            {remainingCount > 0 && (
                <div
                    className={cn(
                        'inline-flex items-center justify-center rounded-full',
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium',
                        'ring-2 ring-white dark:ring-gray-900',
                        sizeClasses[size]
                    )}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
}

export { Avatar, AvatarGroup };
