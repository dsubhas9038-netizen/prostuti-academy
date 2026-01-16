'use client';

import React, { useState } from 'react';
import {
    Bell,
    Send,
    Users,
    CheckCircle,
    Trash2,
    RefreshCw,
    Filter
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal, Input, Textarea } from '@/components/ui';
import { AdminNotification as NotificationType, NotificationType as NotifType } from '@/types/analytics';
import { NotificationList } from './AdminNotification';
import { cn } from '@/lib/utils';

interface NotificationManagerProps {
    notifications?: NotificationType[];
    onSend?: (notification: Partial<NotificationType>) => void;
    onDelete?: (id: string) => void;
    onMarkRead?: (id: string) => void;
    className?: string;
}

// Sample notifications
const sampleNotifications: NotificationType[] = [
    {
        id: 'n1', type: 'success', title: 'New User Milestone',
        message: 'Congratulations! You\'ve reached 2,500+ users.',
        timestamp: new Date(Date.now() - 3600000), read: false,
    },
    {
        id: 'n2', type: 'warning', title: 'Low Storage',
        message: 'Storage usage is at 85%. Consider cleanup.',
        timestamp: new Date(Date.now() - 7200000), read: false,
        actionUrl: '/admin/settings', actionLabel: 'View Storage',
    },
    {
        id: 'n3', type: 'info', title: 'Weekly Report Ready',
        message: 'Your weekly analytics report is available.',
        timestamp: new Date(Date.now() - 86400000), read: true,
    },
];

function NotificationManager({
    notifications = sampleNotifications,
    onSend,
    onDelete,
    onMarkRead,
    className
}: NotificationManagerProps) {
    const [showSendModal, setShowSendModal] = useState(false);
    const [filterType, setFilterType] = useState<string>('all');
    const [newNotification, setNewNotification] = useState({
        type: 'info' as NotifType,
        title: '',
        message: '',
        target: 'all'
    });

    // Filter notifications
    const filteredNotifications = notifications.filter(n =>
        filterType === 'all' || n.type === filterType
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    // Handle send
    const handleSend = () => {
        if (newNotification.title && newNotification.message) {
            onSend?.({
                type: newNotification.type,
                title: newNotification.title,
                message: newNotification.message,
                timestamp: new Date(),
                read: false,
            });
            setNewNotification({ type: 'info', title: '', message: '', target: 'all' });
            setShowSendModal(false);
        }
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Notification Manager
                    </h2>
                    <p className="text-sm text-gray-500 font-bengali">নোটিফিকেশন ব্যবস্থাপনা</p>
                </div>
                <Button
                    onClick={() => setShowSendModal(true)}
                    leftIcon={<Send className="h-4 w-4" />}
                >
                    Send Notification
                </Button>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
                    <p className="text-xs text-gray-500">Total</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-amber-600">{unreadCount}</p>
                    <p className="text-xs text-gray-500">Unread</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">
                        {notifications.filter(n => n.type === 'success').length}
                    </p>
                    <p className="text-xs text-gray-500">Success</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-red-600">
                        {notifications.filter(n => n.type === 'error').length}
                    </p>
                    <p className="text-xs text-gray-500">Errors</p>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader
                    title="All Notifications"
                    subtitle="সকল নোটিফিকেশন"
                    icon={<Bell className="h-5 w-5 text-blue-500" />}
                    action={
                        <div className="flex items-center gap-2">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            >
                                <option value="all">All Types</option>
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                            <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
                                Refresh
                            </Button>
                        </div>
                    }
                />
                <CardBody>
                    <NotificationList
                        notifications={filteredNotifications}
                        onDismiss={onDelete}
                        onMarkAllRead={() => notifications.forEach(n => onMarkRead?.(n.id))}
                    />
                </CardBody>
            </Card>

            {/* Send Modal */}
            <Modal
                isOpen={showSendModal}
                onClose={() => setShowSendModal(false)}
                title="Send Notification"
                size="md"
            >
                <div className="space-y-4">
                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type
                        </label>
                        <select
                            value={newNotification.type}
                            onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as NotifType })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        >
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                        </select>
                    </div>

                    {/* Target */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Target Audience
                        </label>
                        <select
                            value={newNotification.target}
                            onChange={(e) => setNewNotification({ ...newNotification, target: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        >
                            <option value="all">All Users</option>
                            <option value="admins">Admins Only</option>
                            <option value="premium">Premium Users</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={newNotification.title}
                            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                            placeholder="Notification title..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                        </label>
                        <textarea
                            value={newNotification.message}
                            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                            placeholder="Notification message..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowSendModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSend} leftIcon={<Send className="h-4 w-4" />}>
                            Send Notification
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NotificationManager;
