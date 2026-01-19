'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select } from '@/components/ui';
import { updateTest, getSubjects } from '@/lib/admin';
import { getTestById } from '@/lib/firebase';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function EditTestPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [subjects, setSubjects] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        description: '',
        subjectId: '',
        type: 'full',
        duration: 30,
        passingMarks: 40,
        totalMarks: 100,
        status: 'draft'
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [testData, subjectsData] = await Promise.all([
                    getTestById(id),
                    getSubjects()
                ]);

                if (!testData) {
                    toast.error('Test not found');
                    router.push('/admin/tests');
                    return;
                }

                setFormData({
                    title: testData.title || '',
                    titleBn: testData.titleBn || '',
                    description: testData.description || '',
                    subjectId: testData.subjectId || '',
                    type: testData.type || 'full',
                    duration: testData.duration || 30,
                    passingMarks: testData.passingMarks || 40,
                    totalMarks: testData.totalMarks || 100,
                    status: testData.isActive ? 'published' : 'draft'
                });

                setSubjects(subjectsData);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const subject = subjects.find(s => s.id === formData.subjectId);

            const { status, ...testData } = formData;

            await updateTest(id, {
                ...testData,
                isActive: status === 'published',
                subjectName: subject?.name || 'Unknown'
            });

            toast.success('Test updated successfully!');
            router.push('/admin/tests');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update test');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <AdminLayout title="Edit Test" titleBn="টেস্ট সম্পাদনা">
                <PageLoading message="Loading test data..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Test" titleBn="টেস্ট সম্পাদনা">
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
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader title="Test Details" subtitle="টেস্টের বিবরণ" />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Test Title (English)"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="e.g. Weekly Mock Test 1"
                                />
                                <Input
                                    label="Test Title (Bengali)"
                                    value={formData.titleBn}
                                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                                    required
                                    placeholder="বাংলায় শিরোনাম"
                                />
                                <Textarea
                                    label="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    placeholder="Test instructions or description..."
                                />
                            </CardBody>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader title="Configuration" />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Subject"
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Subject' },
                                        ...subjects.map(s => ({ value: s.id, label: s.name }))
                                    ]}
                                />
                                <Select
                                    label="Type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    options={[
                                        { value: 'full', label: 'Full Mock Test' },
                                        { value: 'chapter', label: 'Chapter Wise' },
                                        { value: 'custom', label: 'Custom' }
                                    ]}
                                />
                                <Input
                                    label="Duration (Minutes)"
                                    type="number"
                                    min={5}
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                />
                                <Input
                                    label="Total Marks"
                                    type="number"
                                    min={10}
                                    value={formData.totalMarks}
                                    onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                                />
                                <Select
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    options={[
                                        { value: 'draft', label: 'Draft' },
                                        { value: 'published', label: 'Published' },
                                        { value: 'archived', label: 'Archived' }
                                    ]}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    isLoading={loading}
                                    leftIcon={<Save className="h-4 w-4" />}
                                >
                                    Update Test
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
