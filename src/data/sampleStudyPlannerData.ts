import {
    StudyTask,
    DailyGoal,
    ScheduleSlot,
    WeekPlan,
    StudyStats,
    StudyReminder,
} from '@/types/studyPlanner';

// Get today and other dates
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Sample Study Tasks
export const sampleStudyTasks: StudyTask[] = [
    {
        id: 't1', title: 'Pather Dabi Summary', titleBn: 'পথের দাবী সারাংশ',
        subjectId: 'bengali', subjectName: 'Bengali', chapterId: 'ch1', chapterName: 'পথের দাবী',
        priority: 'high', status: 'completed', estimatedMinutes: 45, actualMinutes: 50,
        scheduledDate: today, scheduledTime: '09:00', completedAt: new Date(),
    },
    {
        id: 't2', title: 'English Grammar', titleBn: 'ইংরেজি ব্যাকরণ',
        subjectId: 'english', subjectName: 'English', chapterId: 'ch3', chapterName: 'Grammar',
        priority: 'medium', status: 'in_progress', estimatedMinutes: 30,
        scheduledDate: today, scheduledTime: '10:00',
    },
    {
        id: 't3', title: 'History Chapter 3', titleBn: 'ইতিহাস অধ্যায় ৩',
        subjectId: 'history', subjectName: 'History', chapterId: 'ch3', chapterName: 'Chapter 3',
        priority: 'medium', status: 'pending', estimatedMinutes: 60,
        scheduledDate: today, scheduledTime: '11:00',
    },
    {
        id: 't4', title: 'Philosophy Notes', titleBn: 'দর্শন নোটস',
        subjectId: 'philosophy', subjectName: 'Philosophy',
        priority: 'low', status: 'pending', estimatedMinutes: 40,
        scheduledDate: today, scheduledTime: '14:00',
    },
    {
        id: 't5', title: 'Bengali Mock Test', titleBn: 'বাংলা মক টেস্ট',
        subjectId: 'bengali', subjectName: 'Bengali',
        priority: 'high', status: 'pending', estimatedMinutes: 90,
        scheduledDate: tomorrow, scheduledTime: '09:00',
    },
    {
        id: 't6', title: 'History PYQ Practice', titleBn: 'ইতিহাস বিগত বছর',
        subjectId: 'history', subjectName: 'History',
        priority: 'medium', status: 'pending', estimatedMinutes: 45,
        scheduledDate: tomorrow, scheduledTime: '11:00',
    },
];

// Sample Daily Goals
export const sampleDailyGoals: DailyGoal[] = [
    {
        id: 'g1', date: today,
        targetMinutes: 180, completedMinutes: 50,
        targetTasks: 4, completedTasks: 1,
        tasks: sampleStudyTasks.filter(t => t.scheduledDate.toDateString() === today.toDateString()),
    },
    {
        id: 'g2', date: yesterday,
        targetMinutes: 180, completedMinutes: 165,
        targetTasks: 3, completedTasks: 3,
        tasks: [],
    },
];

// Sample Schedule Slots
export const sampleScheduleSlots: ScheduleSlot[] = [
    { id: 's1', dayOfWeek: 1, startTime: '09:00', endTime: '10:00', subjectId: 'bengali', subjectName: 'Bengali', subjectColor: '#3B82F6', isRecurring: true },
    { id: 's2', dayOfWeek: 1, startTime: '10:30', endTime: '11:30', subjectId: 'english', subjectName: 'English', subjectColor: '#22C55E', isRecurring: true },
    { id: 's3', dayOfWeek: 2, startTime: '09:00', endTime: '10:30', subjectId: 'history', subjectName: 'History', subjectColor: '#8B5CF6', isRecurring: true },
    { id: 's4', dayOfWeek: 2, startTime: '11:00', endTime: '12:00', subjectId: 'philosophy', subjectName: 'Philosophy', subjectColor: '#F59E0B', isRecurring: true },
    { id: 's5', dayOfWeek: 3, startTime: '09:00', endTime: '10:00', subjectId: 'bengali', subjectName: 'Bengali', subjectColor: '#3B82F6', isRecurring: true },
    { id: 's6', dayOfWeek: 3, startTime: '10:30', endTime: '12:00', subjectId: 'english', subjectName: 'English', subjectColor: '#22C55E', isRecurring: true },
    { id: 's7', dayOfWeek: 4, startTime: '09:00', endTime: '10:30', subjectId: 'history', subjectName: 'History', subjectColor: '#8B5CF6', isRecurring: true },
    { id: 's8', dayOfWeek: 5, startTime: '09:00', endTime: '11:00', subjectId: 'bengali', subjectName: 'Bengali', subjectColor: '#3B82F6', isRecurring: true },
    { id: 's9', dayOfWeek: 6, startTime: '10:00', endTime: '12:00', subjectId: 'philosophy', subjectName: 'Philosophy', subjectColor: '#F59E0B', isRecurring: true },
];

// Sample Study Stats
export const sampleStudyStats: StudyStats = {
    totalMinutesToday: 50,
    totalMinutesWeek: 420,
    tasksCompletedToday: 1,
    tasksCompletedWeek: 12,
    currentStreak: 7,
    longestStreak: 15,
    averageMinutesPerDay: 60,
    favoriteSubject: 'Bengali',
};

// Sample Reminders
export const sampleReminders: StudyReminder[] = [
    { id: 'r1', taskId: 't2', title: 'Study Time', message: 'English Grammar in 15 minutes', scheduledTime: new Date(), isRead: false, type: 'task' },
    { id: 'r2', title: 'Daily Goal', message: 'Complete 2 more tasks to reach your goal!', scheduledTime: new Date(), isRead: false, type: 'goal' },
    { id: 'r3', title: '🔥 Streak Alert', message: 'Keep your 7-day streak alive!', scheduledTime: new Date(), isRead: true, type: 'streak' },
];

// Getters
export function getTodaysTasks(): StudyTask[] {
    const today = new Date();
    return sampleStudyTasks.filter(t =>
        t.scheduledDate.toDateString() === today.toDateString()
    );
}

export function getTodaysGoal(): DailyGoal | undefined {
    const today = new Date();
    return sampleDailyGoals.find(g =>
        g.date.toDateString() === today.toDateString()
    );
}

export function getWeekSchedule(): ScheduleSlot[] {
    return sampleScheduleSlots;
}

export function getStudyStats(): StudyStats {
    return sampleStudyStats;
}

export function getReminders(): StudyReminder[] {
    return sampleReminders;
}

export function getTaskById(id: string): StudyTask | undefined {
    return sampleStudyTasks.find(t => t.id === id);
}

export function getTasksForWeek(): StudyTask[] {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return sampleStudyTasks.filter(t =>
        t.scheduledDate >= weekStart && t.scheduledDate <= weekEnd
    );
}
