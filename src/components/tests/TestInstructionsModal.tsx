'use client';

import React from 'react';
import {
    Clock,
    FileQuestion,
    Award,
    AlertTriangle,
    CheckCircle,
    X,
    PlayCircle
} from 'lucide-react';
import { Test, testTypeLabels, difficultyLabels } from '@/types';
import { Button, Badge, Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestInstructionsModalProps {
    test: Test;
    isOpen: boolean;
    onClose: () => void;
    onStart: () => void;
    className?: string;
}

function TestInstructionsModal({
    test,
    isOpen,
    onClose,
    onStart,
    className,
}: TestInstructionsModalProps) {
    if (!isOpen) return null;

    const typeInfo = testTypeLabels[test.type];
    const diffInfo = difficultyLabels[test.difficulty];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={cn(
                'relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
                'max-h-[90vh] overflow-hidden',
                className
            )}>
                {/* Header */}
                <div
                    className="p-6 text-white rounded-t-2xl"
                    style={{ backgroundColor: typeInfo.color }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <Badge className="mb-3 bg-white/20 text-white border-0">
                        {typeInfo.bn}
                    </Badge>
                    <h2 className="text-2xl font-bold mb-2">
                        {test.titleBn}
                    </h2>
                    <p className="text-white/80 text-sm">
                        {test.descriptionBn || test.description}
                    </p>
                </div>

                {/* Test Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {test.duration}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">মিনিট</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <FileQuestion className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {test.totalQuestions}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">প্রশ্ন</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {test.totalMarks}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">মার্কস</span>
                    </div>
                </div>

                {/* Instructions */}
                <div className="p-6 overflow-y-auto max-h-[300px]">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        📋 Instructions
                    </h3>
                    <ul className="space-y-2">
                        {(test.instructionsBn || test.instructions || []).map((instruction, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {instruction}
                            </li>
                        ))}
                    </ul>

                    {/* Warnings */}
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-yellow-700 dark:text-yellow-400">
                                <strong>সতর্কতা:</strong> একবার টেস্ট শুরু করলে পেজ রিফ্রেশ করবে না।
                                সময় শেষ হলে স্বয়ংক্রিয়ভাবে সাবমিট হয়ে যাবে।
                            </div>
                        </div>
                    </div>

                    {/* Passing Info */}
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Passing Marks:</span>
                            <span className="font-bold text-blue-600">
                                {test.passingMarks}/{test.totalMarks} ({test.passingPercentage}%)
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                            <Badge
                                size="sm"
                                style={{ backgroundColor: `${diffInfo.color}20`, color: diffInfo.color }}
                            >
                                {diffInfo.bn}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={onStart}
                        leftIcon={<PlayCircle className="h-5 w-5" />}
                    >
                        Start Test
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TestInstructionsModal;
