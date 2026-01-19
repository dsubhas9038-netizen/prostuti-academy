'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Clock, User, BookOpen, Tag } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { getQuestionById } from '@/lib/firebase';
import { deleteQuestion } from '@/lib/admin';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function ViewQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [question, setQuestion] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestionById(id);
                if (!data) {
                    toast.error('Question not found');
                    router.push('/admin/questions');
                    return;
                }
                setQuestion(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load question details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchQuestion();
        }
    }, [id, router]);

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteQuestion(id);
            toast.success('Question deleted successfully');
            router.push('/admin/questions');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete question');
            setDeleteLoading(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="View Question" titleBn="প্রশ্ন দেখুন">
                <PageLoading message="Loading question details..." />
            </AdminLayout>
        );
    }

    if (!question) return null;

    const statusColors: Record<string, string> = {
        draft: '#F59E0B',
        published: '#22C55E',
        archived: '#6B7280',
    };

    const difficultyLabels: Record<string, { label: string; color: string }> = {
        easy: { label: 'Easy', color: '#22C55E' },
        medium: { label: 'Medium', color: '#F59E0B' },
        hard: { label: 'Hard', color: '#EF4444' },
    };

    const statusColor = statusColors[question.status] || statusColors.draft;
    const difficulty = difficultyLabels[question.difficulty] || difficultyLabels.medium;

    return (
        <AdminLayout title="View Question" titleBn="প্রশ্ন দেখুন">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    Back
                </Button>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/admin/questions/edit/${id}`)}
                        leftIcon={<Edit className="h-4 w-4" />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader
                            title={question.titleBn}
                            subtitle={question.title}
                        />
                        <CardBody>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                    style={{
                                        backgroundColor: `${statusColor}20`,
                                        color: statusColor
                                    }}
                                >
                                    {question.status ? (question.status.charAt(0).toUpperCase() + question.status.slice(1)) : 'Draft'}
                                </Badge>
                                <Badge variant="secondary" className="uppercase">
                                    {question.type}
                                </Badge>
                                <Badge
                                    style={{
                                        backgroundColor: `${difficulty.color}20`,
                                        color: difficulty.color
                                    }}
                                >
                                    {difficulty.label}
                                </Badge>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <h3 className="text-lg font-semibold mb-2">Question Content</h3>
                                <p className="text-gray-700 dark:text-gray-300 font-bengali text-lg mb-4 whitespace-pre-wrap">
                                    {question.content}
                                </p>
                                {question.contentEn && (
                                    <p className="text-gray-500 text-sm italic whitespace-pre-wrap">
                                        {question.contentEn}
                                    </p>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Model Answer */}
                    <Card>
                        <CardHeader title="Model Answer" subtitle="আদর্শ উত্তর" />
                        <CardBody>
                            <p className="text-gray-700 dark:text-gray-300 font-bengali whitespace-pre-wrap">
                                {question.modelAnswer || question.expectedAnswer || 'No model answer provided.'}
                            </p>
                        </CardBody>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Details */}
                    <Card>
                        <CardHeader title="Details" />
                        <CardBody className="space-y-4">
                            <div className="flex items-center gap-3">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Subject</p>
                                    <p className="font-medium">{question.subjectName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Tag className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Chapter</p>
                                    <p className="font-medium">{question.chapterName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <p className="text-sm text-gray-500">Marks</p>
                                    <p className="font-medium">{question.marks}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="font-medium">
                                        {question.createdAt?.toDate ? question.createdAt.toDate().toLocaleDateString() :
                                            (question.createdAt instanceof Date ? question.createdAt.toLocaleDateString() : 'N/A')}
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Tags */}
                    {question.tags && (Array.isArray(question.tags) ? question.tags.length > 0 : question.tags) && (
                        <Card>
                            <CardHeader title="Tags" />
                            <CardBody>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(question.tags) ? question.tags : question.tags.split(',')).map((tag: string, i: number) => (
                                        <Badge key={i} variant="secondary">
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {/* Stats */}
                    <Card>
                        <CardHeader title="Statistics" />
                        <CardBody>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-500">{question.views || 0}</p>
                                <p className="text-sm text-gray-500">Total Views</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

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
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={deleteLoading}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete} isLoading={deleteLoading}>Delete</Button>
                </div>
            </Modal>
        </AdminLayout>
    );
}
