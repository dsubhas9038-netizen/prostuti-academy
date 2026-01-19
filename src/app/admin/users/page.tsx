'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout, UserManager } from '@/components/admin';
import { fetchAdminUsers, deleteUser } from '@/lib/admin';
import { PageLoading } from '@/components/shared';
import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';

export default function AdminUsersPage() {
    const router = useRouter();
    const { userRole } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAdd = () => {
        toast('User creation is handled via Sign Up page currently.', { icon: 'ℹ️' });
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/users/edit/${id}`);
    };

    const handleSuspend = (id: string) => {
        toast('Suspend functionality coming soon.', { icon: '🚧' });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete user');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Users" titleBn="ব্যবহারকারী">
                <PageLoading message="Loading users..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Users" titleBn="ব্যবহারকারী">
            <UserManager
                users={users}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onSuspend={handleSuspend}
                onDelete={handleDelete}
                currentUserRole={userRole}
            />
        </AdminLayout>
    );
}
