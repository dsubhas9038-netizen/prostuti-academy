'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { PaymentForm, PaymentSuccess, PaymentFailed } from '@/components/payment';
import { Button, Badge } from '@/components/ui';
import { Plan, BillingCycle, Transaction } from '@/types/payment';
import { plans, isPhase1 } from '@/data/samplePaymentData';
import Link from 'next/link';

// Checkout content component that uses useSearchParams
function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [step, setStep] = useState<'checkout' | 'success' | 'failed'>('checkout');
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    // Get plan from URL
    const planId = searchParams.get('plan') || 'premium';
    const cycle = (searchParams.get('cycle') || 'monthly') as BillingCycle;

    const selectedPlan = plans.find(p => p.id === planId);

    // Phase 1: Redirect to pricing if someone tries to checkout
    useEffect(() => {
        if (isPhase1()) {
            // Show a message that everything is free
        }
    }, []);

    const handlePaymentSubmit = async (data: { paymentMethod: string; couponCode?: string }) => {
        // Simulate payment processing
        const success = Math.random() > 0.2; // 80% success rate for demo

        if (success) {
            const newTransaction: Transaction = {
                id: `txn_${Date.now()}`,
                userId: 'user_001',
                amount: cycle === 'monthly' ? (selectedPlan?.monthlyPrice || 0) : (selectedPlan?.yearlyPrice || 0),
                currency: 'INR',
                status: 'success',
                paymentMethod: data.paymentMethod as any,
                razorpayPaymentId: `pay_${Date.now()}`,
                description: `${selectedPlan?.name} Plan - ${cycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setTransaction(newTransaction);
            setStep('success');
        } else {
            setStep('failed');
        }
    };

    const handleRetry = () => {
        setStep('checkout');
        setTransaction(null);
    };

    // Phase 1: Everything is free message
    if (isPhase1()) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="h-10 w-10 text-white" />
                    </div>

                    <Badge size="lg" className="bg-green-100 text-green-700 mb-4">
                        Phase 1 🎉
                    </Badge>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Everything is FREE!
                    </h1>
                    <p className="text-gray-500 font-bengali mb-2">
                        সব কিছু বিনামূল্যে!
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        During our launch phase, all premium features are available for free.
                        No payment required!
                    </p>

                    <div className="space-y-3">
                        <Link href="/subjects">
                            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                                Start Learning - It's Free!
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button variant="outline" className="w-full">
                                View All Features
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    if (step === 'success') {
        return (
            <PaymentSuccess
                transaction={transaction!}
                plan={selectedPlan}
                onDownloadInvoice={() => console.log('Download invoice')}
            />
        );
    }

    // Failed state
    if (step === 'failed') {
        return (
            <PaymentFailed
                transaction={transaction || undefined}
                onRetry={handleRetry}
            />
        );
    }

    // Checkout state
    if (!selectedPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Plan not found</p>
                    <Link href="/pricing">
                        <Button>View Plans</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/pricing">
                            <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                                Back to Plans
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Lock className="h-4 w-4" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Complete Your Purchase
                    </h1>
                    <p className="text-gray-500 font-bengali">তোমার কেনাকাটা সম্পূর্ণ করো</p>
                </div>

                <PaymentForm
                    plan={selectedPlan}
                    billingCycle={cycle}
                    onSubmit={handlePaymentSubmit}
                    onBack={() => router.push('/pricing')}
                />
            </div>
        </div>
    );
}

// Main checkout page with Suspense boundary
export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
