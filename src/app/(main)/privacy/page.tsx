'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ChevronDown, ChevronUp, Printer, ArrowLeft, Globe, Lock, CheckCircle } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { privacyPolicySections, companyInfo, legalDates } from '@/data/legalContent';
import { cn } from '@/lib/utils';

export default function PrivacyPage() {
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
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-10 w-10" />
                                <h1 className="text-3xl sm:text-4xl font-bold">
                                    {language === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}
                                </h1>
                            </div>
                            <p className="text-green-200">
                                {language === 'en'
                                    ? 'Your privacy is important to us'
                                    : 'আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ'
                                }
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
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm font-medium">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">Data Protected</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">GDPR Aware</span>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Badge size="lg" className="bg-green-100 text-green-700">
                        {language === 'en'
                            ? `Last Updated: ${legalDates.privacyLastUpdated}`
                            : `সর্বশেষ আপডেট: ${legalDates.privacyLastUpdatedBn}`
                        }
                    </Badge>
                    <Badge size="sm" className="bg-blue-100 text-blue-700">
                        Version 1.0
                    </Badge>
                </div>

                {/* Summary Box */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-8 border border-green-200 dark:border-green-800">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                        🔒 {language === 'en' ? 'Privacy at a Glance' : 'গোপনীয়তা সংক্ষেপে'}
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{language === 'en'
                                ? 'We only collect information necessary for the service'
                                : 'আমরা শুধুমাত্র সেবার জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি'
                            }</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{language === 'en'
                                ? 'We NEVER sell your personal data'
                                : 'আমরা কখনই আপনার ব্যক্তিগত ডেটা বিক্রি করি না'
                            }</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{language === 'en'
                                ? 'You can request data deletion anytime'
                                : 'আপনি যেকোনো সময় ডেটা মুছে ফেলার অনুরোধ করতে পারেন'
                            }</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{language === 'en'
                                ? 'All data is encrypted and securely stored'
                                : 'সমস্ত ডেটা এনক্রিপ্টেড এবং নিরাপদে সংরক্ষিত'
                            }</span>
                        </li>
                    </ul>
                </div>

                {/* Table of Contents */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                        {language === 'en' ? '📋 Table of Contents' : '📋 সূচিপত্র'}
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-2">
                        {privacyPolicySections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-green-600 hover:text-green-800 hover:underline text-sm"
                                >
                                    {language === 'en' ? section.title : section.titleBn}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-4">
                    {privacyPolicySections.map((section) => (
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

                {/* Expand All */}
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setExpandedSection(expandedSection ? null : 'all')}
                    >
                        {expandedSection ? 'Collapse All' : 'Expand All Sections'}
                    </Button>
                </div>

                {/* Your Rights */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                        🛡️ {language === 'en' ? 'Your Data Rights' : 'আপনার ডেটা অধিকার'}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: '📥', title: 'Access', titleBn: 'অ্যাক্সেস', desc: 'Request a copy of your data', descBn: 'আপনার ডেটার কপি অনুরোধ করুন' },
                            { icon: '✏️', title: 'Correct', titleBn: 'সংশোধন', desc: 'Update your information', descBn: 'আপনার তথ্য আপডেট করুন' },
                            { icon: '🗑️', title: 'Delete', titleBn: 'মুছুন', desc: 'Request account deletion', descBn: 'অ্যাকাউন্ট মুছে ফেলার অনুরোধ' },
                            { icon: '📤', title: 'Export', titleBn: 'এক্সপোর্ট', desc: 'Download your data', descBn: 'আপনার ডেটা ডাউনলোড করুন' },
                        ].map((right, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-2xl">{right.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {language === 'en' ? right.title : right.titleBn}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {language === 'en' ? right.desc : right.descBn}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        {language === 'en'
                            ? 'Contact privacy@prostutiacademy.com to exercise these rights'
                            : 'এই অধিকার প্রয়োগ করতে privacy@prostutiacademy.com এ যোগাযোগ করুন'
                        }
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {language === 'en'
                                ? 'Questions about our privacy practices?'
                                : 'আমাদের গোপনীয়তা অনুশীলন সম্পর্কে প্রশ্ন আছে?'
                            }
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/terms">
                                <Button variant="outline">
                                    {language === 'en' ? 'Terms of Service' : 'সেবার শর্তাবলী'}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    {language === 'en' ? 'Contact Privacy Team' : 'প্রাইভেসি টিমে যোগাযোগ'}
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
