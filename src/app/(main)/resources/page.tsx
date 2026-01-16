'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FolderOpen,
    Search,
    TrendingUp,
    Star,
    Sparkles
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    PDFResourceCard,
    PDFResourceList,
    PDFCategoryFilter,
    PDFSubjectTabs
} from '@/components/resources';
import { Card, CardBody, CardHeader, Breadcrumb, Input } from '@/components/ui';
import { PageLoading } from '@/components/shared';
import { usePDFResources } from '@/hooks';
import { PDFCategory, pdfCategoryConfig } from '@/types';
import { getAllActiveSubjects } from '@/data';
import { cn } from '@/lib/utils';

export default function ResourcesMainPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Get resources data
    const {
        resources,
        featuredResources,
        popularResources,
        newResources,
        categoryCounts,
        subjectCounts,
        totalCount,
        loading,
        selectedCategory,
        setSelectedCategory,
        selectedSubject,
        setSelectedSubject,
        searchQuery,
        setSearchQuery,
    } = usePDFResources();

    // Get subjects for tabs
    const subjects = getAllActiveSubjects().map(s => ({
        id: s.id,
        name: s.name,
        nameBn: s.nameBn,
        color: s.color,
        count: subjectCounts[s.id] || 0,
    }));

    // Categories to show
    const categories: PDFCategory[] = ['notes', 'guides', 'syllabus', 'model-papers', 'previous-papers', 'solutions'];

    // Handle download
    const handleDownload = (resource: any) => {
        window.open(resource.fileUrl, '_blank');
    };

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', labelBn: 'হোম', href: '/' },
        { label: 'Resources', labelBn: 'রিসোর্স' },
    ];

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading resources..." />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                        <FolderOpen className="h-8 w-8 text-blue-500" />
                        Study Resources
                    </h1>
                    <p className="text-gray-500 text-lg">
                        পড়াশোনার সব উপকরণ এক জায়গায়
                    </p>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardBody className="py-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search resources... (নোটস, গাইড, মডেল পেপার)"
                                className={cn(
                                    'w-full pl-10 pr-4 py-3 rounded-xl',
                                    'bg-gray-100 dark:bg-gray-800',
                                    'border-2 border-transparent',
                                    'focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900',
                                    'outline-none transition-all',
                                    'text-gray-900 dark:text-white'
                                )}
                            />
                        </div>
                    </CardBody>
                </Card>

                {/* Featured Resources */}
                {featuredResources.length > 0 && !searchQuery && selectedCategory === 'all' && selectedSubject === 'all' && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            Featured Resources
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {featuredResources.slice(0, 4).map((resource) => (
                                <PDFResourceCard
                                    key={resource.id}
                                    resource={resource}
                                    variant="compact"
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Subject Tabs */}
                <div className="mb-6">
                    <PDFSubjectTabs
                        subjects={subjects}
                        selectedSubject={selectedSubject}
                        onSubjectChange={setSelectedSubject}
                        totalCount={totalCount}
                    />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <PDFCategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        counts={categoryCounts}
                        variant="pills"
                    />
                </div>

                {/* Results */}
                <PDFResourceList
                    resources={resources}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onDownload={handleDownload}
                    emptyTitle="No resources found"
                    emptyDescription={searchQuery
                        ? `"${searchQuery}" এর জন্য কোনো রিসোর্স পাওয়া যায়নি`
                        : 'এই ক্যাটাগরিতে কোনো রিসোর্স নেই'}
                />

                {/* Popular & New Sections */}
                {!searchQuery && selectedCategory === 'all' && selectedSubject === 'all' && (
                    <>
                        {/* Popular */}
                        {popularResources.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    Most Downloaded
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {popularResources.slice(0, 3).map((resource) => (
                                        <PDFResourceCard
                                            key={resource.id}
                                            resource={resource}
                                            onDownload={handleDownload}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New */}
                        {newResources.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-purple-500" />
                                    New Arrivals
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {newResources.slice(0, 3).map((resource) => (
                                        <PDFResourceCard
                                            key={resource.id}
                                            resource={resource}
                                            onDownload={handleDownload}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
