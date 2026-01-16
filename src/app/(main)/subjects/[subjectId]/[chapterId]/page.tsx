'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { FileQuestion, AlertCircle, BookOpen } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    ChapterHeader,
    QuestionTypeTabs,
    ChapterNavigation,
    RelatedChaptersSidebar
} from '@/components/subjects';
import {
    QuestionList,
    QuestionFilterBar,
    QuestionSearch,
    QuestionProgressIndicator
} from '@/components/questions';
import { Breadcrumb, Card, CardBody, CardHeader, Button } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { useSubject, useChapter, useChapters, useQuestions } from '@/hooks';
import { cn } from '@/lib/utils';
import type { QuestionFilterType } from '@/components/questions/QuestionFilterBar';

export default function ChapterDetailPage() {
    const params = useParams();
    const subjectId = params.subjectId as string;
    const chapterId = params.chapterId as string;

    // State
    const [activeQuestionType, setActiveQuestionType] = useState<QuestionFilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showImportantOnly, setShowImportantOnly] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);

    // Fetch data
    const { subject, loading: subjectLoading } = useSubject(subjectId);
    const { chapter, loading: chapterLoading, error: chapterError } = useChapter(chapterId);
    const { chapters: allChapters } = useChapters({ subjectId, semester: 'all' });

    // Fetch questions
    const {
        questions: allQuestions,
        loading: questionsLoading,
        counts: questionCounts
    } = useQuestions({
        chapterId,
        type: activeQuestionType,
        searchQuery
    });

    // Filter questions
    const filteredQuestions = useMemo(() => {
        let filtered = allQuestions;

        if (showImportantOnly) {
            filtered = filtered.filter(q => q.isImportant);
        }

        return filtered;
    }, [allQuestions, showImportantOnly]);

    // Find prev/next chapters
    const navigation = useMemo(() => {
        if (!chapter || !allChapters.length) return { prev: null, next: null };

        const sameSmesterChapters = allChapters
            .filter(ch => ch.semester === chapter.semester)
            .sort((a, b) => a.order - b.order);

        const currentIndex = sameSmesterChapters.findIndex(ch => ch.id === chapter.id);

        return {
            prev: currentIndex > 0 ? sameSmesterChapters[currentIndex - 1] : null,
            next: currentIndex < sameSmesterChapters.length - 1 ? sameSmesterChapters[currentIndex + 1] : null,
        };
    }, [chapter, allChapters]);

    // Toggle bookmark for a question
    const handleBookmarkToggle = useCallback((questionId: string) => {
        setBookmarkedQuestions(prev =>
            prev.includes(questionId)
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
        );
    }, []);

    // Handle search
    const handleSearch = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    // Loading state
    if (subjectLoading || chapterLoading) {
        return (
            <MainLayout>
                <PageLoading message="Chapter loading..." />
            </MainLayout>
        );
    }

    // Error state
    if (chapterError || !chapter || !subject) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Chapter not found"
                        description="এই chapter টি পাওয়া যায়নি।"
                        actionLabel="Back to Subject"
                        onAction={() => window.location.href = `/subjects/${subjectId}`}
                    />
                </div>
            </MainLayout>
        );
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Subjects', labelBn: 'বিষয়সমূহ', href: '/subjects' },
        { label: subject.name, labelBn: subject.nameBn, href: `/subjects/${subjectId}` },
        { label: `Ch. ${chapter.chapterNumber}`, labelBn: chapter.titleBn },
    ];

    // Mock progress (will be real data later)
    const progress = Math.floor(Math.random() * 60);
    const completedQuestions = Math.floor(filteredQuestions.length * 0.3);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left: Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Chapter Header */}
                        <ChapterHeader
                            chapter={chapter}
                            subject={subject}
                            progress={progress}
                            isBookmarked={isBookmarked}
                            onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
                        />

                        {/* Questions Section */}
                        <Card>
                            <CardHeader
                                title="Questions"
                                subtitle={`${chapter.titleBn} এর সব প্রশ্ন`}
                                action={
                                    <span className="text-sm text-gray-500">
                                        {filteredQuestions.length} questions
                                    </span>
                                }
                            />
                            <CardBody className="space-y-4">
                                {/* Search */}
                                <QuestionSearch
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search questions..."
                                    resultCount={searchQuery ? filteredQuestions.length : undefined}
                                />

                                {/* Filter Bar */}
                                <QuestionFilterBar
                                    activeType={activeQuestionType}
                                    onTypeChange={setActiveQuestionType}
                                    counts={questionCounts}
                                    showImportantOnly={showImportantOnly}
                                    onImportantToggle={() => setShowImportantOnly(!showImportantOnly)}
                                />

                                {/* Progress Indicator */}
                                <QuestionProgressIndicator
                                    total={filteredQuestions.length}
                                    completed={completedQuestions}
                                    read={Math.floor(completedQuestions * 1.5)}
                                    bookmarked={bookmarkedQuestions.length}
                                    variant="compact"
                                />
                            </CardBody>
                        </Card>

                        {/* Question List */}
                        <QuestionList
                            questions={filteredQuestions}
                            loading={questionsLoading}
                            bookmarkedQuestions={bookmarkedQuestions}
                            onBookmarkToggle={handleBookmarkToggle}
                            emptyMessage={
                                searchQuery
                                    ? `"${searchQuery}" এর জন্য কোনো question পাওয়া যায়নি`
                                    : activeQuestionType !== 'all'
                                        ? `${activeQuestionType.toUpperCase()} type এর কোনো question নেই`
                                        : 'এই chapter এ এখনো কোনো question নেই'
                            }
                        />

                        {/* PYQ Alert */}
                        {chapter.pyqStats.avgMarksPerYear >= 7 && (
                            <Card className="border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10">
                                <CardBody>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                                Important Chapter! ⭐
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                এই chapter থেকে প্রতি বছর প্রায় {chapter.pyqStats.avgMarksPerYear} marks এর প্রশ্ন আসে।
                                                বিগত {chapter.pyqStats.yearsAsked.length} বছরে এই chapter থেকে মোট {chapter.pyqStats.totalMarks} marks এর প্রশ্ন এসেছে।
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Chapter Navigation */}
                        <ChapterNavigation
                            currentChapter={chapter}
                            prevChapter={navigation.prev}
                            nextChapter={navigation.next}
                            subjectId={subjectId}
                            subjectColor={subject.color}
                        />
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-1 hidden lg:block space-y-6">
                        {/* Progress Card */}
                        <QuestionProgressIndicator
                            total={questionCounts.all}
                            completed={completedQuestions}
                            read={Math.floor(completedQuestions * 1.5)}
                            bookmarked={bookmarkedQuestions.length}
                            variant="detailed"
                        />

                        {/* Related Chapters */}
                        <RelatedChaptersSidebar
                            chapters={allChapters.filter(ch => ch.semester === chapter.semester)}
                            currentChapterId={chapterId}
                            subjectId={subjectId}
                            subjectColor={subject.color}
                            completedChapters={[]}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
