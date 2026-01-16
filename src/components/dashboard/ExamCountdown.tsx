'use client';

import React, { useState, useEffect } from 'react';
import {
    Calendar,
    Clock,
    AlertCircle,
    Target,
    GraduationCap
} from 'lucide-react';
import { Card, CardBody, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ExamCountdownProps {
    examName: string;
    examNameBn: string;
    examDate: Date;
    showMotivation?: boolean;
    variant?: 'default' | 'compact' | 'hero';
    className?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

function ExamCountdown({
    examName,
    examNameBn,
    examDate,
    showMotivation = true,
    variant = 'default',
    className,
}: ExamCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0, hours: 0, minutes: 0, seconds: 0, total: 0
    });
    const [mounted, setMounted] = useState(false);

    // Calculate time remaining
    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = (): TimeLeft => {
            const difference = examDate.getTime() - new Date().getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                total: difference,
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [examDate]);

    // Get urgency level
    const getUrgency = () => {
        const daysLeft = timeLeft.days;
        if (daysLeft <= 7) return { color: '#EF4444', label: 'Critical', labelBn: 'জরুরি', bg: 'from-red-500 to-orange-500' };
        if (daysLeft <= 30) return { color: '#F59E0B', label: 'Warning', labelBn: 'সতর্কতা', bg: 'from-yellow-500 to-orange-500' };
        if (daysLeft <= 60) return { color: '#3B82F6', label: 'Preparing', labelBn: 'প্রস্তুতি', bg: 'from-blue-500 to-purple-500' };
        return { color: '#22C55E', label: 'Relaxed', labelBn: 'স্বাভাবিক', bg: 'from-green-500 to-teal-500' };
    };

    const urgency = getUrgency();

    // Get motivation message
    const getMotivation = () => {
        const daysLeft = timeLeft.days;
        if (daysLeft <= 7) return 'এখনই শেষ চাপ দাও! তুমি পারবে! 💪';
        if (daysLeft <= 30) return 'গুরুত্বপূর্ণ সময়! প্রতিদিন পড়ো! 📚';
        if (daysLeft <= 60) return 'নিয়মিত অনুশীলন চালিয়ে যাও! ⭐';
        return 'সময় আছে, তবে আগে থেকে প্রস্তুতি নাও! 🎯';
    };

    if (!mounted) return null;

    // Time box component
    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="text-center">
            <div className={cn(
                'text-2xl md:text-4xl font-bold text-white',
                variant === 'compact' && 'text-xl md:text-2xl'
            )}>
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-white/80 mt-1">{label}</div>
        </div>
    );

    // Compact variant
    if (variant === 'compact') {
        return (
            <div className={cn(
                'p-4 rounded-xl bg-gradient-to-r',
                urgency.bg,
                className
            )}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5" />
                        <span className="font-medium">{examNameBn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
                        <span className="text-white/80 text-sm">days left</span>
                    </div>
                </div>
            </div>
        );
    }

    // Hero variant
    if (variant === 'hero') {
        return (
            <div className={cn(
                'relative overflow-hidden rounded-2xl bg-gradient-to-r p-8',
                urgency.bg,
                className
            )}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4">
                        <GraduationCap className="h-32 w-32 text-white" />
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-6 w-6 text-white" />
                        <h2 className="text-xl font-bold text-white">{examNameBn}</h2>
                        <Badge className="bg-white/20 text-white">{urgency.labelBn}</Badge>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center justify-center gap-4 md:gap-8 py-6">
                        <TimeBox value={timeLeft.days} label="Days" />
                        <div className="text-2xl text-white/60">:</div>
                        <TimeBox value={timeLeft.hours} label="Hours" />
                        <div className="text-2xl text-white/60">:</div>
                        <TimeBox value={timeLeft.minutes} label="Mins" />
                        <div className="text-2xl text-white/60">:</div>
                        <TimeBox value={timeLeft.seconds} label="Secs" />
                    </div>

                    {/* Motivation */}
                    {showMotivation && (
                        <div className="text-center">
                            <p className="text-white/90 font-bengali text-lg">
                                {getMotivation()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <Card className={cn('overflow-hidden', className)}>
            <div className={cn('p-4 bg-gradient-to-r', urgency.bg)}>
                <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-5 w-5" />
                    <h3 className="font-semibold">{examNameBn}</h3>
                    <Badge className="bg-white/20 text-white ml-auto">{urgency.labelBn}</Badge>
                </div>
            </div>
            <CardBody>
                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                        { value: timeLeft.days, label: 'Days', labelBn: 'দিন' },
                        { value: timeLeft.hours, label: 'Hrs', labelBn: 'ঘণ্টা' },
                        { value: timeLeft.minutes, label: 'Mins', labelBn: 'মিনিট' },
                        { value: timeLeft.seconds, label: 'Secs', labelBn: 'সেকেন্ড' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {item.value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-500 font-bengali">{item.labelBn}</div>
                        </div>
                    ))}
                </div>

                {/* Motivation */}
                {showMotivation && (
                    <div className={cn(
                        'p-3 rounded-lg text-sm font-bengali text-center',
                        timeLeft.days <= 7
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    )}>
                        {getMotivation()}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default ExamCountdown;
