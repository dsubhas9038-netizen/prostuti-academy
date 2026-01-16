'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Megaphone, ArrowRight, AlertTriangle, Info, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type BannerType = 'info' | 'warning' | 'success' | 'promo';

interface AnnouncementBannerProps {
    id: string;
    message: string;
    type?: BannerType;
    link?: {
        text: string;
        href: string;
    };
    dismissible?: boolean;
    expiresAt?: Date;
    className?: string;
}

const bannerStyles: Record<BannerType, { bg: string; icon: React.ElementType }> = {
    info: { bg: 'bg-blue-500', icon: Info },
    warning: { bg: 'bg-yellow-500', icon: AlertTriangle },
    success: { bg: 'bg-green-500', icon: PartyPopper },
    promo: { bg: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: Megaphone },
};

function AnnouncementBanner({
    id,
    message,
    type = 'info',
    link,
    dismissible = true,
    expiresAt,
    className,
}: AnnouncementBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    // Check localStorage for dismissed state
    useEffect(() => {
        const dismissed = localStorage.getItem(`banner-dismissed-${id}`);
        if (dismissed) {
            setIsVisible(false);
        }

        // Check expiry
        if (expiresAt && new Date() > expiresAt) {
            setIsVisible(false);
        }
    }, [id, expiresAt]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(`banner-dismissed-${id}`, 'true');
    };

    if (!isVisible) return null;

    const { bg, icon: Icon } = bannerStyles[type];

    return (
        <div className={cn('relative', bg, 'text-white', className)}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-3 py-2.5 text-sm">
                    <Icon className="h-4 w-4 flex-shrink-0" />

                    <p className="text-center">
                        {message}
                        {link && (
                            <Link
                                href={link.href}
                                className="inline-flex items-center gap-1 ml-2 font-medium underline underline-offset-2 hover:no-underline"
                            >
                                {link.text}
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        )}
                    </p>

                    {dismissible && (
                        <button
                            onClick={handleDismiss}
                            className="absolute right-4 p-1 rounded hover:bg-white/20 transition-colors"
                            aria-label="Dismiss announcement"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnnouncementBanner;
