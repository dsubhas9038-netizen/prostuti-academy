'use client';

import React from 'react';
import { Card, ProgressBar } from '@/components/ui';
import { Trophy } from 'lucide-react';

interface TestResultProps {
    score: number;
    total: number;
    percentage: number;
}

export function TestResult({ score, total, percentage }: TestResultProps) {
    return (
        <Card className="p-6 text-center">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <div className="mb-4 text-4xl font-bold text-blue-600">{percentage}%</div>
            <p className="text-gray-600 dark:text-gray-400">Score: {score}/{total}</p>
            <ProgressBar value={percentage} variant={percentage >= 40 ? 'success' : 'error'} className="mt-4" />
        </Card>
    );
}

export default TestResult;
