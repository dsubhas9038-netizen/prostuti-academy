'use client';

import React, { useState } from 'react';
import { Plus, Filter, MoreVertical, Edit, Trash2, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { StudyTask, priorityConfig, statusConfig, formatMinutes } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface StudyTaskListProps {
    tasks?: StudyTask[];
    onTaskAdd?: () => void;
    onTaskEdit?: (task: StudyTask) => void;
    onTaskDelete?: (taskId: string) => void;
    onTaskComplete?: (taskId: string) => void;
    className?: string;
}

function StudyTaskList({
    tasks = [],
    onTaskAdd,
    onTaskEdit,
    onTaskDelete,
    onTaskComplete,
    className
}: StudyTaskListProps) {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);
    const [showActions, setShowActions] = useState<string | null>(null);

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus === 'all' || task.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
        return statusMatch && priorityMatch;
    });

    // Group by date
    const groupedTasks = filteredTasks.reduce((acc, task) => {
        const dateKey = task.scheduledDate.toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(task);
        return acc;
    }, {} as Record<string, StudyTask[]>);

    // Format date header
    const formatDateHeader = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return { label: 'Today', labelBn: 'à¦†à¦œ' };
        }
        if (date.toDateString() === tomorrow.toDateString()) {
            return { label: 'Tomorrow', labelBn: 'à¦†à¦—à¦¾à¦®à§€à¦•à¦¾à¦²' };
        }
        return {
            label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            labelBn: date.toLocaleDateString('bn-BD', { weekday: 'short', month: 'short', day: 'numeric' })
        };
    };

    return (
        <Card className={className}>
            <CardHeader
                title="All Tasks"
                subtitle="à¦¸à¦•à¦² à¦Ÿà¦¾à¦¸à§à¦•"
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                action={
                    <Button size="sm" onClick={onTaskAdd} leftIcon={<Plus className="h-4 w-4" />}>
                        Add Task
                    </Button>
                }
            />
            <CardBody className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Filter className="h-4 w-4 text-gray-400" />

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    >
                        <option value="all">All Priority</option>
                        <option value="high">ðŸ”´ High</option>
                        <option value="medium">ðŸŸ¡ Medium</option>
                        <option value="low">ðŸŸ¢ Low</option>
                    </select>

                    <span className="text-sm text-gray-500 ml-auto">
                        {filteredTasks.length} tasks
                    </span>
                </div>

                {/* Task Groups */}
                <div className="space-y-6">
                    {Object.entries(groupedTasks).map(([dateStr, dateTasks]) => {
                        const dateHeader = formatDateHeader(dateStr);

                        return (
                            <div key={dateStr}>
                                {/* Date Header */}
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-900 dark:text-white">{dateHeader.label}</span>
                                    <span className="text-sm text-gray-500 font-bengali">({dateHeader.labelBn})</span>
                                </div>

                                {/* Tasks */}
                                <div className="space-y-2">
                                    {dateTasks.map((task) => {
                                        const priority = priorityConfig[task.priority];
                                        const status = statusConfig[task.status];
                                        const isCompleted = task.status === 'completed';

                                        return (
                                            <div
                                                key={task.id}
                                                className={cn(
                                                    'flex items-center gap-3 p-4 rounded-xl border transition-all',
                                                    isCompleted
                                                        ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
                                                )}
                                            >
                                                {/* Complete Button */}
                                                <button
                                                    onClick={() => onTaskComplete?.(task.id)}
                                                    className={cn(
                                                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                                                        isCompleted
                                                            ? 'bg-green-500 border-green-500 text-white'
                                                            : 'border-gray-300 hover:border-green-500'
                                                    )}
                                                >
                                                    {isCompleted && <CheckCircle className="h-4 w-4" />}
                                                </button>

                                                {/* Task Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        'font-medium font-bengali',
                                                        isCompleted
                                                            ? 'text-gray-500 line-through'
                                                            : 'text-gray-900 dark:text-white'
                                                    )}>
                                                        {task.titleBn}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                        <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                                                            {task.subjectName}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {formatMinutes(task.estimatedMinutes)}
                                                        </span>
                                                        {task.scheduledTime && (
                                                            <span>at {task.scheduledTime}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Priority & Status */}
                                                <div className="flex items-center gap-2">
                                                    <span title={priority.label}>{priority.icon}</span>
                                                    <Badge
                                                        size="sm"
                                                        style={{ backgroundColor: status.color + '20', color: status.color }}
                                                    >
                                                        {status.icon}
                                                    </Badge>
                                                </div>

                                                {/* Actions Menu */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowActions(showActions === task.id ? null : task.id)}
                                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-gray-400" />
                                                    </button>

                                                    {showActions === task.id && (
                                                        <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                                                            <button
                                                                onClick={() => {
                                                                    onTaskEdit?.(task);
                                                                    setShowActions(null);
                                                                }}
                                                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                                            >
                                                                <Edit className="h-4 w-4" /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    onTaskDelete?.(task.id);
                                                                    setShowActions(null);
                                                                }}
                                                                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                            >
                                                                <Trash2 className="h-4 w-4" /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">à¦•à§‹à¦¨à§‹ à¦Ÿà¦¾à¦¸à§à¦• à¦¨à§‡à¦‡</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={onTaskAdd}>
                            Add Your First Task
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default StudyTaskList;

