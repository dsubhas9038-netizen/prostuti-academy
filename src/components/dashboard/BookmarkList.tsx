'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui';
import { Bookmark } from 'lucide-react';

interface BookmarkItem {
    id: string;
    question: string;
    subject: string;
}

interface BookmarkListProps {
    bookmarks: BookmarkItem[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
    return (
        <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <Bookmark className="h-5 w-5" />
                Bookmarks
            </h3>
            <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-sm text-gray-900 dark:text-white">{bookmark.question}</p>
                        <Badge variant="default" className="mt-1">{bookmark.subject}</Badge>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default BookmarkList;
