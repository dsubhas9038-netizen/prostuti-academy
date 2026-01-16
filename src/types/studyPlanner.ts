// Study Planner Types

// Task priority
export type TaskPriority = 'high' | 'medium' | 'low';

// Task status
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'skipped';

// Priority config
export const priorityConfig: Record<TaskPriority, { label: string; labelBn: string; color: string; icon: string }> = {
    high: { label: 'High', labelBn: 'উচ্চ', color: '#EF4444', icon: '🔴' },
    medium: { label: 'Medium', labelBn: 'মধ্যম', color: '#F59E0B', icon: '🟡' },
    low: { label: 'Low', labelBn: 'নিম্ন', color: '#22C55E', icon: '🟢' },
};

// Status config
export const statusConfig: Record<TaskStatus, { label: string; labelBn: string; color: string; icon: string }> = {
    pending: { label: 'Pending', labelBn: 'বাকি', color: '#6B7280', icon: '⬜' },
    in_progress: { label: 'In Progress', labelBn: 'চলমান', color: '#3B82F6', icon: '🔄' },
    completed: { label: 'Completed', labelBn: 'সম্পন্ন', color: '#22C55E', icon: '✅' },
    overdue: { label: 'Overdue', labelBn: 'বিলম্বিত', color: '#EF4444', icon: '⚠️' },
    skipped: { label: 'Skipped', labelBn: 'বাদ', color: '#9CA3AF', icon: '⏭️' },
};

// Study task
export interface StudyTask {
    id: string;
    title: string;
    titleBn: string;
    description?: string;
    subjectId: string;
    subjectName: string;
    chapterId?: string;
    chapterName?: string;
    priority: TaskPriority;
    status: TaskStatus;
    estimatedMinutes: number;
    actualMinutes?: number;
    scheduledDate: Date;
    scheduledTime?: string; // HH:MM
    completedAt?: Date;
    notes?: string;
}

// Daily goal
export interface DailyGoal {
    id: string;
    date: Date;
    targetMinutes: number;
    completedMinutes: number;
    targetTasks: number;
    completedTasks: number;
    tasks: StudyTask[];
}

// Weekly schedule slot
export interface ScheduleSlot {
    id: string;
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:MM
    endTime: string;
    subjectId: string;
    subjectName: string;
    subjectColor: string;
    isRecurring: boolean;
}

// Week plan
export interface WeekPlan {
    weekStart: Date;
    weekEnd: Date;
    slots: ScheduleSlot[];
    goals: DailyGoal[];
}

// Study session (for tracking)
export interface StudySession {
    id: string;
    taskId: string;
    startTime: Date;
    endTime?: Date;
    duration: number; // minutes
    notes?: string;
}

// Reminder
export interface StudyReminder {
    id: string;
    taskId?: string;
    title: string;
    message: string;
    scheduledTime: Date;
    isRead: boolean;
    type: 'task' | 'goal' | 'streak' | 'custom';
}

// Study stats
export interface StudyStats {
    totalMinutesToday: number;
    totalMinutesWeek: number;
    tasksCompletedToday: number;
    tasksCompletedWeek: number;
    currentStreak: number;
    longestStreak: number;
    averageMinutesPerDay: number;
    favoriteSubject: string;
}

// Calendar day data
export interface CalendarDay {
    date: Date;
    isToday: boolean;
    isCurrentMonth: boolean;
    hasTask: boolean;
    taskCount: number;
    completedCount: number;
    totalMinutes: number;
}

// Helper functions
export function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins} min`;
}

export function formatTimeRange(start: string, end: string): string {
    return `${start} - ${end}`;
}

export function getTasksForDate(tasks: StudyTask[], date: Date): StudyTask[] {
    return tasks.filter(task => {
        const taskDate = new Date(task.scheduledDate);
        return (
            taskDate.getFullYear() === date.getFullYear() &&
            taskDate.getMonth() === date.getMonth() &&
            taskDate.getDate() === date.getDate()
        );
    });
}

export function calculateProgress(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}

export function isOverdue(task: StudyTask): boolean {
    if (task.status === 'completed') return false;
    const now = new Date();
    const taskDate = new Date(task.scheduledDate);
    return taskDate < now;
}

// Days of week (Bengali)
export const daysOfWeek = [
    { id: 0, name: 'Sunday', nameBn: 'রবিবার', short: 'Sun', shortBn: 'রবি' },
    { id: 1, name: 'Monday', nameBn: 'সোমবার', short: 'Mon', shortBn: 'সোম' },
    { id: 2, name: 'Tuesday', nameBn: 'মঙ্গলবার', short: 'Tue', shortBn: 'মঙ্গল' },
    { id: 3, name: 'Wednesday', nameBn: 'বুধবার', short: 'Wed', shortBn: 'বুধ' },
    { id: 4, name: 'Thursday', nameBn: 'বৃহস্পতিবার', short: 'Thu', shortBn: 'বৃহ' },
    { id: 5, name: 'Friday', nameBn: 'শুক্রবার', short: 'Fri', shortBn: 'শুক্র' },
    { id: 6, name: 'Saturday', nameBn: 'শনিবার', short: 'Sat', shortBn: 'শনি' },
];
