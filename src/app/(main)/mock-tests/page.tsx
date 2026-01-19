'use client';

import React, { useState } from 'react';
import { PenTool, Filter, Loader2, Search } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { TestList } from '@/components/tests';
import { Breadcrumb, Button, Card, CardBody, Input } from '@/components/ui';
import { useTests } from '@/hooks';
import { PageLoading } from '@/components/shared';

export default function MockTestsPage() {
    const [activeSubject, setActiveSubject] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Use the hook to get proper data
    const { tests, loading } = useTests();

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', labelBn: 'হোম', href: '/' },
        { label: 'Mock Tests', labelBn: 'মক টেস্ট' },
    ];

    // Filter logic
    const filteredTests = tests.filter(test => {
        const matchesSubject = activeSubject === 'all' || test.subjectId === activeSubject;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.titleBn?.includes(searchQuery);
        return matchesSubject && matchesSearch;
    });

    const subjects = [
        { id: 'all', label: 'All Tests' },
        { id: 'bengali', label: 'Bengali' },
        { id: 'english', label: 'English' },
        { id: 'history', label: 'History' },
        { id: 'geography', label: 'Geography' },
        { id: 'philosophy', label: 'Philosophy' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <PenTool className="h-8 w-8 text-blue-600" />
                            Mock Tests
                        </h1>
                        <p className="text-gray-500 mt-1 text-lg">
                            Real exam এর মতো practice করো এবং নিজেকে যাচাই করো
                        </p>
                    </div>
                </div>

                {/* Filters & Search */}
                <Card className="mb-8">
                    <CardBody className="py-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Subject Filters */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                                <Filter className="h-5 w-5 text-gray-400 min-w-5" />
                                <div className="flex gap-2">
                                    {subjects.map((subject) => (
                                        <Button
                                            key={subject.id}
                                            variant={activeSubject === subject.id ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => setActiveSubject(subject.id)}
                                            className="whitespace-nowrap"
                                        >
                                            {subject.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search tests..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Stats */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTests.length}</span> tests
                    </p>
                </div>

                {/* Test List */}
                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800" />
                        ))}
                    </div>
                ) : filteredTests.length > 0 ? (
                    <TestList tests={filteredTests} />
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <PenTool className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            No tests found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your filters or search query
                        </p>
                        <Button
                            variant="primary"
                            className="mt-4"
                            onClick={() => {
                                setActiveSubject('all');
                                setSearchQuery('');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
