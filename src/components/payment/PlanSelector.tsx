'use client';

import React, { useState } from 'react';
import { Check, Shield } from 'lucide-react';
import { Card, CardBody, Badge } from '@/components/ui';
import { PricingCard } from './index';
import { Plan, BillingCycle, calculateSavings } from '@/types/payment';
import { plans } from '@/data/samplePaymentData';
import { cn } from '@/lib/utils';

interface PlanSelectorProps {
    onSelect?: (planId: string, billingCycle: BillingCycle) => void;
    currentPlanId?: string;
    className?: string;
}

function PlanSelector({
    onSelect,
    currentPlanId = 'free',
    className
}: PlanSelectorProps) {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId);
        onSelect?.(planId, billingCycle);
    };

    // Mark current plan
    const plansWithCurrent = plans.map(plan => ({
        ...plan,
        isCurrent: plan.id === currentPlanId,
    }));

    // Calculate max savings
    const maxSavings = Math.max(...plans.map(p => calculateSavings(p.monthlyPrice, p.yearlyPrice)));

    return (
        <div className={cn('space-y-8', className)}>
            {/* Billing Toggle */}
            <div className="flex flex-col items-center gap-4">
                <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={cn(
                            'px-6 py-2 rounded-lg font-medium transition-all',
                            billingCycle === 'monthly'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                                : 'text-gray-500 hover:text-gray-700'
                        )}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={cn(
                            'px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2',
                            billingCycle === 'yearly'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                                : 'text-gray-500 hover:text-gray-700'
                        )}
                    >
                        Yearly
                        {maxSavings > 0 && (
                            <Badge size="sm" className="bg-green-100 text-green-700">
                                Save up to {maxSavings}%
                            </Badge>
                        )}
                    </button>
                </div>

                <p className="text-sm text-gray-500 font-bengali">
                    {billingCycle === 'yearly'
                        ? 'বার্ষিক প্ল্যানে সাশ্রয় করো!'
                        : 'মাসিক বিলিং নির্বাচিত'
                    }
                </p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {plansWithCurrent.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        plan={plan}
                        billingCycle={billingCycle}
                        onSelect={handlePlanSelect}
                        isSelected={selectedPlan === plan.id}
                    />
                ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>7-Day Money Back</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Cancel Anytime</span>
                </div>
            </div>

            {/* Payment Partners */}
            <div className="text-center">
                <p className="text-xs text-gray-400 mb-3">Powered by</p>
                <div className="flex items-center justify-center gap-6">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span className="font-bold text-blue-600">Razorpay</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">UPI</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm">Cards</span>
                        <span className="text-sm">•</span>
                        <span className="text-sm">NetBanking</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanSelector;
