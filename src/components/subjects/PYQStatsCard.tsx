'use client';

import React from 'react';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';
import { Chapter } from '@/types';
import { Card, CardHeader, CardBody, Badge, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PYQStatsCardProps {
    chapters: Chapter[];
    subjectColor?: string;
    className?: string;
}

function PYQStatsCard({
    chapters,
    subjectColor = '#2563EB',
    className,
}: PYQStatsCardProps) {
    // Calculate total PYQ stats
    const totalMarks = chapters.reduce((sum, ch) => sum + ch.pyqStats.totalMarks, 0);
    const avgMarksPerYear = chapters.reduce((sum, ch) => sum + ch.pyqStats.avgMarksPerYear, 0);

    // Get most important chapters (top 3 by avg marks)
    const importantChapters = [...chapters]
        .sort((a, b) => b.pyqStats.avgMarksPerYear - a.pyqStats.avgMarksPerYear)
        .slice(0, 3);

    // Get years covered
    const allYears = chapters.flatMap(ch => ch.pyqStats.yearsAsked);
    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a);

    return (
        <Card className={className}>
            <CardHeader
                title="PYQ Analysis"
                subtitle="বিগত বছরের প্রশ্ন বিশ্লেষণ"
                action={
                    <Badge variant="info" size="sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {uniqueYears[0]}-{uniqueYears[uniqueYears.length - 1]}
                    </Badge>
                }
            />
            <CardBody>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: subjectColor }}>
                            {totalMarks}
                        </p>
                        <p className="text-xs text-gray-500">Total Marks (10 yrs)</p>
                    </div>
                    <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: subjectColor }}>
                            ~{Math.round(avgMarksPerYear)}
                        </p>
                        <p className="text-xs text-gray-500">Avg Marks/Year</p>
                    </div>
                </div>

                {/* Most Important Chapters */}
                <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Most Important Chapters
                    </h4>
                    <div className="space-y-3">
                        {importantChapters.map((chapter, index) => (
                            <div key={chapter.id} className="flex items-center gap-3">
                                <span
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                    style={{ backgroundColor: subjectColor }}
                                >
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {chapter.titleBn}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Avg. {chapter.pyqStats.avgMarksPerYear} marks/year
                                    </p>
                                </div>
                                <div className="w-16">
                                    <ProgressBar
                                        value={(chapter.pyqStats.avgMarksPerYear / 15) * 100}
                                        size="sm"
                                        variant={
                                            chapter.pyqStats.avgMarksPerYear >= 10 ? 'error' :
                                                chapter.pyqStats.avgMarksPerYear >= 7 ? 'warning' : 'default'
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tip */}
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                            এই chapters গুলো প্রতি বছর পরীক্ষায় আসে। এগুলো ভালো করে পড়ো!
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default PYQStatsCard;
