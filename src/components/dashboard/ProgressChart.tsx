'use client';

import React from 'react';
import { Card, ProgressBar } from '@/components/ui';

interface ProgressChartProps {
    data: { label: string; value: number }[];
}

export function ProgressChart({ data }: ProgressChartProps) {
    return (
        <Card className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Progress Chart</h3>
            <div className="space-y-4">
                {data.map((item, i) => (
                    <div key={i}>
                        <div className="mb-1 flex justify-between text-sm">
                            <span>{item.label}</span>
                            <span>{item.value}%</span>
                        </div>
                        <ProgressBar value={item.value} />
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default ProgressChart;
