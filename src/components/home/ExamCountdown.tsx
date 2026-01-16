'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

// Exam dates (update these as needed)
const upcomingExams = [
    {
        id: 1,
        name: 'HS Semester 2 Exam 2025',
        nameBn: 'উচ্চমাধ্যমিক সেমিস্টার ২ পরীক্ষা ২০২৫',
        date: new Date('2025-04-15'),
        type: 'semester',
    },
    {
        id: 2,
        name: 'HS Final Exam 2025',
        nameBn: 'উচ্চমাধ্যমিক ফাইনাল পরীক্ষা ২০২৫',
        date: new Date('2025-03-01'),
        type: 'final',
    },
];

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function ExamCountdown() {
    const [currentExamIndex, setCurrentExamIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const currentExam = upcomingExams[currentExamIndex];

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const examDate = currentExam.date.getTime();
            const difference = examDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [currentExam]);

    const timeBlocks = [
        { value: timeLeft.days, label: 'Days', labelBn: 'দিন' },
        { value: timeLeft.hours, label: 'Hours', labelBn: 'ঘণ্টা' },
        { value: timeLeft.minutes, label: 'Minutes', labelBn: 'মিনিট' },
        { value: timeLeft.seconds, label: 'Seconds', labelBn: 'সেকেন্ড' },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-6">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">Exam Countdown</span>
                    </div>

                    {/* Exam Name */}
                    <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {currentExam.name}
                    </h2>
                    <p className="text-gray-500 font-bengali mb-8">
                        {currentExam.nameBn}
                    </p>

                    {/* Countdown Timer */}
                    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto mb-8">
                        {timeBlocks.map((block, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-sm"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1">
                                    {String(block.value).padStart(2, '0')}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                    {block.labelBn}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            rightIcon={<ArrowRight className="h-5 w-5" />}
                        >
                            প্রস্তুতি শুরু করো
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            leftIcon={<Bell className="h-5 w-5" />}
                        >
                            Reminder Set করো
                        </Button>
                    </div>

                    {/* Exam Switcher (if multiple exams) */}
                    {upcomingExams.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {upcomingExams.map((exam, index) => (
                                <button
                                    key={exam.id}
                                    onClick={() => setCurrentExamIndex(index)}
                                    className={cn(
                                        'w-2 h-2 rounded-full transition-all',
                                        index === currentExamIndex
                                            ? 'w-6 bg-blue-600'
                                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ExamCountdown;
