'use client';

import React from 'react';

interface KeyPointsChecklistProps {
    points: string[];
}

export function KeyPointsChecklist({ points }: KeyPointsChecklistProps) {
    return (
        <div className="space-y-2">
            {points.map((point, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    {point}
                </label>
            ))}
        </div>
    );
}

export default KeyPointsChecklist;
