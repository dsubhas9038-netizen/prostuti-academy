'use client';

import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
    password: string;
    showRequirements?: boolean;
    className?: string;
}

interface Requirement {
    label: string;
    labelBn: string;
    test: (password: string) => boolean;
}

const requirements: Requirement[] = [
    {
        label: 'At least 8 characters',
        labelBn: 'কমপক্ষে ৮টি অক্ষর',
        test: (password) => password.length >= 8,
    },
    {
        label: 'Contains uppercase letter',
        labelBn: 'বড় হাতের অক্ষর আছে',
        test: (password) => /[A-Z]/.test(password),
    },
    {
        label: 'Contains lowercase letter',
        labelBn: 'ছোট হাতের অক্ষর আছে',
        test: (password) => /[a-z]/.test(password),
    },
    {
        label: 'Contains number',
        labelBn: 'সংখ্যা আছে',
        test: (password) => /[0-9]/.test(password),
    },
];

function PasswordStrength({
    password,
    showRequirements = true,
    className
}: PasswordStrengthProps) {
    const strength = useMemo(() => {
        if (!password) return 0;

        let score = 0;
        requirements.forEach((req) => {
            if (req.test(password)) score++;
        });

        return score;
    }, [password]);

    const strengthLabel = useMemo(() => {
        if (strength === 0) return { text: '', textBn: '', color: '' };
        if (strength === 1) return { text: 'Weak', textBn: 'দুর্বল', color: 'text-red-500' };
        if (strength === 2) return { text: 'Fair', textBn: 'মোটামুটি', color: 'text-orange-500' };
        if (strength === 3) return { text: 'Good', textBn: 'ভালো', color: 'text-yellow-500' };
        return { text: 'Strong', textBn: 'শক্তিশালী', color: 'text-green-500' };
    }, [strength]);

    const strengthColors = ['bg-gray-200 dark:bg-gray-700', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    if (!password) return null;

    return (
        <div className={cn('space-y-3', className)}>
            {/* Strength Bar */}
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className={cn('text-xs font-medium', strengthLabel.color)}>
                        {strengthLabel.textBn}
                    </span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={cn(
                                'h-1.5 flex-1 rounded-full transition-colors',
                                level <= strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-gray-700'
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Requirements List */}
            {showRequirements && (
                <ul className="space-y-1">
                    {requirements.map((req, index) => {
                        const passed = req.test(password);
                        return (
                            <li
                                key={index}
                                className={cn(
                                    'flex items-center gap-2 text-xs transition-colors',
                                    passed ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                                )}
                            >
                                {passed ? (
                                    <Check className="h-3 w-3" />
                                ) : (
                                    <X className="h-3 w-3" />
                                )}
                                <span>{req.labelBn}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default PasswordStrength;
