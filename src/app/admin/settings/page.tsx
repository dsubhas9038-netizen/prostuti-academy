'use client';

import React from 'react';
import { AdminLayout, AdminSettings as SettingsComponent } from '@/components/admin';

export default function AdminSettingsPage() {
    return (
        <AdminLayout title="Settings" titleBn="সেটিংস">
            <SettingsComponent />
        </AdminLayout>
    );
}
