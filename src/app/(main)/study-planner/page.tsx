'use client';

import React, { useState } from 'react';
import { Calendar, Settings, Plus, RefreshCw } from 'lucide-react';
import {
    StudyCalendar,
    DailyGoals,
    WeeklySchedule,
    StudyTaskList,
    StudyPlannerSettings,
    StudyStats,
    StudyReminders,
    StudyProgress
} from '@/components/studyPlanner';
import { Button } from '@/components/ui';
import { useStudyPlanner } from '@/hooks/useStudyPlanner';
import { cn } from '@/lib/utils';

// Tab config
const tabs = [
    { id: 'today', label: 'Today', labelBn: 'আজ' },
    { id: 'week', label: 'Week', labelBn: 'সপ্তাহ' },
    { id: 'tasks', label: 'Tasks', labelBn: 'টাস্ক' },
    { id: 'stats', label: 'Stats', labelBn: 'পরিসংখ্যান' },
];

export default function StudyPlannerPage() {
    const [activeTab, setActiveTab] = useState('today');
    const [showSettings, setShowSettings] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const {
        tasks,
        todaysTasks,
        schedule,
        stats,
        reminders,
        loading,
        completeTask,
        startTask,
        refresh,
        streak,
    } = useStudyPlanner();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold flex items-center gap-3">
                                <Calendar className="h-10 w-10 sm:h-12 sm:w-12" />
                                Study Planner
                            </h1>
                            <p className="text-xl text-purple-200 mt-2 font-bengali">
                                তোমার পড়াশোনা পরিকল্পনা করো
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/10"
                                onClick={() => setShowSettings(true)}
                                leftIcon={<Settings className="h-4 w-4" />}
                            >
                                Settings
                            </Button>
                            <Button
                                className="bg-white text-purple-600 hover:bg-purple-50"
                                leftIcon={<Plus className="h-4 w-4" />}
                            >
                                Add Task
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 -mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex-1 py-3 px-4 rounded-xl font-medium transition-all text-center',
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                        >
                            <span>{tab.label}</span>
                            <span className="text-xs block font-bengali opacity-75">{tab.labelBn}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Today Tab */}
                {activeTab === 'today' && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <DailyGoals
                                tasks={todaysTasks}
                                streak={streak}
                                onTaskComplete={completeTask}
                                onTaskStart={startTask}
                            />

                            <StudyProgress
                                tasks={tasks}
                                streak={streak}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <StudyCalendar
                                tasks={tasks}
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                            />

                            <StudyReminders reminders={reminders} />
                        </div>
                    </div>
                )}

                {/* Week Tab */}
                {activeTab === 'week' && (
                    <div className="space-y-6">
                        <WeeklySchedule slots={schedule} />

                        <div className="grid lg:grid-cols-2 gap-6">
                            <StudyCalendar
                                tasks={tasks}
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                            />
                            <StudyStats stats={stats} variant="compact" />
                        </div>
                    </div>
                )}

                {/* Tasks Tab */}
                {activeTab === 'tasks' && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <StudyTaskList
                                tasks={tasks}
                                onTaskComplete={completeTask}
                            />
                        </div>
                        <div>
                            <StudyCalendar
                                tasks={tasks}
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                            />
                        </div>
                    </div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        <StudyStats stats={stats} />

                        <div className="grid lg:grid-cols-2 gap-6">
                            <StudyProgress
                                tasks={tasks}
                                streak={streak}
                            />
                            <StudyReminders reminders={reminders} />
                        </div>
                    </div>
                )}
            </div>

            {/* Motivation Banner */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">📚 নিয়মিত অভ্যাস সাফল্যের চাবিকাঠি!</h3>
                    <p className="text-green-100 max-w-2xl mx-auto">
                        প্রতিদিন একটু একটু করে পড়লে পরীক্ষায় ভালো ফল পাবে। তোমার স্ট্রিক বজায় রাখো!
                    </p>
                </div>
            </div>

            {/* Settings Modal */}
            <StudyPlannerSettings
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
}
