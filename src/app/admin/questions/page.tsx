'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout, QuestionManager } from '@/components/admin';
import { Modal, Button } from '@/components/ui';
import { PageLoading } from '@/components/shared';
import { fetchAdminQuestions, deleteQuestion } from '@/lib/admin';
import toast from 'react-hot-toast';

export default function AdminQuestionsPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminQuestions();
            setQuestions(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load questions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    // Navigate to add question page
    const handleAdd = () => {
        router.push('/admin/questions/new');
    };

    // Navigate to edit question page
    const handleEdit = (id: string) => {
        router.push(`/admin/questions/edit/${id}`);
    };

    // Navigate to view question page  
    const handleView = (id: string) => {
        router.push(`/admin/questions/${id}`);
    };

    // Show delete confirmation
    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            setActionLoading(true);
            await deleteQuestion(deleteId);
            setQuestions(questions.filter(q => q.id !== deleteId));
            toast.success('Question deleted successfully!');
            setShowDeleteConfirm(false);
            setDeleteId(null);
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete question');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Questions" titleBn="প্রশ্নসমূহ">
                <PageLoading message="Loading questions..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Questions" titleBn="প্রশ্নসমূহ">
            <QuestionManager
                questions={questions}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Delete Question"
                size="sm"
            >
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Are you sure you want to delete this question? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={actionLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={confirmDelete}
                        isLoading={actionLoading}
                        disabled={actionLoading}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </AdminLayout>
    );
}
