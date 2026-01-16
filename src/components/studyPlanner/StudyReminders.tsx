'use client';

import React from 'react';
import { Bell, Clock, Target, Flame, X, Check, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/ui';
import { StudyReminder } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface StudyRemindersProps {
    reminders?: StudyReminder[];
    onDismiss?: (id: string) => void;
    onAction?: (reminder: StudyReminder) => void;
    className?: string;
}

const sampleReminders: StudyReminder[] = [
    { id: 'r1', taskId: 't2', title: 'Study Time', message: 'English Grammar in 15 minutes', scheduledTime: new Date(), isRead: false, type: 'task' },
    { id: 'r2', title: 'Daily Goal', message: 'Complete 2 more tasks to reach your goal!', scheduledTime: new Date(), isRead: false, type: 'goal' },
    { id: 'r3', title: 'ðŸ”¥ Streak Alert', message: 'Keep your 7-day streak alive!', scheduledTime: new Date(), isRead: true, type: 'streak' },
];

// Type config
const typeConfig = {
    task: { icon: Clock, color: '#3B82F6', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    goal: { icon: Target, color: '#22C55E', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    streak: { icon: Flame, color: '#F59E0B', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    custom: { icon: Bell, color: '#8B5CF6', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
};

function StudyReminders({
    reminders = sampleReminders,
    onDismiss,
    onAction,
    className
}: StudyRemindersProps) {
    const unreadCount = reminders.filter(r => !r.isRead).length;

    // Format time
    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        return date.toLocaleDateString();
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Reminders"
                subtitle="à¦¸à§à¦®à¦°à¦£"
                icon={<Bell className="h-5 w-5 text-amber-500" />}
                action={
                    unreadCount > 0 && (
                        <Badge size="sm" className="bg-red-100 text-red-700">
                            {unreadCount} new
                        </Badge>
                    )
                }
            />
            <CardBody className="p-0">
                {reminders.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {reminders.map((reminder) => {
                            const config = typeConfig[reminder.type];
                            const Icon = config.icon;

                            return (
                                <div
                                    key={reminder.id}
                                    className={cn(
                                        'flex items-start gap-3 p-4 transition-colors',
                                        !reminder.isRead && config.bgColor
                                    )}
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: config.color + '20' }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color: config.color }} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className={cn(
                                                    'font-medium',
                                                    !reminder.isRead
                                                        ? 'text-gray-900 dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                )}>
                                                    {reminder.title}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {reminder.message}
                                                </p>
                                            </div>

                                            {/* Dismiss */}
                                            <button
                                                onClick={() => onDismiss?.(reminder.id)}
                                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded shrink-0"
                                            >
                                                <X className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-400">
                                                {formatTime(reminder.scheduledTime)}
                                            </span>

                                            {reminder.taskId && (
                                                <button
                                                    onClick={() => onAction?.(reminder)}
                                                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                                                >
                                                    Go to task <ChevronRight className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Unread dot */}
                                    {!reminder.isRead && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">à¦•à§‹à¦¨à§‹ à¦¸à§à¦®à¦°à¦£ à¦¨à§‡à¦‡</p>
                    </div>
                )}

                {/* Mark all read */}
                {unreadCount > 0 && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-sm text-blue-600 hover:underline flex items-center justify-center gap-2">
                            <Check className="h-4 w-4" />
                            Mark all as read
                        </button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default StudyReminders;

