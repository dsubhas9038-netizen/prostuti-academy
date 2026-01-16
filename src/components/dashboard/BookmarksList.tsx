'use client';

import React from 'react';
import Link from 'next/link';
import {
    Bookmark,
    ChevronRight,
    Trash2,
    FileQuestion,
    FileText,
    GraduationCap
} from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface BookmarkItem {
    id: string;
    type: 'question' | 'resource' | 'test';
    title: string;
    titleBn: string;
    subtitle?: string;
    subtitleBn?: string;
    href: string;
    bookmarkedAt: Date;
    subjectId?: string;
    subjectColor?: string;
}

interface BookmarksListProps {
    bookmarks: BookmarkItem[];
    maxItems?: number;
    onRemove?: (id: string) => void;
    showRemove?: boolean;
    className?: string;
}

// Type icons
const typeIcons = {
    question: FileQuestion,
    resource: FileText,
    test: GraduationCap,
};

const typeColors = {
    question: '#3B82F6',
    resource: '#22C55E',
    test: '#8B5CF6',
};

function BookmarksList({
    bookmarks,
    maxItems = 5,
    onRemove,
    showRemove = true,
    className
}: BookmarksListProps) {
    const displayedBookmarks = bookmarks.slice(0, maxItems);

    // Format relative time
    const formatTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'আজ';
        if (diffDays === 1) return 'গতকাল';
        if (diffDays < 7) return `${diffDays} দিন আগে`;
        return date.toLocaleDateString('bn-BD');
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Bookmarks"
                subtitle="সংরক্ষিত আইটেম"
                icon={<Bookmark className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                action={
                    <Link href="/bookmarks" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                    </Link>
                }
            />
            <CardBody>
                {displayedBookmarks.length === 0 ? (
                    <div className="text-center py-8">
                        <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">কোনো বুকমার্ক নেই</p>
                        <p className="text-xs text-gray-400 mt-1">
                            প্রশ্ন বা রিসোর্স বুকমার্ক করো
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {displayedBookmarks.map((bookmark) => {
                            const TypeIcon = typeIcons[bookmark.type];
                            const typeColor = bookmark.subjectColor || typeColors[bookmark.type];

                            return (
                                <div
                                    key={bookmark.id}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${typeColor}20` }}
                                    >
                                        <TypeIcon className="h-5 w-5" style={{ color: typeColor }} />
                                    </div>

                                    {/* Content */}
                                    <Link href={bookmark.href} className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 transition-colors">
                                            {bookmark.titleBn}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {bookmark.subtitleBn && (
                                                <span className="text-xs text-gray-500 truncate">
                                                    {bookmark.subtitleBn}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400">
                                                {formatTime(bookmark.bookmarkedAt)}
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Remove Button */}
                                    {showRemove && onRemove && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onRemove(bookmark.id);
                                            }}
                                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
                                            title="Remove Bookmark"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* View All Button */}
                {bookmarks.length > maxItems && (
                    <Link href="/bookmarks" className="block mt-4">
                        <Button variant="outline" className="w-full" size="sm">
                            View All {bookmarks.length} Bookmarks
                        </Button>
                    </Link>
                )}
            </CardBody>
        </Card>
    );
}

export default BookmarksList;

// Sample bookmarks for testing
export const sampleBookmarks: BookmarkItem[] = [
    {
        id: 'bm-1',
        type: 'question',
        title: 'Important PYQ Question',
        titleBn: 'গুরুত্বপূর্ণ PYQ প্রশ্ন',
        subtitle: 'Bengali Chapter 1',
        subtitleBn: 'বাংলা অধ্যায় ১',
        href: '/subjects/bengali/bengali-sem1-ch1',
        bookmarkedAt: new Date(Date.now() - 86400000),
        subjectColor: '#3B82F6',
    },
    {
        id: 'bm-2',
        type: 'resource',
        title: 'History Notes',
        titleBn: 'ইতিহাস নোটস',
        subtitle: 'Renaissance',
        subtitleBn: 'রেনেসাঁস',
        href: '/resources/view/pdf-history-notes-ren',
        bookmarkedAt: new Date(Date.now() - 172800000),
        subjectColor: '#8B5CF6',
    },
    {
        id: 'bm-3',
        type: 'test',
        title: 'Bengali Mock Test',
        titleBn: 'বাংলা মক টেস্ট',
        href: '/tests/test-bengali-ch1',
        bookmarkedAt: new Date(Date.now() - 259200000),
        subjectColor: '#22C55E',
    },
];
