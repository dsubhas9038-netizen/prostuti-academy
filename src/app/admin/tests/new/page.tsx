'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Clock, ListChecks } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select, Checkbox } from '@/components/ui';

export default function NewTestPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        description: '',
        type: 'full',
        subject: '',
        duration: 60,
        totalMarks: 100,
        passingMarks: 40,
        isPublished: false,
        shuffleQuestions: true,
        showResults: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Test created successfully!');
        router.push('/admin/tests');
    };

    return (
        <AdminLayout title="Create Test" titleBn="টেস্ট তৈরি করুন">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    Back to Tests
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Test Details */}
                        <Card>
                            <CardHeader
                                title="Test Details"
                                subtitle="Basic information about the test"
                                icon={<span className="text-xl">🧪</span>}
                            />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Test Title"
                                    placeholder="e.g., Bengali Full Mock Test - Semester 4"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Title (Bengali)"
                                    placeholder="বাংলায় টেস্টের নাম"
                                    value={formData.titleBn}
                                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Describe what this test covers..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </CardBody>
                        </Card>

                        {/* Questions Section */}
                        <Card>
                            <CardHeader
                                title="Questions"
                                subtitle="Add questions to this test"
                                icon={<ListChecks className="h-5 w-5" />}
                            />
                            <CardBody>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
                                    <ListChecks className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                        No questions added yet
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Save the test first, then add questions from the question bank
                                    </p>
                                    <Button variant="outline" disabled>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Questions (Save first)
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Test Settings */}
                        <Card>
                            <CardHeader
                                title="Test Settings"
                                icon={<Clock className="h-5 w-5" />}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Test Type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    options={[
                                        { value: 'full', label: 'Full Mock Test' },
                                        { value: 'chapter', label: 'Chapter Test' },
                                        { value: 'quick', label: 'Quick Quiz' },
                                        { value: 'practice', label: 'Practice Test' }
                                    ]}
                                />
                                <Select
                                    label="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Subject' },
                                        { value: 'bengali', label: 'Bengali' },
                                        { value: 'english', label: 'English' },
                                        { value: 'history', label: 'History' },
                                        { value: 'geography', label: 'Geography' }
                                    ]}
                                />
                                <Input
                                    label="Duration (minutes)"
                                    type="number"
                                    min={10}
                                    max={180}
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                />
                            </CardBody>
                        </Card>

                        {/* Marks Settings */}
                        <Card>
                            <CardHeader
                                title="Marks"
                                icon={<span className="text-xl">📊</span>}
                            />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Total Marks"
                                    type="number"
                                    min={10}
                                    max={200}
                                    value={formData.totalMarks}
                                    onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                                />
                                <Input
                                    label="Passing Marks"
                                    type="number"
                                    min={0}
                                    value={formData.passingMarks}
                                    onChange={(e) => setFormData({ ...formData, passingMarks: parseInt(e.target.value) })}
                                />
                            </CardBody>
                        </Card>

                        {/* Options */}
                        <Card>
                            <CardHeader
                                title="Options"
                                icon={<span className="text-xl">⚙️</span>}
                            />
                            <CardBody className="space-y-3">
                                <Checkbox
                                    label="Shuffle questions"
                                    checked={formData.shuffleQuestions}
                                    onChange={(e) => setFormData({ ...formData, shuffleQuestions: e.target.checked })}
                                />
                                <Checkbox
                                    label="Show results immediately"
                                    checked={formData.showResults}
                                    onChange={(e) => setFormData({ ...formData, showResults: e.target.checked })}
                                />
                                <Checkbox
                                    label="Publish immediately"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
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
                                    Create Test
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
