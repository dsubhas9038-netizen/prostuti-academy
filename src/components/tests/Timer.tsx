'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
    seconds: number;
}

export function Timer({ seconds }: TimerProps) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (
        <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-medium">
                {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </span>
        </div>
    );
}

export default Timer;
