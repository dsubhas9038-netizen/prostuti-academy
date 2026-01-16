import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    StudyTask,
    DailyGoal,
    ScheduleSlot,
    StudyStats,
    StudyReminder,
    getTasksForDate,
    calculateProgress,
} from '@/types/studyPlanner';
import {
    sampleStudyTasks,
    sampleScheduleSlots,
    sampleStudyStats,
    sampleReminders,
    getTodaysTasks,
    getTodaysGoal,
    getWeekSchedule,
} from '@/data/sampleStudyPlannerData';

interface UseStudyPlannerOptions {
    autoRefresh?: boolean;
}

interface UseStudyPlannerReturn {
    // Data
    tasks: StudyTask[];
    todaysTasks: StudyTask[];
    schedule: ScheduleSlot[];
    stats: StudyStats;
    reminders: StudyReminder[];

    // State
    loading: boolean;
    error: string | null;
    selectedDate: Date;

    // Actions
    setSelectedDate: (date: Date) => void;
    addTask: (task: Partial<StudyTask>) => void;
    updateTask: (taskId: string, updates: Partial<StudyTask>) => void;
    deleteTask: (taskId: string) => void;
    completeTask: (taskId: string) => void;
    startTask: (taskId: string) => void;
    refresh: () => void;

    // Computed
    todaysProgress: number;
    weeklyProgress: number;
    streak: number;
}

export function useStudyPlanner(options: UseStudyPlannerOptions = {}): UseStudyPlannerReturn {
    // State
    const [tasks, setTasks] = useState<StudyTask[]>([]);
    const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
    const [stats, setStats] = useState<StudyStats>(sampleStudyStats);
    const [reminders, setReminders] = useState<StudyReminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            setTasks(sampleStudyTasks);
            setSchedule(sampleScheduleSlots);
            setStats(sampleStudyStats);
            setReminders(sampleReminders);
        } catch (err) {
            setError('Failed to load planner data');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Today's tasks
    const todaysTasks = useMemo(() => {
        const today = new Date();
        return getTasksForDate(tasks, today);
    }, [tasks]);

    // Add task
    const addTask = useCallback((taskData: Partial<StudyTask>) => {
        const newTask: StudyTask = {
            id: Date.now().toString(),
            title: taskData.title || '',
            titleBn: taskData.titleBn || taskData.title || '',
            subjectId: taskData.subjectId || '',
            subjectName: taskData.subjectName || '',
            priority: taskData.priority || 'medium',
            status: 'pending',
            estimatedMinutes: taskData.estimatedMinutes || 30,
            scheduledDate: taskData.scheduledDate || new Date(),
            scheduledTime: taskData.scheduledTime,
            ...taskData,
        };

        setTasks(prev => [...prev, newTask]);
    }, []);

    // Update task
    const updateTask = useCallback((taskId: string, updates: Partial<StudyTask>) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
            )
        );
    }, []);

    // Delete task
    const deleteTask = useCallback((taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }, []);

    // Complete task
    const completeTask = useCallback((taskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? { ...task, status: 'completed' as const, completedAt: new Date() }
                    : task
            )
        );
    }, []);

    // Start task
    const startTask = useCallback((taskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? { ...task, status: 'in_progress' as const }
                    : task
            )
        );
    }, []);

    // Computed values
    const todaysProgress = useMemo(() => {
        const completed = todaysTasks.filter(t => t.status === 'completed').length;
        return calculateProgress(completed, todaysTasks.length);
    }, [todaysTasks]);

    const weeklyProgress = useMemo(() => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());

        const weekTasks = tasks.filter(t => t.scheduledDate >= weekStart);
        const completed = weekTasks.filter(t => t.status === 'completed').length;
        return calculateProgress(completed, weekTasks.length);
    }, [tasks]);

    return {
        // Data
        tasks,
        todaysTasks,
        schedule,
        stats,
        reminders,

        // State
        loading,
        error,
        selectedDate,

        // Actions
        setSelectedDate,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        startTask,
        refresh: fetchData,

        // Computed
        todaysProgress,
        weeklyProgress,
        streak: stats.currentStreak,
    };
}

export default useStudyPlanner;

// Compact hook for dashboard
export function useTodaysStudyPlan() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<StudyTask[]>([]);
    const [goal, setGoal] = useState<DailyGoal | undefined>();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 200));
            setTasks(getTodaysTasks());
            setGoal(getTodaysGoal());
            setLoading(false);
        };
        fetch();
    }, []);

    return { tasks, goal, loading };
}

// Hook for study stats
export function useStudyStats() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StudyStats>(sampleStudyStats);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 200));
            setStats(sampleStudyStats);
            setLoading(false);
        };
        fetch();
    }, []);

    return { stats, loading };
}
