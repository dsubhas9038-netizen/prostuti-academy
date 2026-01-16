'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardHeader, CardBody, Input } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { User, Palette } from 'lucide-react';

export default function SettingsPage() {
    const { userData, userName } = useAuth();

    return (
        <ProtectedRoute>
            <DashboardLayout
                title="Settings ⚙️"
                description="তোমার account settings"
            >
                <div className="max-w-2xl space-y-6">
                    {/* Profile Settings */}
                    <Card>
                        <CardHeader
                            title="Profile"
                            subtitle="তোমার profile information"
                            action={<User className="h-5 w-5 text-gray-400" />}
                        />
                        <CardBody className="space-y-4">
                            <Input
                                label="Name"
                                value={userName || ''}
                                disabled
                                helperText="Currently cannot be changed"
                            />
                            <Input
                                label="Email"
                                value={userData?.email || ''}
                                disabled
                                helperText="Email cannot be changed"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Stream"
                                    value={userData?.stream || 'Not set'}
                                    disabled
                                />
                                <Input
                                    label="Semester"
                                    value={userData?.currentSemester ? `Semester ${userData.currentSemester}` : 'Not set'}
                                    disabled
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Preferences */}
                    <Card>
                        <CardHeader
                            title="Preferences"
                            subtitle="App preferences"
                            action={<Palette className="h-5 w-5 text-gray-400" />}
                        />
                        <CardBody>
                            <p className="text-gray-500 text-center py-8">
                                More settings coming soon!
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
