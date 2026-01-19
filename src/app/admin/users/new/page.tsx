'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Select, Checkbox } from '@/components/ui';

export default function NewUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        role: 'user',
        stream: '',
        semester: '4',
        sendWelcomeEmail: true,
        isActive: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('User created successfully!');
        router.push('/admin/users');
    };

    return (
        <AdminLayout title="Add User" titleBn="ব্যবহারকারী যোগ করুন">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    Back to Users
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User Details */}
                        <Card>
                            <CardHeader
                                title="User Information"
                                subtitle="Basic user account details"
                                icon={<UserPlus className="h-5 w-5" />}
                            />
                            <CardBody className="space-y-4">
                                <Input
                                    label="Full Name"
                                    placeholder="Enter user's full name"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </CardBody>
                        </Card>

                        {/* Academic Details */}
                        <Card>
                            <CardHeader
                                title="Academic Details"
                                subtitle="Student's academic information"
                                icon={<span className="text-xl">🎓</span>}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="Stream"
                                    value={formData.stream}
                                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                    options={[
                                        { value: '', label: 'Select Stream' },
                                        { value: 'arts', label: 'Arts' },
                                        { value: 'science', label: 'Science' },
                                        { value: 'commerce', label: 'Commerce' }
                                    ]}
                                />
                                <Select
                                    label="Semester"
                                    value={formData.semester}
                                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    options={[
                                        { value: '1', label: 'Semester 1' },
                                        { value: '2', label: 'Semester 2' },
                                        { value: '3', label: 'Semester 3' },
                                        { value: '4', label: 'Semester 4' }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Role & Permissions */}
                        <Card>
                            <CardHeader
                                title="Role & Permissions"
                                icon={<span className="text-xl">🔐</span>}
                            />
                            <CardBody className="space-y-4">
                                <Select
                                    label="User Role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    options={[
                                        { value: 'user', label: 'Student' },
                                        { value: 'content_manager', label: 'Content Manager' },
                                        { value: 'moderator', label: 'Moderator' },
                                        { value: 'admin', label: 'Admin' }
                                    ]}
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
                                    label="Send welcome email"
                                    checked={formData.sendWelcomeEmail}
                                    onChange={(e) => setFormData({ ...formData, sendWelcomeEmail: e.target.checked })}
                                />
                                <Checkbox
                                    label="Account is active"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
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
                                    Create User
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
