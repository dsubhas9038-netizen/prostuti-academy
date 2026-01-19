'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, User } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Input, Select } from '@/components/ui';
import { updateUser } from '@/lib/admin';
import { getDocument } from '@/lib/firebase/firestore'; // Assuming generic getter exists or I need to use db directly
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { PageLoading } from '@/components/shared';
import { adminRoleConfig, AdminRole } from '@/types/admin';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function EditUserPage() {
    const router = useRouter();
    const { userRole } = useAuth();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        role: 'user',
        phoneNumber: '',
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                // We'll fetch directly since we don't have a specific getUserById exported yet in admin.ts
                // or we can use the generic one if available.
                const userDoc = await getDoc(doc(db, 'users', id));

                if (!userDoc.exists()) {
                    toast.error('User not found');
                    router.push('/admin/users');
                    return;
                }

                const data = userDoc.data();

                // Security Check: Prevent non-Super Admins from editing protected users
                if (data.role === 'super_admin' && userRole !== 'super_admin') {
                    toast.error('Access Denied: You cannot edit a Super Admin.');
                    router.push('/admin/users');
                    return;
                }

                setFormData({
                    displayName: data.displayName || '',
                    email: data.email || '',
                    role: data.role || 'user',
                    phoneNumber: data.phoneNumber || '',
                });
            } catch (error) {
                console.error(error);
                toast.error('Failed to load user data');
            } finally {
                setInitialLoading(false);
            }
        };

        if (id) {
            loadUser();
        }
    }, [id, router, userRole]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateUser(id, formData);
            toast.success('User updated successfully!');
            router.push('/admin/users');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <AdminLayout title="Edit User" titleBn="ব্যবহারকারী সম্পাদনা">
                <PageLoading message="Loading user data..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit User" titleBn="ব্যবহারকারী সম্পাদনা">
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
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader
                            title="Edit Profile"
                            subtitle="Update user information and role"
                            icon={<User className="h-5 w-5" />}
                        />
                        <CardBody className="space-y-6">
                            <Input
                                label="Full Name"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                required
                            />
                            <Input
                                label="Email Address"
                                value={formData.email}
                                disabled // Email usually shouldn't be changed by admin easily without auth implications
                                className="bg-gray-50 dark:bg-gray-900 cursor-not-allowed text-gray-500"
                            />
                            <Input
                                label="Phone Number"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                placeholder="+880..."
                            />
                            <Select
                                label="Role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                options={[
                                    { value: 'user', label: 'User' },
                                    ...Object.entries(adminRoleConfig).map(([key, config]) => ({
                                        value: key,
                                        label: config.label
                                    }))
                                ]}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    isLoading={loading}
                                    leftIcon={<Save className="h-4 w-4" />}
                                >
                                    Update User
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </form>
        </AdminLayout>
    );
}
