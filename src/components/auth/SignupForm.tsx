'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/firebase';
import { Button, Input } from '@/components/ui';
import GoogleSignInButton from './GoogleSignInButton';
import SocialDivider from './SocialDivider';
import PasswordStrength from './PasswordStrength';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface SignupFormProps {
    redirectTo?: string;
    className?: string;
}

function SignupForm({ redirectTo = '/dashboard', className }: SignupFormProps) {
    const router = useRouter();
    const { signUp, signInGoogle } = useAuth();

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);

    // Form validation
    const validateForm = (): boolean => {
        if (!name.trim()) {
            setError('তোমার নাম দাও');
            return false;
        }
        if (name.trim().length < 2) {
            setError('নাম কমপক্ষে ২ অক্ষর হতে হবে');
            return false;
        }
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
        if (password.length < 8) {
            setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে');
            return false;
        }
        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড মিলছে না');
            return false;
        }
        if (!acceptTerms) {
            setError('শর্তাবলী মেনে নিতে হবে');
            return false;
        }
        return true;
    };

    // Handle email signup
    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await signUp(email, password, name.trim());
            toast.success('একাউন্ট তৈরি হয়েছে! 🎉');
            router.push(redirectTo);
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google signup
    const handleGoogleSignup = async () => {
        setError(null);
        try {
            await signInGoogle();
            toast.success('একাউন্ট তৈরি হয়েছে! 🎉');
            router.push(redirectTo);
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code);
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    // Check if passwords match
    const passwordsMatch = password && confirmPassword && password === confirmPassword;
    const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

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

            {/* Google Sign Up */}
            <GoogleSignInButton
                onSignIn={handleGoogleSignup}
                text="Google দিয়ে সাইন আপ করো"
                disabled={isLoading}
            />

            {/* Divider */}
            <SocialDivider text="অথবা ইমেইল দিয়ে" />

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
                {/* Name Input */}
                <Input
                    type="text"
                    label="তোমার নাম"
                    placeholder="যেমন: রাহুল মণ্ডল"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(null);
                    }}
                    leftIcon={<User className="h-5 w-5" />}
                    disabled={isLoading}
                    autoComplete="name"
                />

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
                <div>
                    <Input
                        type="password"
                        label="পাসওয়ার্ড"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        onFocus={() => setShowPasswordStrength(true)}
                        leftIcon={<Lock className="h-5 w-5" />}
                        disabled={isLoading}
                        autoComplete="new-password"
                    />

                    {/* Password Strength */}
                    {showPasswordStrength && password && (
                        <div className="mt-3">
                            <PasswordStrength password={password} />
                        </div>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                    <Input
                        type="password"
                        label="পাসওয়ার্ড নিশ্চিত করো"
                        placeholder="আবার পাসওয়ার্ড দাও"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError(null);
                        }}
                        leftIcon={<Lock className="h-5 w-5" />}
                        rightIcon={
                            passwordsMatch ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : null
                        }
                        error={passwordsDontMatch ? 'পাসওয়ার্ড মিলছে না' : undefined}
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => {
                            setAcceptTerms(e.target.checked);
                            setError(null);
                        }}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">
                        আমি{' '}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                            সেবার শর্তাবলী
                        </Link>{' '}
                        এবং{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                            গোপনীয়তা নীতি
                        </Link>{' '}
                        মেনে নিচ্ছি
                    </span>
                </label>

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                    loadingText="একাউন্ট তৈরি হচ্ছে..."
                    disabled={!acceptTerms}
                >
                    ফ্রি একাউন্ট খোলো
                </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-500">
                আগে থেকেই একাউন্ট আছে?{' '}
                <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    লগইন করো
                </Link>
            </p>
        </div>
    );
}

export default SignupForm;
