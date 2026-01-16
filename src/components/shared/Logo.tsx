'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
}

const sizeConfig = {
    sm: {
        icon: 'h-6 w-6',
        text: 'text-lg',
        slogan: 'text-[10px]',
    },
    md: {
        icon: 'h-8 w-8',
        text: 'text-xl',
        slogan: 'text-xs',
    },
    lg: {
        icon: 'h-10 w-10',
        text: 'text-2xl',
        slogan: 'text-sm',
    },
};

function Logo({ size = 'md', showText = true, className }: LogoProps) {
    const config = sizeConfig[size];

    return (
        <Link href="/" className={cn('flex items-center gap-2 group', className)}>
            {/* Icon */}
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative bg-blue-600 text-white p-2 rounded-xl">
                    <GraduationCap className={config.icon} />
                </div>
            </div>

            {/* Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={cn('font-bold text-gray-900 dark:text-white leading-tight', config.text)}>
                        Prostuti<span className="text-blue-600">Academy</span>
                    </span>
                    <span className={cn('text-gray-500 dark:text-gray-400 font-bengali leading-tight', config.slogan)}>
                        তোমার EXAM আমাদের প্রস্তুতি
                    </span>
                </div>
            )}
        </Link>
    );
}

export default Logo;
