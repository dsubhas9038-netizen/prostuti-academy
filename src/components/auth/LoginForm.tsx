'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/firebase';
import { Button, Input } from '@/components/ui';
import GoogleSignInButton from './GoogleSignInButton';
import SocialDivider from './SocialDivider';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface LoginFormProps {
    redirectTo?: string;
    className?: string;
}

function LoginForm({ redirectTo = '/dashboard', className }: LoginFormProps) {
    const router = useRouter();
    const { signIn, signInGoogle } = useAuth();

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        if (!password) {
            setError('পাসওয়ার্ড দাও');
            return false;
        }
        if (password.length < 6) {
            setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে');
            return false;
        }
        return true;
    };

    // Handle email login
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await signIn(email, password);
            toast.success('সফলভাবে লগইন হয়েছে!');
            router.push(redirectTo);
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        setError(null);
        try {
            await signInGoogle();
            toast.success('সফলভাবে লগইন হয়েছে!');
            router.push(redirectTo);
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className={cn('w-full', className)}>
            {/* Error Alert */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Google Sign In */}
            <GoogleSignInButton
                onSignIn={handleGoogleLogin}
                text="Google দিয়ে লগইন করো"
                disabled={isLoading}
            />

            {/* Divider */}
            <SocialDivider text="অথবা ইমেইল দিয়ে" />

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
                />

                {/* Password Input */}
                <Input
                    type="password"
                    label="পাসওয়ার্ড"
                    placeholder="তোমার পাসওয়ার্ড"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                    }}
                    leftIcon={<Lock className="h-5 w-5" />}
                    disabled={isLoading}
                    autoComplete="current-password"
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-500">
                            মনে রাখো
                        </span>
                    </label>

                    <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        পাসওয়ার্ড ভুলে গেছো?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                    loadingText="লগইন হচ্ছে..."
                >
                    লগইন করো
                </Button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-500">
                একাউন্ট নেই?{' '}
                <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline"
                >
                    ফ্রি-তে তৈরি করো
                </Link>
            </p>
        </div>
    );
}

export default LoginForm;
