'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, FileText } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select } from '@/components/ui';

export default function UploadResourcePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        description: '',
        type: 'pdf',
        subject: '',
        chapter: '',
        tags: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        alert('Resource uploaded successfully!');
        router.push('/admin/resources');
    };

    return (
        <AdminLayout title="Upload Resource" titleBn="রিসোর্স আপলোড করুন">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    Back to Resources
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* File Upload */}
                        <Card>
                            <CardHeader
                                title="Upload File"
                                subtitle="Select a PDF or document to upload"
                                icon={<Upload className="h-5 w-5" />}
                            />
                            <CardBody>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
                                    {file ? (
                                        <div className="flex items-center justify-center gap-4">
                                            <FileText className="h-12 w-12 text-blue-500" />
                                            <div className="text-left">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setFile(null)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                                Drag and drop your file here
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-4">
                                                or click to browse (PDF, max 10MB)
                                            </p>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                id="file-upload"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="file-upload">
                                                <Button type="button" variant="outline" as="span">
                                                    Choose File
                                                </Button>
                                            </label>
                                        </>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Resource Details */}
                        <Card>
                            <CardHeader
                                title="Resource Details"
                                subtitle="Information about the resource"
                                icon={<span className="text-xl">📄</span>}
                            />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Title"
                                    placeholder="e.g., Bengali Semester 4 Notes"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Title (Bengali)"
                                    placeholder="বাংলায় শিরোনাম"
                                    value={formData.titleBn}
                                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Describe what this resource contains..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Classification */}
                        <Card>
                            <CardHeader
                                title="Classification"
                                icon={<span className="text-xl">📚</span>}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Resource Type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    options={[
                                        { value: 'pdf', label: 'PDF Notes' },
                                        { value: 'syllabus', label: 'Syllabus' },
                                        { value: 'pyq', label: 'Previous Year Questions' },
                                        { value: 'guide', label: 'Study Guide' }
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
                                <Select
                                    label="Chapter (Optional)"
                                    value={formData.chapter}
                                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                    options={[
                                        { value: '', label: 'All Chapters' },
                                        { value: 'ch1', label: 'Chapter 1' },
                                        { value: 'ch2', label: 'Chapter 2' }
                                    ]}
                                />
                                <Input
                                    label="Tags"
                                    placeholder="notes, important, exam"
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
                                    disabled={!file}
                                    leftIcon={<Save className="h-4 w-4" />}
                                >
                                    Upload Resource
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
