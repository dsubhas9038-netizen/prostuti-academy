'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

function HeroSection() {
    const stats = [
        { value: '10,000+', label: 'Questions', labelBn: 'প্রশ্ন' },
        { value: '500+', label: 'Mock Tests', labelBn: 'মক টেস্ট' },
        { value: '50,000+', label: 'Students', labelBn: 'শিক্ষার্থী' },
    ];

    const features = [
        'Exam-oriented questions',
        'বাংলা ও English দুই ভাষায়',
        'Previous Year Analysis',
        '100% Free',
    ];

    return (
        <section className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl" />

            <div className="container mx-auto px-4 py-12 lg:py-20 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium">WB HS 2025 Ready</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            তোমার{' '}
                            <span className="text-blue-600 relative">
                                EXAM
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30"
                                    viewBox="0 0 100 12"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0,6 Q25,0 50,6 T100,6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <br />
                            আমাদের প্রস্তুতি
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0">
                            West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি নাও।
                            Exam-oriented questions, smart analysis, এবং mock tests -
                            সম্পূর্ণ ফ্রি!
                        </p>

                        {/* Feature List */}
                        <ul className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 mb-8">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                            <Link href="/subjects">
                                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                                    শুরু করো - ফ্রি
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" leftIcon={<Play className="h-5 w-5" />}>
                                    কীভাবে কাজ করে দেখো
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stat.labelBn}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Illustration/Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10">
                            {/* Placeholder for illustration - can be replaced with actual image */}
                            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-3xl p-8 aspect-square flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">📚</div>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        HS Arts
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Semester 1 - 4
                                    </p>

                                    {/* Floating Cards */}
                                    <div className="absolute top-10 -left-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg animate-float">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📕</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Bengali</p>
                                                <p className="text-xs text-gray-500">120+ Questions</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-20 -right-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg animate-float-delayed">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📘</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">History</p>
                                                <p className="text-xs text-gray-500">85+ Questions</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-1/2 -right-16 bg-green-500 text-white rounded-xl p-3 shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5" />
                                            <span className="text-sm font-medium">100% Free</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
