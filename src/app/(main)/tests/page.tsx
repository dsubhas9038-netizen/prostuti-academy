'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    FileQuestion,
    Filter,
    Search,
    BookOpen,
    Layers,
    Award,
    Zap
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { TestCard } from '@/components/tests';
import {
    Input,
    Badge,
    Card,
    CardBody,
    Button,
    Breadcrumb
} from '@/components/ui';
import { EmptyState } from '@/components/shared';
import { Test, testTypeLabels } from '@/types';
import { getAllActiveTests, getFreeTests, getPopularTests } from '@/data';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'chapter' | 'subject' | 'semester' | 'full' | 'free';

const filterTabs: { id: FilterType; label: string; labelBn: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Tests', labelBn: 'সব টেস্ট', icon: FileQuestion },
    { id: 'chapter', label: 'Chapter', labelBn: 'অধ্যায়', icon: BookOpen },
    { id: 'subject', label: 'Subject', labelBn: 'বিষয়', icon: Layers },
    { id: 'full', label: 'Full Mock', labelBn: 'সম্পূর্ণ মক', icon: Award },
    { id: 'free', label: 'Free', labelBn: 'বিনামূল্যে', icon: Zap },
];

export default function TestsListPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Get tests
    const allTests = getAllActiveTests();
    const popularTests = getPopularTests(3);

    // Filter tests
    const filteredTests = useMemo(() => {
        let tests = allTests;

        // Apply type filter
        if (activeFilter === 'free') {
            tests = tests.filter(t => t.isFree);
        } else if (activeFilter !== 'all') {
            tests = tests.filter(t => t.type === activeFilter);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            tests = tests.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.titleBn.toLowerCase().includes(query)
            );
        }

        return tests;
    }, [allTests, activeFilter, searchQuery]);

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', labelBn: 'হোম', href: '/' },
        { label: 'Mock Tests', labelBn: 'মক টেস্ট' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Mock Tests
                    </h1>
                    <p className="text-gray-500">
                        পরীক্ষার প্রস্তুতি নাও মক টেস্ট দিয়ে
                    </p>
                </div>

                {/* Popular Tests Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Popular Tests
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {popularTests.map((test) => (
                            <TestCard key={test.id} test={test} variant="compact" />
                        ))}
                    </div>
                </div>

                {/* Search & Filter */}
                <Card className="mb-6">
                    <CardBody>
                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tests..."
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

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {filterTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                                        activeFilter === tab.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    {tab.labelBn}
                                </button>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                        {filteredTests.length} tests found
                    </span>
                    {activeFilter !== 'all' && (
                        <Badge variant="secondary" className="cursor-pointer" onClick={() => setActiveFilter('all')}>
                            Clear filter ✕
                        </Badge>
                    )}
                </div>

                {/* Tests Grid */}
                {filteredTests.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTests.map((test) => (
                            <TestCard key={test.id} test={test} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        type="no-data"
                        title="No tests found"
                        description={searchQuery
                            ? `"${searchQuery}" এর জন্য কোনো টেস্ট পাওয়া যায়নি`
                            : 'এই ক্যাটাগরিতে কোনো টেস্ট নেই'}
                        actionLabel="View All Tests"
                        onAction={() => {
                            setActiveFilter('all');
                            setSearchQuery('');
                        }}
                    />
                )}
            </div>
        </MainLayout>
    );
}
