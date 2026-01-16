'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, ChevronDown, ChevronUp, Printer, ArrowLeft, Globe } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { termsOfServiceSections, companyInfo, legalDates } from '@/data/legalContent';
import { cn } from '@/lib/utils';

export default function TermsPage() {
    const [language, setLanguage] = useState<'en' | 'bn'>('en');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FileText className="h-10 w-10" />
                                <h1 className="text-3xl sm:text-4xl font-bold">
                                    {language === 'en' ? 'Terms of Service' : 'সেবার শর্তাবলী'}
                                </h1>
                            </div>
                            <p className="text-blue-200">
                                {companyInfo.name} - {companyInfo.tagline}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/10"
                                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                                leftIcon={<Globe className="h-4 w-4" />}
                            >
                                {language === 'en' ? 'বাংলা' : 'English'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/10 hidden sm:flex"
                                onClick={handlePrint}
                                leftIcon={<Printer className="h-4 w-4" />}
                            >
                                Print
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Last Updated */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Badge size="lg" className="bg-blue-100 text-blue-700">
                        {language === 'en'
                            ? `Last Updated: ${legalDates.termsLastUpdated}`
                            : `সর্বশেষ আপডেট: ${legalDates.termsLastUpdatedBn}`
                        }
                    </Badge>
                    <Badge size="sm" className="bg-green-100 text-green-700">
                        Effective Immediately
                    </Badge>
                </div>

                {/* Table of Contents */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                        {language === 'en' ? '📋 Table of Contents' : '📋 সূচিপত্র'}
                    </h2>
                    <ul className="space-y-2">
                        {termsOfServiceSections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                                >
                                    {language === 'en' ? section.title : section.titleBn}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-4">
                    {termsOfServiceSections.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                        >
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {language === 'en' ? section.title : section.titleBn}
                                </h3>
                                {expandedSection === section.id ? (
                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                            </button>

                            {expandedSection === section.id && (
                                <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700">
                                    <div className="pt-4 prose prose-sm dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {language === 'en' ? section.content : section.contentBn}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Expand All Button */}
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setExpandedSection(expandedSection ? null : 'all')}
                    >
                        {expandedSection ? 'Collapse All' : 'Expand All Sections'}
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {language === 'en'
                                ? 'By using ProstutiAcademy, you agree to these Terms of Service.'
                                : 'প্রস্তুতি একাডেমি ব্যবহার করে, আপনি এই সেবার শর্তাবলীতে সম্মত হচ্ছেন।'
                            }
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/privacy">
                                <Button variant="outline">
                                    {language === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button>
                                    {language === 'en' ? 'Contact Us' : 'যোগাযোগ করুন'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center text-sm text-gray-500 mt-8">
                    © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
                </p>
            </div>
        </div>
    );
}
