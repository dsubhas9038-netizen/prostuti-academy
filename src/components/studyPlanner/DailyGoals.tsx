'use client';

import React from 'react';
import { CheckCircle, Circle, Clock, Target, Flame } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button, Progress } from '@/components/ui';
import { StudyTask, DailyGoal, priorityConfig, statusConfig, formatMinutes, calculateProgress } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface DailyGoalsProps {
    goal?: DailyGoal;
    tasks?: StudyTask[];
    streak?: number;
    onTaskComplete?: (taskId: string) => void;
    onTaskStart?: (taskId: string) => void;
    className?: string;
}

function DailyGoals({
    goal,
    tasks = [],
    streak = 0,
    onTaskComplete,
    onTaskStart,
    className
}: DailyGoalsProps) {
    // Calculate progress
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const progress = calculateProgress(completedTasks, totalTasks);

    const completedMinutes = tasks
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);
    const totalMinutes = tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);
    const minutesProgress = calculateProgress(completedMinutes, totalMinutes);

    // Sort tasks by time
    const sortedTasks = [...tasks].sort((a, b) => {
        if (!a.scheduledTime) return 1;
        if (!b.scheduledTime) return -1;
        return a.scheduledTime.localeCompare(b.scheduledTime);
    });

    // Find next task
    const nextTask = sortedTasks.find(t => t.status === 'pending' || t.status === 'in_progress');

    return (
        <Card className={className}>
            <CardHeader
                title="Today's Goals"
                subtitle="à¦†à¦œà¦•à§‡à¦° à¦²à¦•à§à¦·à§à¦¯"
                icon={<Target className="h-5 w-5 text-blue-500" />}
                action={
                    streak > 0 && (
                        <Badge size="lg" className="bg-orange-100 text-orange-700">
                            <Flame className="h-4 w-4 mr-1" />
                            {streak} day streak
                        </Badge>
                    )
                }
            />
            <CardBody className="space-y-6">
                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Tasks</span>
                            <span className="font-semibold text-blue-600">{completedTasks}/{totalTasks}</span>
                        </div>
                        <div className="h-2 bg-blue-200 dark:bg-blue-900/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
                            <span className="font-semibold text-purple-600">{formatMinutes(completedMinutes)}</span>
                        </div>
                        <div className="h-2 bg-purple-200 dark:bg-purple-900/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${minutesProgress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Next Task Alert */}
                {nextTask && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-amber-600" />
                            <div className="flex-1">
                                <p className="text-sm text-amber-700 dark:text-amber-400">
                                    Next: <span className="font-semibold font-bengali">{nextTask.titleBn}</span>
                                </p>
                                <p className="text-xs text-amber-600">
                                    {nextTask.scheduledTime && `at ${nextTask.scheduledTime}`} â€¢ {formatMinutes(nextTask.estimatedMinutes)}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => onTaskStart?.(nextTask.id)}
                                className="bg-amber-500 hover:bg-amber-600"
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                )}

                {/* Task List */}
                <div className="space-y-3">
                    {sortedTasks.map((task) => {
                        const priority = priorityConfig[task.priority];
                        const status = statusConfig[task.status];
                        const isCompleted = task.status === 'completed';
                        const isInProgress = task.status === 'in_progress';

                        return (
                            <div
                                key={task.id}
                                className={cn(
                                    'flex items-center gap-3 p-3 rounded-xl transition-all',
                                    isCompleted
                                        ? 'bg-green-50 dark:bg-green-900/20'
                                        : isInProgress
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : 'bg-gray-50 dark:bg-gray-800'
                                )}
                            >
                                {/* Status Icon */}
                                <button
                                    onClick={() => !isCompleted && onTaskComplete?.(task.id)}
                                    className={cn(
                                        'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
                                        isCompleted ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                                    )}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="h-6 w-6" />
                                    ) : (
                                        <Circle className="h-6 w-6" />
                                    )}
                                </button>

                                {/* Task Info */}
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        'font-medium font-bengali truncate',
                                        isCompleted
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-900 dark:text-white'
                                    )}>
                                        {task.titleBn}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{task.subjectName}</span>
                                        <span>â€¢</span>
                                        <span>{formatMinutes(task.estimatedMinutes)}</span>
                                        {task.scheduledTime && (
                                            <>
                                                <span>â€¢</span>
                                                <span>{task.scheduledTime}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Priority & Status */}
                                <div className="flex items-center gap-2">
                                    <span title={priority.label}>{priority.icon}</span>
                                    {isInProgress && (
                                        <Badge size="sm" className="bg-blue-100 text-blue-700">
                                            ðŸ”„ à¦šà¦²à¦®à¦¾à¦¨
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {tasks.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-bengali">à¦†à¦œà¦•à§‡à¦° à¦œà¦¨à§à¦¯ à¦•à§‹à¦¨à§‹ à¦Ÿà¦¾à¦¸à§à¦• à¦¨à§‡à¦‡</p>
                            <Button variant="outline" size="sm" className="mt-3">
                                Add Task
                            </Button>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default DailyGoals;

