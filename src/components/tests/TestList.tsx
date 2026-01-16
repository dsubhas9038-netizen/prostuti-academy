'use client';

import React from 'react';
import { Test } from '@/types';
import TestCard from './TestCard';

interface TestListProps {
    tests: Test[];
    variant?: 'default' | 'compact' | 'horizontal';
    className?: string;
}

export function TestList({ tests, variant = 'default', className }: TestListProps) {
    return (
        <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
            {tests.map((test) => (
                <TestCard key={test.id} test={test} variant={variant} />
            ))}
        </div>
    );
}

export default TestList;
