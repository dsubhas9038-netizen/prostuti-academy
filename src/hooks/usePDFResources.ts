'use client';

import { useState, useEffect, useMemo } from 'react';
import { PDFResource, PDFCategory } from '@/types';
import {
    samplePDFResources,
    getAllPDFResources,
    getPDFResourcesByCategory,
    getPDFResourcesBySubject,
    getFeaturedPDFResources,
    getPopularPDFResources,
    getNewPDFResources,
    getPDFResourceById,
    searchPDFResources,
    getCategoryCounts,
    getSubjectResourceCounts
} from '@/data/samplePDFResources';

interface UsePDFResourcesOptions {
    subjectId?: string;
    category?: PDFCategory | 'all';
    searchQuery?: string;
}

interface UsePDFResourcesReturn {
    // Data
    resources: PDFResource[];
    featuredResources: PDFResource[];
    popularResources: PDFResource[];
    newResources: PDFResource[];

    // Counts
    categoryCounts: Record<PDFCategory, number>;
    subjectCounts: Record<string, number>;
    totalCount: number;

    // State
    loading: boolean;
    error: string | null;

    // Filters
    selectedCategory: PDFCategory | 'all';
    setSelectedCategory: (category: PDFCategory | 'all') => void;
    selectedSubject: string | 'all';
    setSelectedSubject: (subjectId: string | 'all') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    // Helpers
    getResourceById: (id: string) => PDFResource | undefined;
    refreshResources: () => void;
}

export default function usePDFResources(options: UsePDFResourcesOptions = {}): UsePDFResourcesReturn {
    const {
        subjectId: initialSubjectId,
        category: initialCategory,
        searchQuery: initialSearchQuery
    } = options;

    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<PDFCategory | 'all'>(initialCategory || 'all');
    const [selectedSubject, setSelectedSubject] = useState<string | 'all'>(initialSubjectId || 'all');
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');

    // Simulate loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [selectedCategory, selectedSubject, searchQuery]);

    // Get filtered resources
    const resources = useMemo(() => {
        let filtered = getAllPDFResources();

        // Filter by subject
        if (selectedSubject !== 'all') {
            filtered = filtered.filter(r => r.subjectId === selectedSubject);
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(r => r.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(lowerQuery) ||
                r.titleBn.toLowerCase().includes(lowerQuery) ||
                r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }

        return filtered;
    }, [selectedCategory, selectedSubject, searchQuery]);

    // Get featured resources
    const featuredResources = useMemo(() => {
        return getFeaturedPDFResources();
    }, []);

    // Get popular resources
    const popularResources = useMemo(() => {
        return getPopularPDFResources(6);
    }, []);

    // Get new resources
    const newResources = useMemo(() => {
        return getNewPDFResources(6);
    }, []);

    // Get category counts
    const categoryCounts = useMemo(() => {
        return getCategoryCounts();
    }, []);

    // Get subject counts
    const subjectCounts = useMemo(() => {
        return getSubjectResourceCounts();
    }, []);

    // Total count
    const totalCount = useMemo(() => {
        return getAllPDFResources().length;
    }, []);

    // Get resource by ID
    const getResourceById = (id: string): PDFResource | undefined => {
        return getPDFResourceById(id);
    };

    // Refresh resources (for future real API implementation)
    const refreshResources = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    return {
        resources,
        featuredResources,
        popularResources,
        newResources,
        categoryCounts,
        subjectCounts,
        totalCount,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        selectedSubject,
        setSelectedSubject,
        searchQuery,
        setSearchQuery,
        getResourceById,
        refreshResources,
    };
}

// Hook for single subject resources
export function useSubjectResources(subjectId: string) {
    return usePDFResources({ subjectId });
}

// Hook for single category resources
export function useCategoryResources(category: PDFCategory) {
    return usePDFResources({ category });
}
