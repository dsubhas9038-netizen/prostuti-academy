'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout, TestManager } from '@/components/admin';
import { fetchAdminTests, deleteTest } from '@/lib/admin';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function AdminTestsPage() {
    const router = useRouter();
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTests = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminTests();
            setTests(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load tests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTests();
    }, []);

    const handleAdd = () => {
        router.push('/admin/tests/new');
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/tests/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTest(id);
            setTests(tests.filter(t => t.id !== id));
            toast.success('Test deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete test');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Tests" titleBn="টেস্টসমূহ">
                <PageLoading message="Loading tests..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Tests" titleBn="টেস্টসমূহ">
            <TestManager
                tests={tests}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
