'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavLinks } from '@/lib/utils/navigation';
import Logo from '@/components/shared/Logo';
import SearchBar from '@/components/shared/SearchBar';
import ThemeToggle from '@/components/shared/ThemeToggle';
import UserMenu from './UserMenu';

interface HeaderProps {
    className?: string;
}

function Header({ className }: HeaderProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Track scroll for header style changes
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Check if link is active
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Header */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-40',
                    'transition-all duration-300',
                    isScrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm'
                        : 'bg-white dark:bg-gray-900',
                    className
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo + Desktop Nav */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Logo size="md" />

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {mainNavLinks
                                    .filter((link) => !link.mobileOnly)
                                    .map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                                                'transition-colors duration-200',
                                                isActiveLink(link.href)
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                            )}
                                        >
                                            <link.icon className="h-4 w-4" />
                                            <span>{link.label}</span>
                                        </Link>
                                    ))}
                            </nav>
                        </div>

                        {/* Right: Search, Theme, User */}
                        <div className="flex items-center gap-2">
                            {/* Desktop Search */}
                            <div className="hidden md:block">
                                <SearchBar variant="header" />
                            </div>

                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Search className="h-5 w-5 text-gray-500" />
                            </button>

                            {/* Theme Toggle */}
                            <ThemeToggle variant="dropdown" />

                            {/* User Menu */}
                            <UserMenu />

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5 text-gray-900 dark:text-white" />
                                ) : (
                                    <Menu className="h-5 w-5 text-gray-900 dark:text-white" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar (expandable) */}
                    {isSearchOpen && (
                        <div className="md:hidden pb-4 animate-slide-down">
                            <SearchBar variant="default" autoFocus />
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden animate-fade-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                className={cn(
                    'fixed top-16 left-0 right-0 bottom-0 z-30',
                    'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
                    'lg:hidden',
                    'transition-transform duration-300 ease-in-out',
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <nav className="container mx-auto px-4 py-6">
                    <div className="space-y-2">
                        {mainNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium',
                                    'transition-colors duration-200',
                                    isActiveLink(link.href)
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                <span>{link.label}</span>
                                <span className="text-gray-500 text-sm">({link.labelBn})</span>
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

                    {/* Additional Mobile Links */}
                    <div className="space-y-2">
                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
}

export default Header;
