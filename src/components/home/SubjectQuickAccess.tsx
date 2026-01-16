'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ARTS_SUBJECTS } from '@/lib/utils/constants';
import { Button } from '@/components/ui';

function SubjectQuickAccess() {
    // Stream data
    const streams = [
        {
            id: 'arts',
            name: 'Arts',
            nameBn: 'কলা বিভাগ',
            icon: '📚',
            isAvailable: true,
            subjects: ARTS_SUBJECTS,
        },
        {
            id: 'commerce',
            name: 'Commerce',
            nameBn: 'বাণিজ্য বিভাগ',
            icon: '💼',
            isAvailable: false,
            comingSoon: true,
        },
        {
            id: 'science',
            name: 'Science',
            nameBn: 'বিজ্ঞান বিভাগ',
            icon: '🔬',
            isAvailable: false,
            comingSoon: true,
        },
    ];

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        তোমার <span className="text-blue-600">Stream</span> বেছে নাও
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        প্রথমে Arts বিভাগ দিয়ে শুরু করেছি। Commerce এবং Science শীঘ্রই আসছে!
                    </p>
                </div>

                {/* Stream Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {streams.map((stream) => (
                        <div
                            key={stream.id}
                            className={cn(
                                'relative bg-white dark:bg-gray-800 border rounded-2xl p-6 text-center',
                                'transition-all duration-300',
                                stream.isAvailable
                                    ? 'border-blue-500/30 hover:shadow-lg hover:border-blue-500 cursor-pointer'
                                    : 'border-gray-200 dark:border-gray-700 opacity-70'
                            )}
                        >
                            {/* Coming Soon Badge */}
                            {stream.comingSoon && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                                    Coming Soon
                                </div>
                            )}

                            {/* Icon */}
                            <div className="text-5xl mb-4">{stream.icon}</div>

                            {/* Name */}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                {stream.name}
                            </h3>
                            <p className="text-sm text-gray-500 font-bengali mb-4">
                                {stream.nameBn}
                            </p>

                            {/* Action */}
                            {stream.isAvailable ? (
                                <Link href="/subjects">
                                    <Button size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                        Explore
                                    </Button>
                                </Link>
                            ) : (
                                <Button size="sm" variant="secondary" disabled leftIcon={<Lock className="h-4 w-4" />}>
                                    Locked
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Arts Subjects Grid */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📚 Arts Subjects
                        </h3>
                        <Link
                            href="/subjects"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {ARTS_SUBJECTS.map((subject) => (
                            <Link
                                key={subject.id}
                                href={`/subjects/${subject.id}`}
                                className={cn(
                                    'flex flex-col items-center p-4 rounded-xl',
                                    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                                    'hover:border-blue-500/50 hover:shadow-md transition-all',
                                    'group'
                                )}
                            >
                                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                    {subject.icon}
                                </span>
                                <span className="text-xs font-medium text-gray-900 dark:text-white text-center">
                                    {subject.name}
                                </span>
                                <span className="text-[10px] text-gray-500 text-center font-bengali">
                                    {subject.nameBn}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SubjectQuickAccess;
