'use client';

import { useState, useEffect, useMemo } from 'react';
import { Subject } from '@/types';
import {
    getSubjectById as getSubjectByIdFromData,
    getAllActiveSubjects
} from '@/data';

interface UseSubjectsOptions {
    semester?: number | 'all';
    stream?: 'arts' | 'commerce' | 'science';
}

interface UseSubjectsReturn {
    subjects: Subject[];
    loading: boolean;
    error: string | null;
    getSubjectById: (id: string) => Subject | undefined;
    refetch: () => void;
}

export default function useSubjects(options: UseSubjectsOptions = {}): UseSubjectsReturn {
    const { semester = 'all', stream = 'arts' } = options;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate loading delay for realistic UX
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [semester, stream]);

    // Filter subjects based on options
    const subjects = useMemo(() => {
        let filtered = getAllActiveSubjects();

        // Filter by stream
        filtered = filtered.filter((s) => s.stream === stream);

        // Filter by semester
        if (semester !== 'all') {
            filtered = filtered.filter((s) => s.semesters.includes(semester as number));
        }

        return filtered.sort((a, b) => a.order - b.order);
    }, [semester, stream]);

    // Get subject by ID
    const getSubjectById = (id: string): Subject | undefined => {
        return getSubjectByIdFromData(id);
    };

    // Refetch function
    const refetch = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    return {
        subjects,
        loading,
        error,
        getSubjectById,
        refetch,
    };
}

// Hook for single subject
export function useSubject(subjectId: string) {
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        // Simulate API call
        const timer = setTimeout(() => {
            const found = getSubjectByIdFromData(subjectId);
            if (found) {
                setSubject(found);
                setError(null);
            } else {
                setSubject(null);
                setError('Subject not found');
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [subjectId]);

    return { subject, loading, error };
}
