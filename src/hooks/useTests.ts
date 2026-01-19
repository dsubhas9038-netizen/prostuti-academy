'use client';

import { useState, useEffect } from 'react';
import { Test } from '@/types';
import { getAllActiveTests } from '@/data';

interface UseTestsOptions {
    subjectId?: string;
    limit?: number;
}

export default function useTests(options?: UseTestsOptions) {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                // For now, we simulate a delay and filter local data
                await new Promise(resolve => setTimeout(resolve, 800));

                let data = getAllActiveTests();

                if (options?.subjectId && options.subjectId !== 'all') {
                    data = data.filter(t => t.subjectId === options.subjectId);
                }

                if (options?.limit) {
                    data = data.slice(0, options.limit);
                }

                setTests(data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [options?.subjectId, options?.limit]);

    return { tests, loading };
}
