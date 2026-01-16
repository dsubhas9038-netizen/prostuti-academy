'use client';

import React from 'react';
import { AdminLayout, QuestionManager } from '@/components/admin';

export default function AdminQuestionsPage() {
    const handleAdd = () => {
        // TODO: Navigate to question creation form
        console.log('Add question');
    };

    const handleEdit = (id: string) => {
        // TODO: Navigate to question edit form
        console.log('Edit question', id);
    };

    const handleDelete = (id: string) => {
        // TODO: Delete question via API
        console.log('Delete question', id);
    };

    return (
        <AdminLayout title="Questions" titleBn="প্রশ্নসমূহ">
            <QuestionManager
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
}
