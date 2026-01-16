'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Calendar, Clock, RefreshCw, XCircle, ArrowUpRight, Settings, Sparkles } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { Subscription, Plan, planConfig, formatDate, formatPrice, isSubscriptionActive } from '@/types/payment';
import { isPhase1 } from '@/data/samplePaymentData';
import { cn } from '@/lib/utils';

interface SubscriptionStatusProps {
    subscription?: Subscription | null;
    plan?: Plan;
    onUpgrade?: () => void;
    onCancel?: () => void;
    onManage?: () => void;
    variant?: 'full' | 'compact';
    className?: string;
}

function SubscriptionStatus({
    subscription,
    plan,
    onUpgrade,
    onCancel,
    onManage,
    variant = 'full',
    className
}: SubscriptionStatusProps) {
    const config = plan ? planConfig[plan.id] : planConfig.free;
    const isActive = subscription ? isSubscriptionActive(subscription) : false;
    const isFree = plan?.id === 'free' || !plan;

    // Calculate days remaining
    const daysRemaining = subscription
        ? Math.max(0, Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0;

    // Phase 1: Everything is free
    if (isPhase1()) {
        return (
            <Card className={className}>
                <CardBody className="p-6">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                            'bg-gradient-to-br from-green-500 to-emerald-500'
                        )}>
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    Everything is FREE!
                                </h3>
                                <Badge size="sm" className="bg-green-100 text-green-700">
                                    Phase 1
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 font-bengali">
                                সব ফিচার বিনামূল্যে ব্যবহার করো!
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <p className="text-sm text-green-700 dark:text-green-400">
                            🎉 During our launch phase, all premium features are available for free.
                            Enjoy unlimited access to mock tests, PDFs, analytics, and more!
                        </p>
                    </div>
                </CardBody>
            </Card>
        );
    }

    // Compact variant for dashboard
    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl', className)}>
                <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center text-xl',
                    `bg-gradient-to-br ${config.gradient}`
                )}>
                    {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white">
                        {plan?.name || 'Free'} Plan
                    </p>
                    {!isFree && isActive && (
                        <p className="text-xs text-gray-500">
                            {daysRemaining} days remaining
                        </p>
                    )}
                </div>
                {isFree ? (
                    <Link href="/pricing">
                        <Button size="sm" leftIcon={<ArrowUpRight className="h-4 w-4" />}>
                            Upgrade
                        </Button>
                    </Link>
                ) : (
                    <Badge size="sm" className="bg-green-100 text-green-700">
                        Active
                    </Badge>
                )}
            </div>
        );
    }

    // Full variant
    return (
        <Card className={className}>
            <CardHeader
                title="Subscription"
                subtitle="সাবস্ক্রিপশন"
                icon={<Crown className="h-5 w-5 text-amber-500" />}
                action={
                    <Button variant="outline" size="sm" onClick={onManage} leftIcon={<Settings className="h-4 w-4" />}>
                        Manage
                    </Button>
                }
            />
            <CardBody className="space-y-6">
                {/* Current Plan */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className={cn(
                        'w-16 h-16 rounded-xl flex items-center justify-center text-3xl',
                        `bg-gradient-to-br ${config.gradient}`
                    )}>
                        {config.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                                {plan?.name || 'Free'} Plan
                            </h3>
                            {isActive && !isFree && (
                                <Badge size="sm" className="bg-green-100 text-green-700">
                                    Active
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{plan?.description}</p>
                    </div>
                    {!isFree && (
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(subscription?.billingCycle === 'yearly' ? (plan?.yearlyPrice || 0) : (plan?.monthlyPrice || 0))}
                            </p>
                            <p className="text-xs text-gray-500">
                                /{subscription?.billingCycle === 'yearly' ? 'year' : 'month'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Subscription Details */}
                {!isFree && subscription && (
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-xs text-gray-500">Start Date</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {formatDate(subscription.startDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Clock className="h-5 w-5 text-amber-500" />
                            <div>
                                <p className="text-xs text-gray-500">Days Remaining</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {daysRemaining} days
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <RefreshCw className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-xs text-gray-500">Auto Renew</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {subscription.autoRenew ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    {isFree ? (
                        <Button
                            className="bg-gradient-to-r from-blue-500 to-indigo-500"
                            onClick={onUpgrade}
                            leftIcon={<ArrowUpRight className="h-4 w-4" />}
                        >
                            Upgrade to Premium
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={onUpgrade}>
                                Change Plan
                            </Button>
                            <Button
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={onCancel}
                                leftIcon={<XCircle className="h-4 w-4" />}
                            >
                                Cancel Subscription
                            </Button>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default SubscriptionStatus;
