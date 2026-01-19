'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select } from '@/components/ui';
import { addQuestion, getSubjects, getAllChapters } from '@/lib/admin';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function NewQuestionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Data for dropdowns
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
        const loadMetadata = async () => {
            try {
                const [subjectsData, chaptersData] = await Promise.all([
                    getSubjects(),
                    getAllChapters()
                ]);
                setSubjects(subjectsData);
                setChapters(chaptersData);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load metadata');
            } finally {
                setInitialLoading(false);
            }
        };
        loadMetadata();
    }, []);

    const filteredChapters = formData.subjectId
        ? chapters.filter(c => c.subjectId === formData.subjectId)
        : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.subjectId || !formData.chapterId) {
            toast.error('Please select both Subject and Chapter');
            setLoading(false);
            return;
        }

        try {
            const subject = subjects.find(s => s.id === formData.subjectId);
            const chapter = chapters.find(c => c.id === formData.chapterId);

            await addQuestion({
                ...formData,
                subjectName: subject?.name || 'Unknown',
                chapterName: chapter?.title || 'Unknown',
                views: 0,
                isActive: formData.status === 'published',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            toast.success('Question created successfully!');
            router.push('/admin/questions');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create question');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <AdminLayout title="Add Question" titleBn="প্রশ্ন যোগ করুন">
                <PageLoading message="Loading options..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Add Question" titleBn="প্রশ্ন যোগ করুন">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    Back to Questions
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader
                                title="Question Details"
                                subtitle="Enter the question content"
                                icon={<span className="text-xl">📝</span>}
                            />
                            <CardBody className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Question Text (English)
                                    </label>
                                    <Textarea
                                        placeholder="Enter question in English..."
                                        rows={3}
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Question Text (Bengali)
                                    </label>
                                    <Textarea
                                        placeholder="বাংলায় প্রশ্ন লিখুন..."
                                        rows={3}
                                        value={formData.questionBn}
                                        onChange={(e) => setFormData({ ...formData, questionBn: e.target.value })}
                                        required
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Expected Answer"
                                subtitle="Model answer for this question"
                                icon={<span className="text-xl">✅</span>}
                            />
                            <CardBody className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Answer (English)
                                    </label>
                                    <Textarea
                                        placeholder="Enter model answer in English..."
                                        rows={4}
                                        value={formData.answer}
                                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Answer (Bengali)
                                    </label>
                                    <Textarea
                                        placeholder="বাংলায় উত্তর লিখুন..."
                                        rows={4}
                                        value={formData.answerBn}
                                        onChange={(e) => setFormData({ ...formData, answerBn: e.target.value })}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Question Type */}
                        <Card>
                            <CardHeader
                                title="Question Type"
                                icon={<span className="text-xl">⚙️</span>}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    options={[
                                        { value: 'mcq', label: 'MCQ (Multiple Choice)' },
                                        { value: 'short', label: 'Short Answer' },
                                        { value: 'long', label: 'Long Answer' },
                                        { value: 'broad', label: 'Broad Question' }
                                    ]}
                                />
                                <Select
                                    label="Difficulty"
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    options={[
                                        { value: 'easy', label: 'Easy' },
                                        { value: 'medium', label: 'Medium' },
                                        { value: 'hard', label: 'Hard' }
                                    ]}
                                />
                                <Input
                                    label="Marks"
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={formData.marks}
                                    onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
                                />
                            </CardBody>
                        </Card>

                        {/* Subject & Chapter */}
                        <Card>
                            <CardHeader
                                title="Classification"
                                icon={<span className="text-xl">📚</span>}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Subject"
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value, chapterId: '' })}
                                    options={[
                                        { value: '', label: 'Select Subject' },
                                        ...subjects.map(s => ({ value: s.id, label: s.name }))
                                    ]}
                                />
                                <Select
                                    label="Chapter"
                                    value={formData.chapterId}
                                    onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                                    disabled={!formData.subjectId}
                                    options={[
                                        { value: '', label: 'Select Chapter' },
                                        ...filteredChapters.map(c => ({ value: c.id, label: c.title }))
                                    ]}
                                />
                                <Input
                                    label="Tags (comma separated)"
                                    placeholder="exam, important, mcq"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </CardBody>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardBody className="space-y-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    isLoading={loading}
                                    leftIcon={<Save className="h-4 w-4" />}
                                >
                                    Save Question
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
