import { format, formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

export function formatDate(date: Date | string, pattern: string = 'dd MMM yyyy') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, pattern);
}

export function formatRelativeDate(date: Date | string) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function formatDateBengali(date: Date | string, pattern: string = 'dd MMM yyyy') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, pattern, { locale: bn });
}

export function getTimeRemaining(targetDate: Date) {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
}
