'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, Button, Input, Badge, Modal } from '@/components/ui';
import { PageLoading } from '@/components/shared';
// Import from new admin service
import { getSubjects, addSubject, updateSubject, deleteSubject, Subject } from '@/lib/admin';
import toast from 'react-hot-toast';

export default function AdminSubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStream, setFilterStream] = useState<string>('all');

    // Modal & Form States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

    // ...



    // ...

    // In JSX:
    // setDeleteSubjectData(subject) -> setSubjectToDelete(subject)
    // if (deleteSubject) -> if (subjectToDelete)
    const [actionLoading, setActionLoading] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        nameBn: '',
        icon: '📚',
        color: '#3B82F6',
        stream: 'arts',
        isActive: true
    });

    // 1. Load Data
    const loadSubjects = async () => {
        try {
            setLoading(true);
            const data = await getSubjects();
            setSubjects(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load subjects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    // Filter subjects
    const filteredSubjects = subjects.filter(subject => {
        const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.nameBn.includes(searchQuery);
        const matchesStream = filterStream === 'all' || subject.stream === filterStream;
        return matchesSearch && matchesStream;
    });

    // 2. Handle Add
    const handleAddSubject = async () => {
        try {
            setActionLoading(true);
            await addSubject({
                name: formData.name,
                nameBn: formData.nameBn,
                icon: formData.icon,
                color: formData.color,
                stream: formData.stream,
                semesters: [1, 2, 3, 4], // Default semesters
                totalChapters: 0,
                totalQuestions: 0,
                order: subjects.length + 1,
                isActive: formData.isActive
            });
            await loadSubjects(); // Reload
            setIsAddModalOpen(false);
            resetForm();
            toast.success('Subject added successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add subject');
        } finally {
            setActionLoading(false);
        }
    };

    // 3. Handle Edit
    const handleEditSubject = async () => {
        if (!editingSubject) return;
        try {
            setActionLoading(true);
            await updateSubject(editingSubject.id, {
                name: formData.name,
                nameBn: formData.nameBn,
                icon: formData.icon,
                color: formData.color,
                stream: formData.stream,
                isActive: formData.isActive
            });
            await loadSubjects(); // Reload
            setEditingSubject(null);
            resetForm();
            toast.success('Subject updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update subject');
        } finally {
            setActionLoading(false);
        }
    };

    // 4. Handle Delete
    const handleDeleteSubject = async () => {
        if (!subjectToDelete) return;
        try {
            setActionLoading(true);
            await deleteSubject(subjectToDelete.id);
            await loadSubjects(); // Reload
            setSubjectToDelete(null);
            toast.success('Subject deleted successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete subject');
        } finally {
            setActionLoading(false);
        }
    };

    // Helper functions
    const resetForm = () => {
        setFormData({
            name: '',
            nameBn: '',
            icon: '📚',
            color: '#3B82F6',
            stream: 'arts',
            isActive: true
        });
    };

    const openEditModal = (subject: Subject) => {
        setFormData({
            name: subject.name,
            nameBn: subject.nameBn,
            icon: subject.icon,
            color: subject.color,
            stream: subject.stream,
            isActive: subject.isActive
        });
        setEditingSubject(subject);
    };

    const icons = ['📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🎓'];
    const colors = ['#DC2626', '#059669', '#2563EB', '#D97706', '#7C3AED', '#DB2777', '#0891B2', '#CA8A04'];

    if (loading) {
        return (
            <AdminLayout title="Manage Subjects" titleBn="বিষয় পরিচালনা">
                <PageLoading message="Loading subjects..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Manage Subjects" titleBn="বিষয় পরিচালনা">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        All Subjects ({filteredSubjects.length})
                    </h2>
                    <p className="text-sm text-gray-500">Manage subjects for your platform</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    leftIcon={<Plus className="h-4 w-4" />}
                >
                    Add Subject
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
                                    placeholder="Search subjects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterStream}
                                onChange={(e) => setFilterStream(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Streams</option>
                                <option value="arts">Arts</option>
                                <option value="science">Science</option>
                                <option value="commerce">Commerce</option>
                            </select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Subjects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSubjects.map((subject) => (
                    <Card key={subject.id} className="group hover:shadow-lg transition-shadow">
                        <CardBody>
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: `${subject.color}20` }}
                                >
                                    {subject.icon}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Badge
                                        size="sm"
                                        variant={subject.isActive ? 'success' : 'default'}
                                    >
                                        {subject.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                    <button
                                        onClick={() => openEditModal(subject)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                    >
                                        <Edit2 className="h-4 w-4 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={() => setSubjectToDelete(subject)}
                                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {subject.name}
                            </h3>
                            <p className="text-sm text-gray-500 font-bengali mb-4">
                                {subject.nameBn}
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{subject.totalChapters} Chapters</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <span>📝</span>
                                    <span>{subject.totalQuestions} Questions</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Badge size="sm" style={{ backgroundColor: `${subject.color}20`, color: subject.color }}>
                                    {subject.stream.charAt(0).toUpperCase() + subject.stream.slice(1)}
                                </Badge>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {(isAddModalOpen || editingSubject) && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setEditingSubject(null);
                        resetForm();
                    }}
                    title={editingSubject ? 'Edit Subject' : 'Add New Subject'}
                >
                    <div className="space-y-4">
                        <Input
                            label="Subject Name"
                            placeholder="e.g., Bengali"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Name (Bengali)"
                            placeholder="e.g., বাংলা"
                            value={formData.nameBn}
                            onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Icon
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {icons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, icon })}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border-2 transition-all ${formData.icon === icon
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color })}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === color
                                            ? 'border-gray-900 dark:border-white scale-110'
                                            : 'border-transparent hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Stream
                            </label>
                            <select
                                value={formData.stream}
                                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                                <option value="arts">Arts</option>
                                <option value="science">Science</option>
                                <option value="commerce">Commerce</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="rounded border-gray-300"
                            />
                            <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                                Subject is active
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setEditingSubject(null);
                                    resetForm();
                                }}
                                disabled={actionLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={editingSubject ? handleEditSubject : handleAddSubject}
                                isLoading={actionLoading}
                                disabled={actionLoading}
                            >
                                {editingSubject ? 'Save Changes' : 'Add Subject'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {subjectToDelete && (
                <Modal
                    isOpen={!!subjectToDelete}
                    onClose={() => setSubjectToDelete(null)}
                    title="Confirm Delete"
                >
                    <div>
                        <p className="mb-4">
                            Are you sure you want to delete <span className="font-semibold">{subjectToDelete?.name}</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setSubjectToDelete(null)}
                                disabled={actionLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                className="flex-1"
                                onClick={handleDeleteSubject}
                                isLoading={actionLoading}
                                disabled={actionLoading}
                            >
                                Delete Subject
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </AdminLayout>
    );
}
