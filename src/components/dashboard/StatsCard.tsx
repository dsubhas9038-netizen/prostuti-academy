'use client';

import React from 'react';
import { Card } from '@/components/ui';

interface StatsCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: string;
}

export function StatsCard({ icon: Icon, label, value, color = 'blue' }: StatsCardProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </div>
        </Card>
    );
}

export default StatsCard;
