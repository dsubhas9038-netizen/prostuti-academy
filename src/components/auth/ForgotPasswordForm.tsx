'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/firebase';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ForgotPasswordFormProps {
    className?: string;
}

function ForgotPasswordForm({ className }: ForgotPasswordFormProps) {
    // Form state
    const [email, setEmail] = useState('');

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { sendPasswordReset } = useAuth();

    // Form validation
    const validateForm = (): boolean => {
        if (!email.trim()) {
            setError('ইমেইল দাও');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('সঠিক ইমেইল দাও');
            return false;
        }
        return true;
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await sendPasswordReset(email);
            setIsSuccess(true);
            toast.success('পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে!');
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Success State
    if (isSuccess) {
        return (
            <div className={cn('w-full text-center', className)}>
                {/* Success Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                </div>

                {/* Success Message */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ইমেইল পাঠানো হয়েছে! ✉️
                </h3>
                <p className="text-gray-500 mb-6">
                    <span className="font-medium text-gray-900 dark:text-white">{email}</span> এ
                    পাসওয়ার্ড রিসেট করার লিংক পাঠানো হয়েছে।
                    তোমার ইনবক্স চেক করো।
                </p>

                {/* Tips */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm text-gray-500">
                        <strong>ইমেইল পাচ্ছো না?</strong>
                    </p>
                    <ul className="text-sm text-gray-500 mt-2 space-y-1">
                        <li>• Spam/Junk ফোল্ডার চেক করো</li>
                        <li>• কিছুক্ষণ অপেক্ষা করো (2-3 মিনিট)</li>
                        <li>• ইমেইল ঠিকানা সঠিক কিনা দেখো</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={() => {
                            setIsSuccess(false);
                            setEmail('');
                        }}
                    >
                        আবার চেষ্টা করো
                    </Button>

                    <Link href="/login">
                        <Button fullWidth leftIcon={<ArrowLeft className="h-4 w-4" />}>
                            লগইন এ ফিরে যাও
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Form State
    return (
        <div className={cn('w-full', className)}>
            {/* Description */}
            <p className="text-sm text-gray-500 text-center mb-6">
                তোমার ইমেইল দাও। আমরা পাসওয়ার্ড রিসেট করার লিংক পাঠিয়ে দেব।
            </p>

            {/* Error Alert */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <Input
                    type="email"
                    label="ইমেইল"
                    placeholder="tomar@email.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                    }}
                    leftIcon={<Mail className="h-5 w-5" />}
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                    loadingText="পাঠানো হচ্ছে..."
                >
                    রিসেট লিংক পাঠাও
                </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    লগইন এ ফিরে যাও
                </Link>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
