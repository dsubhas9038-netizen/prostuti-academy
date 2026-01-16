'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Play,
    Pause,
    CheckCircle,
    Clock,
    Users
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Test {
    id: string;
    title: string;
    titleBn: string;
    subjectId: string;
    subjectName: string;
    type: 'chapter' | 'full' | 'custom';
    questionCount: number;
    duration: number;
    status: 'draft' | 'published' | 'archived';
    attempts: number;
    avgScore: number;
    createdAt: Date;
}

interface TestManagerProps {
    tests?: Test[];
    onAdd?: () => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

// Sample tests
const sampleTests: Test[] = [
    {
        id: 't1', title: 'Bengali Full Mock Test', titleBn: 'বাংলা সম্পূর্ণ মক টেস্ট',
        subjectId: 'bengali', subjectName: 'Bengali', type: 'full',
        questionCount: 30, duration: 90, status: 'published', attempts: 450, avgScore: 72,
        createdAt: new Date('2024-01-10')
    },
    {
        id: 't2', title: 'History Chapter 1 Test', titleBn: 'ইতিহাস অধ্যায় ১ টেস্ট',
        subjectId: 'history', subjectName: 'History', type: 'chapter',
        questionCount: 15, duration: 30, status: 'published', attempts: 280, avgScore: 68,
        createdAt: new Date('2024-01-08')
    },
    {
        id: 't3', title: 'English Grammar Quiz', titleBn: 'ইংরেজি ব্যাকরণ কু়ইজ',
        subjectId: 'english', subjectName: 'English', type: 'custom',
        questionCount: 20, duration: 25, status: 'draft', attempts: 0, avgScore: 0,
        createdAt: new Date('2024-01-12')
    },
];

const statusConfig = {
    draft: { color: '#F59E0B', icon: Clock, label: 'Draft' },
    published: { color: '#22C55E', icon: CheckCircle, label: 'Live' },
    archived: { color: '#6B7280', icon: Pause, label: 'Archived' },
};

function TestManager({
    tests = sampleTests,
    onAdd,
    onEdit,
    onDelete,
    className
}: TestManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Filter tests
    const filteredTests = tests.filter(t => {
        const matchesSearch = t.titleBn.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteId && onDelete) onDelete(deleteId);
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Test Manager"
                subtitle="টেস্ট ব্যবস্থাপনা"
                icon={<span className="text-xl">🧪</span>}
                action={
                    <Button onClick={onAdd} leftIcon={<Plus className="h-4 w-4" />}>
                        Create Test
                    </Button>
                }
            />
            <CardBody>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tests..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Live</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {/* Tests Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTests.map((test) => {
                        const status = statusConfig[test.status];
                        const StatusIcon = status.icon;

                        return (
                            <div
                                key={test.id}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">{test.titleBn}</h4>
                                        <p className="text-xs text-gray-500">{test.subjectName}</p>
                                    </div>
                                    <Badge
                                        size="sm"
                                        style={{ backgroundColor: `${status.color}20`, color: status.color }}
                                        className="flex items-center gap-1"
                                    >
                                        <StatusIcon className="h-3 w-3" />
                                        {status.label}
                                    </Badge>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{test.questionCount}</p>
                                        <p className="text-xs text-gray-500">Questions</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{test.duration}m</p>
                                        <p className="text-xs text-gray-500">Duration</p>
                                    </div>
                                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{test.attempts}</p>
                                        <p className="text-xs text-gray-500">Attempts</p>
                                    </div>
                                </div>

                                {/* Avg Score */}
                                {test.avgScore > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Avg Score</span>
                                            <span>{test.avgScore}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                                style={{ width: `${test.avgScore}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        leftIcon={<Edit className="h-3 w-3" />}
                                        onClick={() => onEdit?.(test.id)}
                                    >
                                        Edit
                                    </Button>
                                    <button
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500"
                                        onClick={() => handleDelete(test.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredTests.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl">🧪</span>
                        <p className="text-gray-500 mt-2">No tests found</p>
                    </div>
                )}
            </CardBody>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Test" size="sm">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Are you sure? This will remove all test data.</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </div>
            </Modal>
        </Card>
    );
}

export default TestManager;
