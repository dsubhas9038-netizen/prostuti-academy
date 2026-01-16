'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Copy,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Input, Modal } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Question {
    id: string;
    title: string;
    titleBn: string;
    subjectId: string;
    subjectName: string;
    chapterId: string;
    chapterName: string;
    type: 'short' | 'broad' | 'mcq';
    marks: number;
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    views: number;
}

interface QuestionManagerProps {
    questions?: Question[];
    onAdd?: () => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

// Status badge config
const statusConfig = {
    draft: { color: '#F59E0B', icon: Clock, label: 'Draft' },
    published: { color: '#22C55E', icon: CheckCircle, label: 'Published' },
    archived: { color: '#6B7280', icon: XCircle, label: 'Archived' },
};

// Sample questions
const sampleQuestions: Question[] = [
    {
        id: 'q1', title: 'Pather Dabi Summary', titleBn: 'পথের দাবী সারাংশ',
        subjectId: 'bengali', subjectName: 'Bengali', chapterId: 'ch1', chapterName: 'পথের দাবী',
        type: 'broad', marks: 5, status: 'published', createdAt: new Date('2024-01-15'), views: 350
    },
    {
        id: 'q2', title: 'Character Analysis', titleBn: 'চরিত্র বিশ্লেষণ',
        subjectId: 'bengali', subjectName: 'Bengali', chapterId: 'ch1', chapterName: 'পথের দাবী',
        type: 'broad', marks: 5, status: 'published', createdAt: new Date('2024-01-14'), views: 280
    },
    {
        id: 'q3', title: 'Grammar MCQ', titleBn: 'ব্যাকরণ MCQ',
        subjectId: 'bengali', subjectName: 'Bengali', chapterId: 'ch2', chapterName: 'ব্যাকরণ',
        type: 'mcq', marks: 1, status: 'draft', createdAt: new Date('2024-01-13'), views: 0
    },
];

function QuestionManager({
    questions = sampleQuestions,
    onAdd,
    onEdit,
    onDelete,
    className
}: QuestionManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Filter questions
    const filteredQuestions = questions.filter(q => {
        const matchesSearch = q.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
        const matchesType = filterType === 'all' || q.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    // Handle select all
    const handleSelectAll = () => {
        if (selectedIds.length === filteredQuestions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredQuestions.map(q => q.id));
        }
    };

    // Handle select one
    const handleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Handle delete
    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteId && onDelete) {
            onDelete(deleteId);
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Question Manager"
                subtitle="প্রশ্ন ব্যবস্থাপনা"
                icon={<span className="text-xl">📝</span>}
                action={
                    <Button
                        onClick={onAdd}
                        leftIcon={<Plus className="h-4 w-4" />}
                    >
                        Add Question
                    </Button>
                }
            />
            <CardBody>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    {/* Search */}
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Types</option>
                        <option value="short">Short</option>
                        <option value="broad">Broad</option>
                        <option value="mcq">MCQ</option>
                    </select>
                </div>

                {/* Bulk Actions */}
                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-4 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm text-blue-600">{selectedIds.length} selected</span>
                        <Button variant="outline" size="sm">Publish</Button>
                        <Button variant="outline" size="sm">Archive</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === filteredQuestions.length && filteredQuestions.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Question</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Subject</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Type</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Marks</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Views</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.map((question) => {
                                const status = statusConfig[question.status];
                                const StatusIcon = status.icon;

                                return (
                                    <tr
                                        key={question.id}
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    >
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(question.id)}
                                                onChange={() => handleSelect(question.id)}
                                                className="rounded"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{question.titleBn}</p>
                                                <p className="text-xs text-gray-500">{question.chapterName}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{question.subjectName}</td>
                                        <td className="p-3">
                                            <Badge variant="secondary" size="sm" className="uppercase">{question.type}</Badge>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{question.marks}</td>
                                        <td className="p-3">
                                            <Badge
                                                size="sm"
                                                style={{ backgroundColor: `${status.color}20`, color: status.color }}
                                                className="flex items-center gap-1 w-fit"
                                            >
                                                <StatusIcon className="h-3 w-3" />
                                                {status.label}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{question.views}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => onEdit?.(question.id)}
                                                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-green-500">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(question.id)}
                                                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl">📝</span>
                        <p className="text-gray-500 mt-2">No questions found</p>
                    </div>
                )}
            </CardBody>

            {/* Delete Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Question"
                size="sm"
            >
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Are you sure you want to delete this question? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </div>
            </Modal>
        </Card>
    );
}

export default QuestionManager;
