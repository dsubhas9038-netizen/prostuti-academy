'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardBody, Button } from '@/components/ui';
import { CalendarDay, StudyTask, getTasksForDate, daysOfWeek } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface StudyCalendarProps {
    tasks?: StudyTask[];
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
    className?: string;
}

function StudyCalendar({
    tasks = [],
    selectedDate = new Date(),
    onDateSelect,
    className
}: StudyCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

    // Generate calendar days
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // First day of month
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay(); // 0-6

        // Last day of month
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        // Build calendar grid
        const days: CalendarDay[] = [];
        const today = new Date();

        // Previous month days
        const prevMonth = new Date(year, month, 0);
        const prevMonthDays = prevMonth.getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, prevMonthDays - i);
            const dayTasks = getTasksForDate(tasks, date);
            days.push({
                date,
                isToday: false,
                isCurrentMonth: false,
                hasTask: dayTasks.length > 0,
                taskCount: dayTasks.length,
                completedCount: dayTasks.filter(t => t.status === 'completed').length,
                totalMinutes: dayTasks.reduce((sum, t) => sum + t.estimatedMinutes, 0),
            });
        }

        // Current month days
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const dayTasks = getTasksForDate(tasks, date);
            const isToday = date.toDateString() === today.toDateString();

            days.push({
                date,
                isToday,
                isCurrentMonth: true,
                hasTask: dayTasks.length > 0,
                taskCount: dayTasks.length,
                completedCount: dayTasks.filter(t => t.status === 'completed').length,
                totalMinutes: dayTasks.reduce((sum, t) => sum + t.estimatedMinutes, 0),
            });
        }

        // Next month days
        const remainingDays = 42 - days.length; // 6 rows x 7 days
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            const dayTasks = getTasksForDate(tasks, date);
            days.push({
                date,
                isToday: false,
                isCurrentMonth: false,
                hasTask: dayTasks.length > 0,
                taskCount: dayTasks.length,
                completedCount: dayTasks.filter(t => t.status === 'completed').length,
                totalMinutes: dayTasks.reduce((sum, t) => sum + t.estimatedMinutes, 0),
            });
        }

        return days;
    }, [currentMonth, tasks]);

    // Navigation
    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        onDateSelect?.(today);
    };

    // Format month
    const monthName = currentMonth.toLocaleString('bn-BD', { month: 'long', year: 'numeric' });

    return (
        <Card className={className}>
            <CardBody>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white font-bengali">
                            {monthName}
                        </h3>
                    </div>

                    <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Today button */}
                <div className="text-center mb-4">
                    <button
                        onClick={goToToday}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        à¦†à¦œà¦•à§‡ à¦¯à¦¾à¦“
                    </button>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day.id}
                            className="text-center text-xs font-medium text-gray-500 py-1"
                        >
                            {day.shortBn}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                        const isSelected = selectedDate?.toDateString() === day.date.toDateString();

                        return (
                            <button
                                key={index}
                                onClick={() => onDateSelect?.(day.date)}
                                className={cn(
                                    'relative aspect-square p-1 rounded-lg transition-all text-sm',
                                    day.isCurrentMonth
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-400 dark:text-gray-600',
                                    day.isToday && 'ring-2 ring-blue-500',
                                    isSelected && 'bg-blue-500 text-white',
                                    !isSelected && 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                )}
                            >
                                <span className="font-medium">{day.date.getDate()}</span>

                                {/* Task indicators */}
                                {day.hasTask && !isSelected && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                        {day.completedCount > 0 && (
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        )}
                                        {day.taskCount - day.completedCount > 0 && (
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        )}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>à¦¸à¦®à§à¦ªà¦¨à§à¦¨</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>à¦¬à¦¾à¦•à¦¿</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default StudyCalendar;

