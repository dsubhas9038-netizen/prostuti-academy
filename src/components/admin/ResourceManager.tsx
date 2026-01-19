'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Upload,
    Edit,
    Trash2,
    Eye,
    FileText,
    CheckCircle,
    Clock,
    Link as LinkIcon
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal, Input, Select } from '@/components/ui';
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
    driveLink?: string;
}

interface ResourceManagerProps {
    resources?: Resource[];
    onUpload?: (data: any) => Promise<void>;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

const statusConfig = {
    draft: { color: '#F59E0B', icon: Clock, label: 'Draft' },
    published: { color: '#22C55E', icon: CheckCircle, label: 'Published' },
    archived: { color: '#6B7280', icon: Clock, label: 'Archived' },
};

function ResourceManager({
    resources = [],
    onUpload,
    onEdit,
    onDelete,
    className
}: ResourceManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Add Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        category: 'notes',
        subject: 'bengali',
        driveLink: '',
        status: 'published'
    });

    // Filter resources
    const filteredResources = resources.filter(r => {
        const titleBn = r.titleBn || '';
        const title = r.title || '';
        const matchesSearch = titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            title.toLowerCase().includes(searchQuery.toLowerCase());
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

    const handleUploadSubmit = async () => {
        if (!onUpload) return;
        setUploadLoading(true);
        try {
            await onUpload({
                ...formData,
                categoryBn: getCategoryBn(formData.category),
                subjectName: getSubjectName(formData.subject),
                fileSize: 0, // Placeholder
                format: 'pdf', // Default
                downloads: 0
            });
            setShowAddModal(false);
            setFormData({
                title: '',
                titleBn: '',
                category: 'notes',
                subject: 'bengali',
                driveLink: '',
                status: 'published'
            });
        } catch (error) {
            console.error(error);
        } finally {
            setUploadLoading(false);
        }
    };

    const getCategoryBn = (cat: string) => {
        switch (cat) {
            case 'notes': return 'নোটস';
            case 'guides': return 'গাইড';
            case 'model-papers': return 'মডেল পেপার';
            case 'previous-papers': return 'বিগত বছরের প্রশ্ন';
            default: return cat;
        }
    };

    const getSubjectName = (sub: string) => {
        // Simple mapping, ideally fetched from subjects
        return sub.charAt(0).toUpperCase() + sub.slice(1);
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Resource Manager"
                subtitle="রিসোর্স ব্যবস্থাপনা"
                icon={<span className="text-xl">📄</span>}
                action={
                    <Button onClick={() => setShowAddModal(true)} leftIcon={<Upload className="h-4 w-4" />}>
                        Add Resource
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
                        const status = statusConfig[resource.status] || statusConfig.draft;
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
                                        <h4 className="font-medium text-gray-900 dark:text-white truncate">{resource.titleBn || resource.title}</h4>
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
                                        {resource.driveLink && (
                                            <>
                                                <span>•</span>
                                                <a href={resource.driveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline">
                                                    <LinkIcon className="h-3 w-3" /> Drive Link
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Downloads */}
                                <div className="text-center hidden sm:block">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{resource.downloads}</p>
                                    <p className="text-xs text-gray-500">Downloads</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    {resource.driveLink && (
                                        <a
                                            href={resource.driveLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </a>
                                    )}
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

            {/* Delete Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Resource" size="sm">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Are you sure? This file will be permanently deleted.</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </div>
            </Modal>

            {/* Add Resource Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Resource" size="lg">
                <div className="space-y-4">
                    <Input
                        label="Title (English)"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. History Notes"
                        required
                    />
                    <Input
                        label="Title (Bengali)"
                        value={formData.titleBn}
                        onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                        placeholder="e.g. ইতিহাসের নোট"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="notes">Notes</option>
                                <option value="guides">Guides</option>
                                <option value="model-papers">Model Papers</option>
                                <option value="previous-papers">Previous Papers</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            >
                                <option value="bengali">Bengali</option>
                                <option value="english">English</option>
                                <option value="history">History</option>
                                <option value="geography">Geography</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Drive Link (URL)"
                        value={formData.driveLink}
                        onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                        <Button onClick={handleUploadSubmit} isLoading={uploadLoading}>Save Resource</Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
}

export default ResourceManager;
