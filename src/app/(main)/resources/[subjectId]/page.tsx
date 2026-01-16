'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    BookOpen
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    PDFResourceList,
    PDFCategoryFilter
} from '@/components/resources';
import { Button, Breadcrumb } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { useSubjectResources } from '@/hooks';
import { PDFCategory } from '@/types';
import { getSubjectById } from '@/data';

export default function SubjectResourcesPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params.subjectId as string;

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Get subject info
    const subject = getSubjectById(subjectId);

    // Get resources
    const {
        resources,
        categoryCounts,
        loading,
        selectedCategory,
        setSelectedCategory,
    } = useSubjectResources(subjectId);

    // Categories
    const categories: PDFCategory[] = ['notes', 'guides', 'syllabus', 'model-papers', 'previous-papers', 'solutions'];

    // Handle download
    const handleDownload = (resource: any) => {
        window.open(resource.fileUrl, '_blank');
    };

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading resources..." />
            </MainLayout>
        );
    }

    // Subject not found
    if (!subject) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Subject not found"
                        description="এই বিষয় পাওয়া যায়নি।"
                        actionLabel="Back to Resources"
                        onAction={() => router.push('/resources')}
                    />
                </div>
            </MainLayout>
        );
    }

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Resources', labelBn: 'রিসোর্স', href: '/resources' },
        { label: subject.name, labelBn: subject.nameBn },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${subject.color}20` }}
                        >
                            <BookOpen className="h-7 w-7" style={{ color: subject.color }} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {subject.nameBn} Resources
                            </h1>
                            <p className="text-gray-500">
                                {resources.length} resources available
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/resources')}
                        leftIcon={<ArrowLeft className="h-4 w-4" />}
                    >
                        Back
                    </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <PDFCategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        counts={categoryCounts}
                        variant="tabs"
                    />
                </div>

                {/* Resources List */}
                <PDFResourceList
                    resources={resources}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onDownload={handleDownload}
                    emptyTitle="No resources found"
                    emptyDescription="এই ক্যাটাগরিতে কোনো রিসোর্স নেই।"
                />
            </div>
        </MainLayout>
    );
}
