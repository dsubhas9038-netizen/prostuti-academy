'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, Pause, Play, AlertTriangle, AlertCircle } from 'lucide-react';
import { TimerStatus, formatTime, getTimerStatus } from '@/types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestTimerProps {
    initialSeconds: number;
    onTimeUpdate?: (remainingSeconds: number) => void;
    onTimeWarning?: (status: TimerStatus) => void;
    onTimeExpired?: () => void;
    isPaused?: boolean;
    showControls?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

function TestTimer({
    initialSeconds,
    onTimeUpdate,
    onTimeWarning,
    onTimeExpired,
    isPaused = false,
    showControls = false,
    size = 'md',
    className,
}: TestTimerProps) {
    const [remainingTime, setRemainingTime] = useState(initialSeconds);
    const [status, setStatus] = useState<TimerStatus>('running');
    const [paused, setPaused] = useState(isPaused);
    const previousStatus = useRef<TimerStatus>('running');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Timer logic
    useEffect(() => {
        if (paused || remainingTime <= 0) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setRemainingTime((prev) => {
                const newTime = prev - 1;

                // Notify parent of time update
                onTimeUpdate?.(newTime);

                // Check status change
                const newStatus = getTimerStatus(newTime, initialSeconds);
                if (newStatus !== previousStatus.current) {
                    previousStatus.current = newStatus;
                    setStatus(newStatus);
                    onTimeWarning?.(newStatus);

                    if (newStatus === 'expired') {
                        onTimeExpired?.();
                    }
                }

                return newTime;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [paused, remainingTime, initialSeconds, onTimeUpdate, onTimeWarning, onTimeExpired]);

    // Sync with external pause state
    useEffect(() => {
        setPaused(isPaused);
    }, [isPaused]);

    // Get status-based styling
    const getStatusStyles = () => {
        switch (status) {
            case 'critical':
                return {
                    bg: 'bg-red-100 dark:bg-red-900/30',
                    text: 'text-red-600 dark:text-red-400',
                    border: 'border-red-500',
                    icon: AlertCircle,
                    blink: true,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                    text: 'text-yellow-600 dark:text-yellow-400',
                    border: 'border-yellow-500',
                    icon: AlertTriangle,
                    blink: false,
                };
            case 'expired':
                return {
                    bg: 'bg-gray-100 dark:bg-gray-900/30',
                    text: 'text-gray-500',
                    border: 'border-gray-500',
                    icon: Clock,
                    blink: false,
                };
            default:
                return {
                    bg: 'bg-blue-100 dark:bg-blue-900/30',
                    text: 'text-blue-600 dark:text-blue-400',
                    border: 'border-blue-500',
                    icon: Clock,
                    blink: false,
                };
        }
    };

    const styles = getStatusStyles();
    const formattedTime = formatTime(remainingTime);

    // Size classes
    const sizeClasses = {
        sm: {
            container: 'px-3 py-1.5',
            icon: 'h-4 w-4',
            text: 'text-lg',
        },
        md: {
            container: 'px-4 py-2',
            icon: 'h-5 w-5',
            text: 'text-xl',
        },
        lg: {
            container: 'px-6 py-3',
            icon: 'h-6 w-6',
            text: 'text-2xl',
        },
    };

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-xl border-2',
                styles.bg,
                styles.border,
                sizeClasses[size].container,
                styles.blink && 'animate-pulse',
                className
            )}
        >
            {/* Icon */}
            <styles.icon className={cn(sizeClasses[size].icon, styles.text)} />

            {/* Time Display */}
            <span
                className={cn(
                    'font-mono font-bold',
                    sizeClasses[size].text,
                    styles.text
                )}
            >
                {formattedTime}
            </span>

            {/* Pause/Resume Controls */}
            {showControls && status !== 'expired' && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPaused(!paused)}
                    className="ml-2"
                >
                    {paused ? (
                        <Play className="h-4 w-4" />
                    ) : (
                        <Pause className="h-4 w-4" />
                    )}
                </Button>
            )}

            {/* Status Label */}
            {status === 'critical' && (
                <span className="text-xs font-medium text-red-600 animate-pulse">
                    Hurry!
                </span>
            )}
            {status === 'warning' && (
                <span className="text-xs font-medium text-yellow-600">
                    5 min left
                </span>
            )}
            {status === 'expired' && (
                <span className="text-xs font-medium text-gray-500">
                    Time's up!
                </span>
            )}
        </div>
    );
}

export default TestTimer;
