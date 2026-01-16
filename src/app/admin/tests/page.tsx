'use client';

import React from 'react';
import { AdminLayout, TestManager } from '@/components/admin';

export default function AdminTestsPage() {
    const handleAdd = () => {
        console.log('Create test');
    };

    const handleEdit = (id: string) => {
        console.log('Edit test', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete test', id);
    };

    return (
        <AdminLayout title="Tests" titleBn="টেস্টসমূহ">
            <TestManager
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
