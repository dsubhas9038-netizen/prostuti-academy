'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Upload,
    Edit,
    Trash2,
    Download,
    Eye,
    FileText,
    CheckCircle,
    Clock
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { formatFileSize } from '@/types/pdf';

interface Resource {
    id: string;
    title: string;
    titleBn: string;
    category: string;
    categoryBn: string;
    subjectId: string;
    subjectName: string;
    fileSize: number;
    format: string;
    status: 'draft' | 'published' | 'archived';
    downloads: number;
    createdAt: Date;
}

interface ResourceManagerProps {
    resources?: Resource[];
    onUpload?: () => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

// Sample resources
const sampleResources: Resource[] = [
    {
        id: 'r1', title: 'Pather Dabi Notes', titleBn: 'পথের দাবী নোটস',
        category: 'notes', categoryBn: 'নোটস', subjectId: 'bengali', subjectName: 'Bengali',
        fileSize: 2540, format: 'pdf', status: 'published', downloads: 890,
        createdAt: new Date('2024-01-10')
    },
    {
        id: 'r2', title: 'History Model Paper', titleBn: 'ইতিহাস মডেল পেপার',
        category: 'model-papers', categoryBn: 'মডেল পেপার', subjectId: 'history', subjectName: 'History',
        fileSize: 1850, format: 'pdf', status: 'published', downloads: 650,
        createdAt: new Date('2024-01-08')
    },
    {
        id: 'r3', title: 'English Grammar Guide', titleBn: 'ইংরেজি ব্যাকরণ গাইড',
        category: 'guides', categoryBn: 'গাইড', subjectId: 'english', subjectName: 'English',
        fileSize: 3200, format: 'pdf', status: 'draft', downloads: 0,
        createdAt: new Date('2024-01-12')
    },
];

const statusConfig = {
    draft: { color: '#F59E0B', icon: Clock, label: 'Draft' },
    published: { color: '#22C55E', icon: CheckCircle, label: 'Published' },
    archived: { color: '#6B7280', icon: Clock, label: 'Archived' },
};

function ResourceManager({
    resources = sampleResources,
    onUpload,
    onEdit,
    onDelete,
    className
}: ResourceManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Filter resources
    const filteredResources = resources.filter(r => {
        const matchesSearch = r.titleBn.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || r.category === filterCategory;
        return matchesSearch && matchesCategory;
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
                title="Resource Manager"
                subtitle="রিসোর্স ব্যবস্থাপনা"
                icon={<span className="text-xl">📄</span>}
                action={
                    <Button onClick={onUpload} leftIcon={<Upload className="h-4 w-4" />}>
                        Upload PDF
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
                                placeholder="Search resources..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Categories</option>
                        <option value="notes">Notes</option>
                        <option value="guides">Guides</option>
                        <option value="model-papers">Model Papers</option>
                        <option value="previous-papers">Previous Papers</option>
                    </select>
                </div>

                {/* Resources List */}
                <div className="space-y-3">
                    {filteredResources.map((resource) => {
                        const status = statusConfig[resource.status];
                        const StatusIcon = status.icon;

                        return (
                            <div
                                key={resource.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText className="h-6 w-6 text-red-500" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-gray-900 dark:text-white truncate">{resource.titleBn}</h4>
                                        <Badge
                                            size="sm"
                                            style={{ backgroundColor: `${status.color}20`, color: status.color }}
                                        >
                                            {status.label}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span>{resource.categoryBn}</span>
                                        <span>•</span>
                                        <span>{resource.subjectName}</span>
                                        <span>•</span>
                                        <span>{formatFileSize(resource.fileSize)}</span>
                                    </div>
                                </div>

                                {/* Downloads */}
                                <div className="text-center hidden sm:block">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{resource.downloads}</p>
                                    <p className="text-xs text-gray-500">Downloads</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit?.(resource.id)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-green-500"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(resource.id)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl">📄</span>
                        <p className="text-gray-500 mt-2">No resources found</p>
                    </div>
                )}
            </CardBody>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Resource" size="sm">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Are you sure? This file will be permanently deleted.</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </div>
            </Modal>
        </Card>
    );
}

export default ResourceManager;
