'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, ResourceManager } from '@/components/admin';
import { getResources, deleteResource, addResource } from '@/lib/admin';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

export default function AdminResourcesPage() {
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadResources = async () => {
        try {
            setLoading(true);
            const data = await getResources();
            setResources(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load resources');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadResources();
    }, []);

    const handleUpload = async (data: any) => {
        try {
            const id = await addResource(data);
            // Optimistic update or refetch
            // Since we have the ID, we can just add it to the list locally for instant feedback
            setResources([{ id, ...data, createdAt: new Date() }, ...resources]);
            toast.success('Resource added successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add resource');
        }
    };

    const handleEdit = (id: string) => {
        toast('Edit functionality coming soon.', { icon: '🚧' });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteResource(id);
            setResources(resources.filter(r => r.id !== id));
            toast.success('Resource deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete resource');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Resources" titleBn="রিসোর্সসমূহ">
                <PageLoading message="Loading resources..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Resources" titleBn="রিসোর্সসমূহ">
            <ResourceManager
                resources={resources}
                onUpload={handleUpload}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
