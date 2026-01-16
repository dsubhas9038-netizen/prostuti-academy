'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { AdminNotification as NotificationType, NotificationType as NotifType } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface AdminNotificationProps {
    notification: NotificationType;
    onDismiss?: (id: string) => void;
    onAction?: (id: string, url: string) => void;
    className?: string;
}

// Type config
const typeConfig: Record<NotifType, { icon: typeof CheckCircle; color: string; bg: string }> = {
    success: { icon: CheckCircle, color: '#22C55E', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200' },
    error: { icon: AlertCircle, color: '#EF4444', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200' },
    warning: { icon: AlertTriangle, color: '#F59E0B', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200' },
    info: { icon: Info, color: '#3B82F6', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' },
};

function AdminNotificationCard({ notification, onDismiss, onAction, className }: AdminNotificationProps) {
    const config = typeConfig[notification.type];
    const Icon = config.icon;

    // Format time
    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div
            className={cn(
                'p-4 rounded-xl border transition-all',
                config.bg,
                notification.read ? 'opacity-75' : '',
                className
            )}
        >
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${config.color}20` }}
                >
                    <Icon className="h-4 w-4" style={{ color: config.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                            {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(notification.timestamp)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {notification.message}
                    </p>

                    {/* Action Button */}
                    {notification.actionUrl && (
                        <button
                            onClick={() => onAction?.(notification.id, notification.actionUrl!)}
                            className="flex items-center gap-1 text-sm font-medium mt-2 hover:underline"
                            style={{ color: config.color }}
                        >
                            {notification.actionLabel || 'View'} <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Dismiss */}
                {onDismiss && (
                    <button
                        onClick={() => onDismiss(notification.id)}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default AdminNotificationCard;

// Toast Notification Component
interface ToastProps {
    type: NotifType;
    title: string;
    message?: string;
    duration?: number;
    onClose: () => void;
}

export function Toast({ type, title, message, duration = 5000, onClose }: ToastProps) {
    const config = typeConfig[type];
    const Icon = config.icon;

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={cn(
                'fixed bottom-4 right-4 max-w-sm p-4 rounded-xl shadow-lg border animate-slide-up z-50',
                config.bg
            )}
        >
            <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 flex-shrink-0" style={{ color: config.color }} />
                <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                    {message && <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{message}</p>}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

// Alert Banner Component
interface AlertBannerProps {
    type: NotifType;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
}

export function AlertBanner({ type, message, actionLabel, onAction, onDismiss }: AlertBannerProps) {
    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                'w-full px-4 py-3 flex items-center justify-between gap-4 border-b',
                config.bg
            )}
        >
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" style={{ color: config.color }} />
                <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
            </div>
            <div className="flex items-center gap-3">
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className="text-sm font-medium hover:underline"
                        style={{ color: config.color }}
                    >
                        {actionLabel}
                    </button>
                )}
                {onDismiss && (
                    <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

// Notification List Component
interface NotificationListProps {
    notifications: NotificationType[];
    onDismiss?: (id: string) => void;
    onAction?: (id: string, url: string) => void;
    onMarkAllRead?: () => void;
}

export function NotificationList({ notifications, onDismiss, onAction, onMarkAllRead }: NotificationListProps) {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="space-y-4">
            {unreadCount > 0 && onMarkAllRead && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    </p>
                    <button
                        onClick={onMarkAllRead}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Mark all as read
                    </button>
                </div>
            )}
            {notifications.map((notification) => (
                <AdminNotificationCard
                    key={notification.id}
                    notification={notification}
                    onDismiss={onDismiss}
                    onAction={onAction}
                />
            ))}
            {notifications.length === 0 && (
                <div className="text-center py-8">
                    <Info className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notifications</p>
                </div>
            )}
        </div>
    );
}
