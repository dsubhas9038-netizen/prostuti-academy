'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select } from '@/components/ui';

export default function NewQuestionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        content: '',
        type: 'short',
        subject: '',
        chapter: '',
        difficulty: 'medium',
        marks: 5,
        expectedAnswer: '',
        tags: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Question created successfully!');
        router.push('/admin/questions');
    };

    return (
        <AdminLayout title="Add Question" titleBn="প্রশ্ন যোগ করুন">
            {/* Back Button */}
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
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Question Details */}
                        <Card>
                            <CardHeader
                                title="Question Details"
                                subtitle="Enter the question content"
                                icon={<span className="text-xl">📝</span>}
                            />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Question Title"
                                    placeholder="Enter a brief title for the question"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Title (Bengali)"
                                    placeholder="বাংলায় প্রশ্নের শিরোনাম লিখুন"
                                    value={formData.titleBn}
                                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                                />
                                <Textarea
                                    label="Question Content"
                                    placeholder="Enter the full question text..."
                                    rows={6}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                />
                            </CardBody>
                        </Card>

                        {/* Expected Answer */}
                        <Card>
                            <CardHeader
                                title="Expected Answer"
                                subtitle="Model answer for this question"
                                icon={<span className="text-xl">✅</span>}
                            />
                            <CardBody>
                                <Textarea
                                    label="Model Answer"
                                    placeholder="Enter the expected/ideal answer..."
                                    rows={8}
                                    value={formData.expectedAnswer}
                                    onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })}
                                />
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
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Subject' },
                                        { value: 'bengali', label: 'Bengali' },
                                        { value: 'english', label: 'English' },
                                        { value: 'history', label: 'History' },
                                        { value: 'geography', label: 'Geography' },
                                        { value: 'philosophy', label: 'Philosophy' },
                                        { value: 'political-science', label: 'Political Science' }
                                    ]}
                                />
                                <Select
                                    label="Chapter"
                                    value={formData.chapter}
                                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Chapter' },
                                        { value: 'ch1', label: 'Chapter 1' },
                                        { value: 'ch2', label: 'Chapter 2' },
                                        { value: 'ch3', label: 'Chapter 3' }
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
                                    loading={loading}
                                    leftIcon={<Save className="h-4 w-4" />}
                                >
                                    Save Question
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    leftIcon={<Plus className="h-4 w-4" />}
                                >
                                    Save & Add Another
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
