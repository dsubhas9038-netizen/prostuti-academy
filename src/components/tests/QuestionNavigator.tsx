'use client';

import React from 'react';

interface QuestionNavigatorProps {
    total: number;
    current: number;
    onSelect: (index: number) => void;
}

export function QuestionNavigator({ total, current, onSelect }: QuestionNavigatorProps) {
    return (
        <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium ${current === i ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}

export default QuestionNavigator;
