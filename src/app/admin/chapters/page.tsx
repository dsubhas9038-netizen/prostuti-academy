'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Badge, Modal } from '@/components/ui';
import { PageLoading } from '@/components/shared';
// Import services
import { getAllChapters, addChapter, updateChapter, deleteChapter, getSubjects } from '@/lib/admin';
import toast from 'react-hot-toast';

export default function AdminChaptersPage() {
    const [chapters, setChapters] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterSubject, setFilterSubject] = useState<string>('all');
    const [filterSemester, setFilterSemester] = useState<string>('all');

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingChapter, setEditingChapter] = useState<any | null>(null);
    const [deleteChapterData, setDeleteChapterData] = useState<any | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        subjectId: '',
        semester: 1,
        chapterNumber: 1,
        title: '',
        titleBn: '',
        author: '',
        authorBn: '',
        description: '',
        descriptionBn: '',
        isActive: true
    });

    // Load Data
    const loadData = async () => {
        try {
            setLoading(true);
            const [chaptersData, subjectsData] = await Promise.all([
                getAllChapters(),
                getSubjects()
            ]);
            setChapters(chaptersData);
            setSubjects(subjectsData);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter chapters
    const filteredChapters = useMemo(() => {
        return chapters.filter(chapter => {
            const matchesSearch = (chapter.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (chapter.titleBn || '').includes(searchQuery);
            const matchesSubject = filterSubject === 'all' || chapter.subjectId === filterSubject;
            const matchesSemester = filterSemester === 'all' || chapter.semester?.toString() === filterSemester;
            return matchesSearch && matchesSubject && matchesSemester;
        });
    }, [chapters, searchQuery, filterSubject, filterSemester]);

    // Group chapters by subject
    const groupedChapters = useMemo(() => {
        const groups: { [key: string]: any[] } = {};
        filteredChapters.forEach(chapter => {
            const sId = chapter.subjectId;
            if (!groups[sId]) {
                groups[sId] = [];
            }
            groups[sId].push(chapter);
        });
        return groups;
    }, [filteredChapters]);

    // Get subject info helper
    const getSubjectInfo = (subjectId: string) => {
        return subjects.find(s => s.id === subjectId);
    };

    // Handle Add
    const handleAddChapter = async () => {
        try {
            setActionLoading(true);
            await addChapter({
                ...formData,
                totalQuestions: 0,
                order: chapters.filter(c => c.subjectId === formData.subjectId).length + 1
            });
            await loadData();
            setIsAddModalOpen(false);
            resetForm();
            toast.success('Chapter added successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add chapter');
        } finally {
            setActionLoading(false);
        }
    };

    // Handle Edit
    const handleEditChapter = async () => {
        if (!editingChapter) return;
        try {
            setActionLoading(true);
            await updateChapter(editingChapter.id, formData);
            await loadData();
            setEditingChapter(null);
            resetForm();
            toast.success('Chapter updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update chapter');
        } finally {
            setActionLoading(false);
        }
    };

    // Handle Delete
    const handleDeleteChapter = async () => {
        if (!deleteChapterData) return;
        try {
            setActionLoading(true);
            await deleteChapter(deleteChapterData.id);
            await loadData();
            setDeleteChapterData(null);
            toast.success('Chapter deleted successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete chapter');
        } finally {
            setActionLoading(false);
        }
    };

    // Helper functions
    const resetForm = () => {
        setFormData({
            subjectId: '',
            semester: 1,
            chapterNumber: 1,
            title: '',
            titleBn: '',
            author: '',
            authorBn: '',
            description: '',
            descriptionBn: '',
            isActive: true
        });
    };

    const openEditModal = (chapter: any) => {
        setFormData({
            subjectId: chapter.subjectId,
            semester: chapter.semester,
            chapterNumber: chapter.chapterNumber,
            title: chapter.title,
            titleBn: chapter.titleBn,
            author: chapter.author || '',
            authorBn: chapter.authorBn || '',
            description: chapter.description,
            descriptionBn: chapter.descriptionBn,
            isActive: chapter.isActive
        });
        setEditingChapter(chapter);
    };

    if (loading) {
        return (
            <AdminLayout title="Manage Chapters" titleBn="অধ্যায় পরিচালনা">
                <PageLoading message="Loading chapters..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Manage Chapters" titleBn="অধ্যায় পরিচালনা">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        All Chapters ({filteredChapters.length})
                    </h2>
                    <p className="text-sm text-gray-500">Manage chapters for all subjects</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    leftIcon={<Plus className="h-4 w-4" />}
                >
                    Add Chapter
                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardBody>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search chapters..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.icon} {subject.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={filterSemester}
                                onChange={(e) => setFilterSemester(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Semesters</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                            </select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Chapters List */}
            <div className="space-y-6">
                {Object.entries(groupedChapters).map(([subjectId, subjectChapters]) => {
                    const subject = getSubjectInfo(subjectId);
                    if (!subject) return null; // Skip if subject not found (e.g. deleted)

                    return (
                        <Card key={subjectId}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{subject.icon}</span>
                                    <span>{subject.name}</span>
                                    <Badge size="sm">{subjectChapters.length} chapters</Badge>
                                </div>
                            </CardHeader>
                            <CardBody className="p-0">
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {subjectChapters.sort((a, b) => (a.semester - b.semester) || (a.order - b.order)).map((chapter) => (
                                        <div
                                            key={chapter.id}
                                            className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-sm font-bold">
                                                {chapter.chapterNumber}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                                        {chapter.title}
                                                    </h3>
                                                    <Badge size="sm" variant="outline">
                                                        Sem {chapter.semester}
                                                    </Badge>
                                                    {!chapter.isActive && (
                                                        <Badge size="sm" variant="default">Inactive</Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 font-bengali truncate">
                                                    {chapter.titleBn}
                                                    {chapter.author && <span className="text-gray-400"> • {chapter.author}</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="hidden sm:inline">📝 {chapter.totalQuestions} Q</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => openEditModal(chapter)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                                >
                                                    <Edit2 className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteChapterData(chapter)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            {filteredChapters.length === 0 && (
                <Card>
                    <CardBody className="text-center py-12">
                        <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            No chapters found
                        </h3>
                        <p className="text-sm text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </CardBody>
                </Card>
            )}

            {/* Add/Edit Modal */}
            {(isAddModalOpen || editingChapter) && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setEditingChapter(null);
                        resetForm();
                    }}
                    title={editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
                    size="lg"
                >
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subject
                                </label>
                                <select
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.icon} {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Semester
                                </label>
                                <select
                                    value={formData.semester}
                                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                >
                                    <option value={1}>Semester 1</option>
                                    <option value={2}>Semester 2</option>
                                    <option value={3}>Semester 3</option>
                                    <option value={4}>Semester 4</option>
                                </select>
                            </div>
                        </div>

                        <Input
                            label="Chapter Number"
                            type="number"
                            min={1}
                            value={formData.chapterNumber}
                            onChange={(e) => setFormData({ ...formData, chapterNumber: parseInt(e.target.value) })}
                        />

                        <Input
                            label="Chapter Title"
                            placeholder="e.g., Pather Dabi"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <Input
                            label="Title (Bengali)"
                            placeholder="e.g., পথের দাবী"
                            value={formData.titleBn}
                            onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Author"
                                placeholder="e.g., Sarat Chandra"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            />
                            <Input
                                label="Author (Bengali)"
                                placeholder="e.g., শরৎচন্দ্র"
                                value={formData.authorBn}
                                onChange={(e) => setFormData({ ...formData, authorBn: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                placeholder="Brief description of the chapter"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="chapterActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="chapterActive" className="text-sm text-gray-700 dark:text-gray-300">
                                Chapter is active
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setEditingChapter(null);
                                    resetForm();
                                }}
                                disabled={actionLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={editingChapter ? handleEditChapter : handleAddChapter}
                                isLoading={actionLoading}
                                disabled={actionLoading}
                            >
                                {editingChapter ? 'Save Changes' : 'Add Chapter'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {deleteChapterData && (
                <Modal
                    isOpen={true}
                    onClose={() => setDeleteChapterData(null)}
                    title="Delete Chapter"
                >
                    <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete <strong>"{deleteChapterData.title}"</strong>?
                            This will also delete all questions under this chapter.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setDeleteChapterData(null)}
                                disabled={actionLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                className="flex-1"
                                onClick={handleDeleteChapter}
                                isLoading={actionLoading}
                                disabled={actionLoading}
                            >
                                Delete Chapter
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </AdminLayout>
    );
}
