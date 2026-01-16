'use client';

import React from 'react';
import { Grid, List, Loader2 } from 'lucide-react';
import { PDFResource } from '@/types';
import PDFResourceCard from './PDFResourceCard';
import { EmptyState } from '@/components/shared';
import { cn } from '@/lib/utils';

interface PDFResourceListProps {
    resources: PDFResource[];
    loading?: boolean;
    viewMode?: 'grid' | 'list';
    onViewModeChange?: (mode: 'grid' | 'list') => void;
    onDownload?: (resource: PDFResource) => void;
    onBookmark?: (resource: PDFResource) => void;
    bookmarkedIds?: string[];
    emptyTitle?: string;
    emptyDescription?: string;
    showViewToggle?: boolean;
    className?: string;
}

function PDFResourceList({
    resources,
    loading = false,
    viewMode = 'grid',
    onViewModeChange,
    onDownload,
    onBookmark,
    bookmarkedIds = [],
    emptyTitle = 'No resources found',
    emptyDescription = 'কোনো রিসোর্স পাওয়া যায়নি।',
    showViewToggle = true,
    className,
}: PDFResourceListProps) {

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <span className="ml-3 text-gray-500">Loading resources...</span>
            </div>
        );
    }

    // Empty state
    if (resources.length === 0) {
        return (
            <EmptyState
                type="no-data"
                title={emptyTitle}
                description={emptyDescription}
            />
        );
    }

    return (
        <div className={className}>
            {/* View Toggle */}
            {showViewToggle && onViewModeChange && (
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                        {resources.length} resources found
                    </span>
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={cn(
                                'p-2 rounded-md transition-colors',
                                viewMode === 'grid'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            )}
                            title="Grid View"
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={cn(
                                'p-2 rounded-md transition-colors',
                                viewMode === 'list'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            )}
                            title="List View"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Resource Cards */}
            {viewMode === 'grid' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {resources.map((resource) => (
                        <PDFResourceCard
                            key={resource.id}
                            resource={resource}
                            variant="default"
                            onDownload={onDownload}
                            onBookmark={onBookmark}
                            isBookmarked={bookmarkedIds.includes(resource.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {resources.map((resource) => (
                        <PDFResourceCard
                            key={resource.id}
                            resource={resource}
                            variant="horizontal"
                            onDownload={onDownload}
                            onBookmark={onBookmark}
                            isBookmarked={bookmarkedIds.includes(resource.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PDFResourceList;
