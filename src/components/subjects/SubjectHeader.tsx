'use client';

import React from 'react';
import Link from 'next/link';
import {
    BookOpen,
    FileQuestion,
    TrendingUp,
    Users,
    ArrowLeft
} from 'lucide-react';
import { Subject } from '@/types';
import { Button, Badge, ProgressBar, Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SubjectHeaderProps {
    subject: Subject;
    progress?: number;
    totalChaptersInSemester?: number;
    completedChapters?: number;
    className?: string;
}

function SubjectHeader({
    subject,
    progress = 0,
    totalChaptersInSemester,
    completedChapters = 0,
    className,
}: SubjectHeaderProps) {
    // Stats data
    const stats = [
        {
            icon: BookOpen,
            label: 'Chapters',
            value: subject.totalChapters,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: FileQuestion,
            label: 'Questions',
            value: subject.totalQuestions,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            icon: TrendingUp,
            label: 'Your Progress',
            value: `${progress}%`,
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            icon: Users,
            label: 'Students',
            value: '5.2K+',
            color: 'text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        },
    ];

    return (
        <div className={cn('relative overflow-hidden', className)}>
            {/* Background gradient */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `linear-gradient(135deg, ${subject.color} 0%, transparent 60%)`
                }}
            />

            <div className="relative">
                {/* Back Button */}
                <Link
                    href="/subjects"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">All Subjects</span>
                </Link>

                {/* Main Header */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                    {/* Icon */}
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: `${subject.color}20` }}
                    >
                        {subject.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                {subject.name}
                            </h1>
                            <Badge
                                variant="default"
                                className="capitalize"
                                style={{
                                    backgroundColor: `${subject.color}20`,
                                    color: subject.color
                                }}
                            >
                                {subject.stream}
                            </Badge>
                        </div>

                        <p className="text-lg text-gray-500 font-bengali mb-4">
                            {subject.nameBn}
                        </p>

                        {/* Progress Bar */}
                        <div className="max-w-md">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-500">Overall Progress</span>
                                <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
                            </div>
                            <ProgressBar
                                value={progress}
                                size="md"
                                variant={progress === 100 ? 'success' : 'default'}
                            />
                            {completedChapters > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {completedChapters} of {totalChaptersInSemester || subject.totalChapters} chapters completed
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                        <Button
                            size="lg"
                            style={{ backgroundColor: subject.color }}
                            className="hover:opacity-90"
                        >
                            Continue Learning
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stats.map((stat, index) => (
                        <Card key={index} variant="filled" padding="sm">
                            <CardBody className="flex items-center gap-3">
                                <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                                    <stat.icon className={cn('h-5 w-5', stat.color)} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubjectHeader;
