'use client';

import React from 'react';
import { Button } from '@/components/ui';

export function QuestionFilter() {
    return (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            <Button variant="primary" size="sm">All</Button>
            <Button variant="outline" size="sm">SAQ</Button>
            <Button variant="outline" size="sm">LAQ</Button>
            <Button variant="outline" size="sm">MCQ</Button>
        </div>
    );
}

export default QuestionFilter;
