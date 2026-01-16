'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
    showAfter?: number;
    className?: string;
}

function ScrollToTop({ showAfter = 300, className }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > showAfter);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                'fixed bottom-20 lg:bottom-8 right-4 z-40',
                'p-3 rounded-full shadow-lg',
                'bg-blue-600 text-white',
                'hover:bg-blue-700 hover:scale-110',
                'transition-all duration-300',
                'animate-fade-in',
                className
            )}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}

export default ScrollToTop;
