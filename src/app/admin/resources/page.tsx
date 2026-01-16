'use client';

import React from 'react';
import { AdminLayout, ResourceManager } from '@/components/admin';

export default function AdminResourcesPage() {
    const handleUpload = () => {
        console.log('Upload resource');
    };

    const handleEdit = (id: string) => {
        console.log('Edit resource', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete resource', id);
    };

    return (
        <AdminLayout title="Resources" titleBn="রিসোর্সসমূহ">
            <ResourceManager
                onUpload={handleUpload}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
