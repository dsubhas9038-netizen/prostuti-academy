'use client';

import React, { useState } from 'react';
import {
    Save,
    Globe,
    Bell,
    Shield,
    Clock,
    Database,
    Palette,
    Mail,
    Calendar
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SettingsSection {
    id: string;
    title: string;
    titleBn: string;
    icon: typeof Globe;
    color: string;
}

const settingsSections: SettingsSection[] = [
    { id: 'general', title: 'General', titleBn: 'সাধারণ', icon: Globe, color: '#3B82F6' },
    { id: 'notifications', title: 'Notifications', titleBn: 'নোটিফিকেশন', icon: Bell, color: '#F59E0B' },
    { id: 'security', title: 'Security', titleBn: 'নিরাপত্তা', icon: Shield, color: '#EF4444' },
    { id: 'exam', title: 'Exam Settings', titleBn: 'পরীক্ষা সেটিংস', icon: Calendar, color: '#8B5CF6' },
    { id: 'storage', title: 'Storage', titleBn: 'স্টোরেজ', icon: Database, color: '#22C55E' },
    { id: 'appearance', title: 'Appearance', titleBn: 'অ্যাপিয়ারেন্স', icon: Palette, color: '#EC4899' },
];

interface AdminSettingsProps {
    className?: string;
}

function AdminSettings({ className }: AdminSettingsProps) {
    const [activeSection, setActiveSection] = useState('general');
    const [settings, setSettings] = useState({
        // General
        siteName: 'ProstutiAcademy',
        siteNameBn: 'প্রস্তুতি অ্যাকাডেমি',
        supportEmail: 'support@prostutiacademy.com',
        language: 'bn',
        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: true,
        // Security
        twoFactorAuth: false,
        sessionTimeout: 60,
        // Exam
        examDate: '2026-03-15',
        examName: 'HS Semester 4 Exam 2026',
        examNameBn: 'উ.মা. সেমিস্টার ৪ পরীক্ষা ২০২৬',
        // Storage
        maxFileSize: 10,
        allowedFormats: ['pdf', 'docx', 'xlsx'],
        // Appearance
        primaryColor: '#6366F1',
        darkMode: 'auto',
    });

    const [hasChanges, setHasChanges] = useState(false);

    const handleChange = (key: string, value: any) => {
        setSettings({ ...settings, [key]: value });
        setHasChanges(true);
    };

    const handleSave = () => {
        // TODO: Save to backend
        setHasChanges(false);
        alert('Settings saved!');
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Admin Settings
                    </h2>
                    <p className="text-sm text-gray-500 font-bengali">অ্যাডমিন সেটিংস</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    leftIcon={<Save className="h-4 w-4" />}
                >
                    Save Changes
                </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="space-y-2">
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;

                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                                    isActive
                                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                                )}
                            >
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: isActive ? `${section.color}20` : undefined }}
                                >
                                    <Icon className="h-4 w-4" style={{ color: isActive ? section.color : undefined }} />
                                </div>
                                <div>
                                    <p className="font-medium">{section.title}</p>
                                    <p className="text-xs text-gray-500 font-bengali">{section.titleBn}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    {activeSection === 'general' && (
                        <Card>
                            <CardHeader title="General Settings" subtitle="সাধারণ সেটিংস" />
                            <CardBody className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
                                        <input
                                            type="text"
                                            value={settings.siteName}
                                            onChange={(e) => handleChange('siteName', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name (Bengali)</label>
                                        <input
                                            type="text"
                                            value={settings.siteNameBn}
                                            onChange={(e) => handleChange('siteNameBn', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-bengali"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
                                    <input
                                        type="email"
                                        value={settings.supportEmail}
                                        onChange={(e) => handleChange('supportEmail', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleChange('language', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    >
                                        <option value="bn">Bengali (বাংলা)</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeSection === 'notifications' && (
                        <Card>
                            <CardHeader title="Notification Settings" subtitle="নোটিফিকেশন সেটিংস" />
                            <CardBody className="space-y-4">
                                {[
                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates' },
                                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser notifications' },
                                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary email' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings[item.key as keyof typeof settings] as boolean}
                                                onChange={(e) => handleChange(item.key, e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    )}

                    {activeSection === 'exam' && (
                        <Card>
                            <CardHeader title="Exam Settings" subtitle="পরীক্ষা সেটিংস" />
                            <CardBody className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Name</label>
                                        <input
                                            type="text"
                                            value={settings.examName}
                                            onChange={(e) => handleChange('examName', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Date</label>
                                        <input
                                            type="date"
                                            value={settings.examDate}
                                            onChange={(e) => handleChange('examDate', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                    <p className="text-sm text-purple-700 dark:text-purple-400">
                                        ℹ️ This date is used for the exam countdown timer shown to students.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeSection === 'storage' && (
                        <Card>
                            <CardHeader title="Storage Settings" subtitle="স্টোরেজ সেটিংস" />
                            <CardBody className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500">Storage Used</span>
                                        <span className="font-medium">8.5 GB / 10 GB</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max File Size (MB)</label>
                                    <input
                                        type="number"
                                        value={settings.maxFileSize}
                                        onChange={(e) => handleChange('maxFileSize', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeSection === 'security' && (
                        <Card>
                            <CardHeader title="Security Settings" subtitle="নিরাপত্তা সেটিংস" />
                            <CardBody className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-500">Add extra security to admin accounts</p>
                                    </div>
                                    <Badge className={settings.twoFactorAuth ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                                        {settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Timeout (minutes)</label>
                                    <input
                                        type="number"
                                        value={settings.sessionTimeout}
                                        onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    )}

                    {activeSection === 'appearance' && (
                        <Card>
                            <CardHeader title="Appearance Settings" subtitle="অ্যাপিয়ারেন্স সেটিংস" />
                            <CardBody className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Color</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={settings.primaryColor}
                                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-500">{settings.primaryColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dark Mode</label>
                                    <select
                                        value={settings.darkMode}
                                        onChange={(e) => handleChange('darkMode', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    >
                                        <option value="auto">System Default</option>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminSettings;
