'use client';

import React from 'react';
import {
    FileQuestion,
    BarChart3,
    ClipboardCheck,
    BookOpen,
    Timer,
    Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: FileQuestion,
        title: 'SmartAnswer System',
        titleBn: 'স্মার্ট উত্তর সিস্টেম',
        description: 'উত্তর দেখার আগে নিজে চেষ্টা করো। Key points চেকলিস্ট এবং examiner tips সহ।',
        color: 'bg-blue-500',
        lightColor: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: '#3B82F6',
    },
    {
        icon: BarChart3,
        title: 'PYQ Analysis',
        titleBn: 'বিগত বছরের প্রশ্ন বিশ্লেষণ',
        description: 'গত ১০ বছরের প্রশ্নপত্র বিশ্লেষণ। কোন chapter থেকে কত marks আসে জানো।',
        color: 'bg-purple-500',
        lightColor: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: '#A855F7',
    },
    {
        icon: ClipboardCheck,
        title: 'Word Count Guide',
        titleBn: 'শব্দ সংখ্যা গাইড',
        description: '2 marks এ কত লিখবে? 5 marks এ? প্রতিটা প্রশ্নে exact word count দেওয়া আছে।',
        color: 'bg-green-500',
        lightColor: 'bg-green-100 dark:bg-green-900/30',
        iconColor: '#22C55E',
    },
    {
        icon: BookOpen,
        title: 'Semester Wise',
        titleBn: 'সেমিস্টার অনুযায়ী',
        description: 'নতুন semester system অনুযায়ী সম্পূর্ণ organized content।',
        color: 'bg-orange-500',
        lightColor: 'bg-orange-100 dark:bg-orange-900/30',
        iconColor: '#F97316',
    },
    {
        icon: Timer,
        title: 'Mock Tests',
        titleBn: 'মক টেস্ট',
        description: 'Real exam এর মতো টাইমার সহ practice করো। Instant result এবং analysis পাও।',
        color: 'bg-pink-500',
        lightColor: 'bg-pink-100 dark:bg-pink-900/30',
        iconColor: '#EC4899',
    },
    {
        icon: Target,
        title: 'Exam Focused',
        titleBn: 'পরীক্ষা কেন্দ্রিক',
        description: 'শুধুমাত্র exam-oriented content। যা পরীক্ষায় আসে তাই পড়ো।',
        color: 'bg-cyan-500',
        lightColor: 'bg-cyan-100 dark:bg-cyan-900/30',
        iconColor: '#06B6D4',
    },
];

function FeaturesSection() {
    return (
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        কেন <span className="text-blue-600">ProstutiAcademy</span>?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        আমরা শুধু questions দিই না, আমরা exam crack করতে শেখাই।
                        প্রতিটা feature তোমার success এর জন্য designed।
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                'group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6',
                                'hover:shadow-lg hover:border-blue-500/30 transition-all duration-300',
                                'hover:-translate-y-1'
                            )}
                        >
                            {/* Icon */}
                            <div className={cn(
                                'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                                feature.lightColor
                            )}>
                                <feature.icon
                                    className="h-6 w-6"
                                    style={{ color: feature.iconColor }}
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-blue-600 mb-2 font-bengali">
                                {feature.titleBn}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover decoration */}
                            <div className={cn(
                                'absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity',
                                feature.color,
                                'rounded-bl-full'
                            )} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
