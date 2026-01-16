'use client';

import React from 'react';
import Link from 'next/link';
import {
    Facebook,
    Youtube,
    Send,
    Mail,
    Phone,
    MapPin,
    Heart,
    ExternalLink,
    GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import { APP_NAME, ARTS_SUBJECTS } from '@/lib/utils/constants';

interface FooterProps {
    className?: string;
}

// Footer link groups
const quickLinks = [
    { label: 'Home', labelBn: 'হোম', href: '/' },
    { label: 'Subjects', labelBn: 'বিষয়সমূহ', href: '/subjects' },
    { label: 'Mock Tests', labelBn: 'মক টেস্ট', href: '/mock-tests' },
    { label: 'Resources', labelBn: 'রিসোর্স', href: '/resources' },
    { label: 'PYQ Analysis', labelBn: 'বিগত বছরের প্রশ্ন', href: '/pyq-analysis' },
];

const supportLinks = [
    { label: 'About Us', labelBn: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'Contact', labelBn: 'যোগাযোগ', href: '/contact' },
    { label: 'FAQ', labelBn: 'সাধারণ প্রশ্ন', href: '/faq' },
    { label: 'Privacy Policy', labelBn: 'গোপনীয়তা নীতি', href: '/privacy' },
    { label: 'Terms of Service', labelBn: 'সেবার শর্তাবলী', href: '/terms' },
];

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://facebook.com/prostutiacademy',
        icon: Facebook,
        color: 'hover:text-blue-500'
    },
    {
        label: 'YouTube',
        href: 'https://youtube.com/@prostutiacademy',
        icon: Youtube,
        color: 'hover:text-red-500'
    },
    {
        label: 'Telegram',
        href: 'https://t.me/prostutiacademy',
        icon: Send,
        color: 'hover:text-sky-500'
    },
];

function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn('bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800', className)}>
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Column 1: Logo & Description */}
                    <div className="lg:col-span-1">
                        <Logo size="md" className="mb-4" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                            West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি।
                            Exam-oriented questions, mock tests, এবং PYQ analysis
                            সম্পূর্ণ ফ্রি!
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500',
                                        'transition-all duration-200 hover:scale-110',
                                        social.color
                                    )}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                                    >
                                        {link.label}
                                        <span className="text-xs opacity-70">({link.labelBn})</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Subjects */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Popular Subjects
                        </h3>
                        <ul className="space-y-3">
                            {ARTS_SUBJECTS.slice(0, 6).map((subject) => (
                                <li key={subject.id}>
                                    <Link
                                        href={`/subjects/${subject.id}`}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                                    >
                                        <span>{subject.icon}</span>
                                        <span>{subject.name}</span>
                                        <span className="text-xs opacity-70">({subject.nameBn})</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Support & Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3 mb-6">
                            {supportLinks.slice(0, 4).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            <a
                                href="mailto:support@prostutiacademy.com"
                                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                <span>support@prostutiacademy.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
                            © {currentYear} {APP_NAME}. All rights reserved.
                        </p>

                        {/* Made with love */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for WB HS Students
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/privacy"
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
