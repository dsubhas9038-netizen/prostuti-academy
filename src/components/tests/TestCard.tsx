'use client';

import React from 'react';
import Link from 'next/link';
import {
    Clock,
    FileQuestion,
    Award,
    Users,
    Star,
    Zap,
    ChevronRight
} from 'lucide-react';
import { Test, testTypeLabels, difficultyLabels } from '@/types';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestCardProps {
    test: Test;
    variant?: 'default' | 'compact' | 'horizontal';
    className?: string;
}

function TestCard({
    test,
    variant = 'default',
    className,
}: TestCardProps) {
    const typeInfo = testTypeLabels[test.type];
    const diffInfo = difficultyLabels[test.difficulty];

    // Horizontal variant
    if (variant === 'horizontal') {
        return (
            <Card className={cn('hover:shadow-md transition-shadow', className)}>
                <CardBody className="flex items-center gap-4">
                    {/* Type Icon */}
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${typeInfo.color}20` }}
                    >
                        <FileQuestion className="h-6 w-6" style={{ color: typeInfo.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {test.titleBn}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>{test.duration} মিনিট</span>
                            <span>•</span>
                            <span>{test.totalQuestions} প্রশ্ন</span>
                            <span>•</span>
                            <span>{test.totalMarks} মার্কস</span>
                        </div>
                    </div>

                    {/* Action */}
                    <Link href={`/tests/${test.id}/take`}>
                        <Button size="sm">
                            Start
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </CardBody>
            </Card>
        );
    }

    // Compact variant
    if (variant === 'compact') {
        return (
            <Link href={`/tests/${test.id}/take`}>
                <Card className={cn('hover:shadow-md transition-all cursor-pointer', className)}>
                    <CardBody className="p-4">
                        <div className="flex items-start justify-between mb-2">
                            <Badge
                                size="sm"
                                style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color }}
                            >
                                {typeInfo.bn}
                            </Badge>
                            {test.isFree && (
                                <Badge size="sm" variant="success">FREE</Badge>
                            )}
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm mb-2">
                            {test.titleBn}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{test.duration}m</span>
                            <span>•</span>
                            <span>{test.totalQuestions}Q</span>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Default variant
    return (
        <Card className={cn('hover:shadow-lg transition-all overflow-hidden', className)}>
            {/* Header */}
            <div
                className="p-4"
                style={{ backgroundColor: `${typeInfo.color}10` }}
            >
                <div className="flex items-start justify-between mb-3">
                    <Badge
                        style={{ backgroundColor: typeInfo.color, color: 'white' }}
                    >
                        {typeInfo.bn}
                    </Badge>
                    <Badge
                        size="sm"
                        style={{ backgroundColor: `${diffInfo.color}20`, color: diffInfo.color }}
                    >
                        {diffInfo.bn}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {test.titleBn}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                    {test.descriptionBn || test.description}
                </p>
            </div>

            <CardBody>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{test.duration}</span>
                        </div>
                        <span className="text-xs text-gray-500">মিনিট</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <FileQuestion className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{test.totalQuestions}</span>
                        </div>
                        <span className="text-xs text-gray-500">প্রশ্ন</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{test.totalMarks}</span>
                        </div>
                        <span className="text-xs text-gray-500">মার্কস</span>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{test.attemptCount} attempts</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{test.avgScore}% avg</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2">
                    {test.isFree ? (
                        <Link href={`/tests/${test.id}/take`} className="flex-1">
                            <Button className="w-full" leftIcon={<Zap className="h-4 w-4" />}>
                                Start Free Test
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={`/tests/${test.id}/take`} className="flex-1">
                                <Button className="w-full">
                                    Start Test
                                </Button>
                            </Link>
                            <Badge variant="secondary" className="px-3 py-2">
                                ₹{test.price}
                            </Badge>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default TestCard;
