'use client';

import React from 'react';
import { AdminLayout, UserManager } from '@/components/admin';

export default function AdminUsersPage() {
    const handleAdd = () => {
        console.log('Add user');
    };

    const handleEdit = (id: string) => {
        console.log('Edit user', id);
    };

    const handleSuspend = (id: string) => {
        console.log('Suspend user', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete user', id);
    };

    return (
        <AdminLayout title="Users" titleBn="ব্যবহারকারী">
            <UserManager
                onAdd={handleAdd}
                onEdit={handleEdit}
                onSuspend={handleSuspend}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
