'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Select, Textarea } from '@/components/ui';
import { updateQuestion, getSubjects, getAllChapters } from '@/lib/admin';
import { getQuestionById } from '@/lib/firebase';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function EditQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const [subjects, setSubjects] = useState<any[]>([]);
    const [chapters, setChapters] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        question: '',
        questionBn: '',
        answer: '',
        answerBn: '',
        type: 'short',
        subjectId: '',
        chapterId: '',
        difficulty: 'medium',
        marks: 5,
        tags: '',
        status: 'published'
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cast questionData to any because getQuestionById might return typed object but we need flexible access or proper type casting
                // Actually better to respect the type if possible.
                const [questionData, subjectsData, chaptersData] = await Promise.all([
                    getQuestionById(id),
                    getSubjects(),
                    getAllChapters()
                ]);

                if (!questionData) {
                    toast.error('Question not found');
                    router.push('/admin/questions');
                    return;
                }

                // Explicitly cast to any to avoid strict type checks if getQuestionById return type is strict but data might be loose
                const q = questionData as any;

                setFormData({
                    question: q.question || '',
                    questionBn: q.questionBn || '',
                    answer: q.answer || '',
                    answerBn: q.answerBn || '',
                    type: q.type || 'short',
                    subjectId: q.subjectId || '',
                    chapterId: q.chapterId || '',
                    difficulty: q.difficulty || 'medium',
                    marks: q.marks || 5,
                    tags: q.tags ? (Array.isArray(q.tags) ? q.tags.join(', ') : q.tags) : '',
                    status: q.isActive ? 'published' : 'draft' // Mapping isActive boolean to status string if needed, or just keep as is
                });

                setSubjects(subjectsData);
                setChapters(chaptersData);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load data');
            } finally {
                setInitialLoading(false);
            }
        };

        if (id) {
            loadData();
        }
    }, [id, router]);

    const filteredChapters = formData.subjectId
        ? chapters.filter(c => c.subjectId === formData.subjectId)
        : [];

    const handleSave = async () => {
        setLoading(true);
        try {
            const subject = subjects.find(s => s.id === formData.subjectId);
            const chapter = chapters.find(c => c.id === formData.chapterId);

            await updateQuestion(id, {
                ...formData,
                isActive: formData.status === 'published', // Map back to boolean
                subjectName: subject?.name || 'Unknown',
                chapterName: chapter?.title || 'Unknown',
                updatedAt: new Date()
            });

            toast.success('Question updated successfully!');
            router.push('/admin/questions');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update question');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <AdminLayout title="Edit Question" titleBn="প্রশ্ন সম্পাদনা করুন">
                <PageLoading message="Loading question..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Question" titleBn="প্রশ্ন সম্পাদনা করুন">
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
                        onClick={() => router.push(`/admin/questions/${id}`)}
                        leftIcon={<Eye className="h-4 w-4" />}
                    >
                        Preview
                    </Button>
                    <Button
                        onClick={handleSave}
                        isLoading={loading}
                        leftIcon={<Save className="h-4 w-4" />}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader title="Question Details" subtitle="প্রশ্নের বিবরণ" />
                        <CardBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Text (English)
                                </label>
                                <textarea
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="Enter question in English..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Text (Bengali)
                                </label>
                                <textarea
                                    value={formData.questionBn}
                                    onChange={(e) => setFormData({ ...formData, questionBn: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="বাংলায় প্রশ্ন লিখুন..."
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Answer Section */}
                    <Card>
                        <CardHeader title="Model Answer" subtitle="আদর্শ উত্তর" />
                        <CardBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Answer (English)
                                </label>
                                <textarea
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="Enter model answer in English..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Answer (Bengali)
                                </label>
                                <textarea
                                    value={formData.answerBn}
                                    onChange={(e) => setFormData({ ...formData, answerBn: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="বাংলায় উত্তর লিখুন..."
                                />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader title="Settings" />
                        <CardBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Subject
                                </label>
                                <select
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value, chapterId: '' })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Chapter
                                </label>
                                <select
                                    value={formData.chapterId}
                                    onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                                    disabled={!formData.subjectId}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50"
                                >
                                    <option value="">Select Chapter</option>
                                    {filteredChapters.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                >
                                    <option value="short">Short Answer</option>
                                    <option value="long">Long Answer</option>
                                    <option value="broad">Broad Answer</option>
                                    <option value="mcq">MCQ</option>
                                </select>
                            </div>
                            <Input
                                label="Marks"
                                type="number"
                                min={1}
                                max={20}
                                value={formData.marks}
                                onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Difficulty
                                </label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader title="Status" />
                        <CardBody>
                            <div className="space-y-2">
                                {['draft', 'published', 'archived'].map((status) => (
                                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="status"
                                            value={status}
                                            checked={formData.status === status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="rounded-full"
                                        />
                                        <span className="capitalize">{status}</span>
                                    </label>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
