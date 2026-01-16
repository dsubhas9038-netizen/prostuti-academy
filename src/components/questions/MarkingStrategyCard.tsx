'use client';

import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Target, CheckCircle } from 'lucide-react';
import { MarkingStrategy } from '@/types';
import { cn } from '@/lib/utils';

interface MarkingStrategyCardProps {
    markingStrategy: MarkingStrategy;
    totalMarks: number;
    showExpanded?: boolean;
    className?: string;
}

function MarkingStrategyCard({
    markingStrategy,
    totalMarks,
    showExpanded = false,
    className,
}: MarkingStrategyCardProps) {
    const [isExpanded, setIsExpanded] = useState(showExpanded);

    if (!markingStrategy || !markingStrategy.breakdown.length) {
        return null;
    }

    return (
        <div className={cn('rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20', className)}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 text-left"
            >
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                            Marking Strategy
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                            ({totalMarks} marks)
                        </span>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-3 pb-3 space-y-3">
                    {/* Breakdown */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4 text-purple-500" />
                            Marks Breakdown
                        </h4>
                        <div className="space-y-2">
                            {markingStrategy.breakdown.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium text-purple-600">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {item.pointBn}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-purple-600">
                                        {item.marks} marks
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    {markingStrategy.tipsBn && markingStrategy.tipsBn.length > 0 && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Examiner Tips
                            </h4>
                            <ul className="space-y-1.5">
                                {markingStrategy.tipsBn.map((tip, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                                    >
                                        <span className="text-green-500 mt-1">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MarkingStrategyCard;
