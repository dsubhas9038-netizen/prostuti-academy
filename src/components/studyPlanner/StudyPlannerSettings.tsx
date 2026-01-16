'use client';

import React, { useState } from 'react';
import { Settings, Clock, Bell, Target, Save, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { cn } from '@/lib/utils';

interface StudyPlannerSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (settings: PlannerSettings) => void;
}

interface PlannerSettings {
    // Daily goals
    dailyTargetMinutes: number;
    dailyTargetTasks: number;
    // Reminders
    enableReminders: boolean;
    reminderBeforeMinutes: number;
    morningReminderTime: string;
    eveningReminderTime: string;
    // Study preferences
    preferredStartTime: string;
    preferredEndTime: string;
    breakDuration: number;
    studySessionDuration: number;
}

const defaultSettings: PlannerSettings = {
    dailyTargetMinutes: 180,
    dailyTargetTasks: 4,
    enableReminders: true,
    reminderBeforeMinutes: 15,
    morningReminderTime: '08:00',
    eveningReminderTime: '20:00',
    preferredStartTime: '09:00',
    preferredEndTime: '18:00',
    breakDuration: 10,
    studySessionDuration: 45,
};

function StudyPlannerSettings({ isOpen, onClose, onSave }: StudyPlannerSettingsProps) {
    const [settings, setSettings] = useState<PlannerSettings>(defaultSettings);
    const [activeTab, setActiveTab] = useState<'goals' | 'reminders' | 'preferences'>('goals');

    const handleSave = () => {
        onSave?.(settings);
        onClose();
    };

    const tabs = [
        { id: 'goals' as const, label: 'Goals', labelBn: 'à¦²à¦•à§à¦·à§à¦¯', icon: Target },
        { id: 'reminders' as const, label: 'Reminders', labelBn: 'à¦¸à§à¦®à¦°à¦£', icon: Bell },
        { id: 'preferences' as const, label: 'Preferences', labelBn: 'à¦ªà¦›à¦¨à§à¦¦', icon: Clock },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Planner Settings" size="lg">
            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                                    activeTab === tab.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Goals Tab */}
                {activeTab === 'goals' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Daily Study Target (Minutes)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="30"
                                    max="360"
                                    step="30"
                                    value={settings.dailyTargetMinutes}
                                    onChange={(e) => setSettings({ ...settings, dailyTargetMinutes: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="w-20 text-center font-semibold text-blue-600">
                                    {Math.floor(settings.dailyTargetMinutes / 60)}h {settings.dailyTargetMinutes % 60}m
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Daily Task Target
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={settings.dailyTargetTasks}
                                    onChange={(e) => setSettings({ ...settings, dailyTargetTasks: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="w-20 text-center font-semibold text-green-600">
                                    {settings.dailyTargetTasks} tasks
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                ðŸ’¡ à¦ªà§à¦°à¦¤à¦¿à¦¦à¦¿à¦¨ {Math.floor(settings.dailyTargetMinutes / 60)} à¦˜à¦£à§à¦Ÿà¦¾ {settings.dailyTargetMinutes % 60} à¦®à¦¿à¦¨à¦¿à¦Ÿ à¦ªà¦¡à¦¼à¦¾à¦¶à§‹à¦¨à¦¾ à¦•à¦°à¦²à§‡ à¦¤à§à¦®à¦¿ à¦¦à§à¦°à§à¦¤ à¦‰à¦¨à§à¦¨à¦¤à¦¿ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à¦¬à§‡à¥¤
                            </p>
                        </div>
                    </div>
                )}

                {/* Reminders Tab */}
                {activeTab === 'reminders' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Enable Reminders</p>
                                <p className="text-sm text-gray-500">Get notified before tasks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.enableReminders}
                                    onChange={(e) => setSettings({ ...settings, enableReminders: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Remind Before (mins)
                                </label>
                                <select
                                    value={settings.reminderBeforeMinutes}
                                    onChange={(e) => setSettings({ ...settings, reminderBeforeMinutes: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="5">5 minutes</option>
                                    <option value="10">10 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Morning Reminder
                                </label>
                                <input
                                    type="time"
                                    value={settings.morningReminderTime}
                                    onChange={(e) => setSettings({ ...settings, morningReminderTime: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Study Start Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.preferredStartTime}
                                    onChange={(e) => setSettings({ ...settings, preferredStartTime: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Study End Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.preferredEndTime}
                                    onChange={(e) => setSettings({ ...settings, preferredEndTime: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Session Duration (mins)
                                </label>
                                <select
                                    value={settings.studySessionDuration}
                                    onChange={(e) => setSettings({ ...settings, studySessionDuration: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="25">25 min (Pomodoro)</option>
                                    <option value="45">45 min</option>
                                    <option value="60">60 min</option>
                                    <option value="90">90 min</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Break Duration (mins)
                                </label>
                                <select
                                    value={settings.breakDuration}
                                    onChange={(e) => setSettings({ ...settings, breakDuration: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="5">5 min</option>
                                    <option value="10">10 min</option>
                                    <option value="15">15 min</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>
                        Save Settings
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default StudyPlannerSettings;

