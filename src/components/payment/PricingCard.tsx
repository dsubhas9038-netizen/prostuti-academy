'use client';

import React from 'react';
import { Check, X, Crown, Star } from 'lucide-react';
import { Card, CardBody, Button, Badge } from '@/components/ui';
import { Plan, planConfig, formatPrice, formatBillingCycle, calculateSavings } from '@/types/payment';
import { cn } from '@/lib/utils';

interface PricingCardProps {
    plan: Plan;
    billingCycle?: 'monthly' | 'yearly';
    onSelect?: (planId: string) => void;
    isSelected?: boolean;
    className?: string;
}

function PricingCard({
    plan,
    billingCycle = 'monthly',
    onSelect,
    isSelected,
    className
}: PricingCardProps) {
    const config = planConfig[plan.id];
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);

    return (
        <Card
            className={cn(
                'relative overflow-hidden transition-all duration-300',
                plan.isPopular && 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20',
                plan.isCurrent && 'ring-2 ring-green-500',
                isSelected && 'ring-2 ring-purple-500 scale-[1.02]',
                className
            )}
        >
            {/* Popular badge */}
            {plan.isPopular && (
                <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Most Popular
                    </div>
                </div>
            )}

            {/* Current badge */}
            {plan.isCurrent && (
                <div className="absolute top-0 left-0">
                    <div className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-br-xl">
                        Current Plan
                    </div>
                </div>
            )}

            <CardBody className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <div
                        className={cn(
                            'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4',
                            `bg-gradient-to-br ${config.gradient}`
                        )}
                    >
                        {config.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-bengali">{plan.nameBn}</p>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                    {price === 0 ? (
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                            Free
                        </div>
                    ) : (
                        <>
                            <div className="flex items-end justify-center gap-1">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(price)}
                                </span>
                                <span className="text-gray-500 mb-1">
                                    {formatBillingCycle(billingCycle)}
                                </span>
                            </div>
                            {billingCycle === 'yearly' && savings > 0 && (
                                <Badge size="sm" className="bg-green-100 text-green-700 mt-2">
                                    Save {savings}%
                                </Badge>
                            )}
                        </>
                    )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                        <li
                            key={feature.id}
                            className={cn(
                                'flex items-start gap-3',
                                !feature.included && 'opacity-50'
                            )}
                        >
                            {feature.included ? (
                                <div className={cn(
                                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                                    feature.highlight
                                        ? 'bg-green-500 text-white'
                                        : 'bg-green-100 text-green-600'
                                )}>
                                    <Check className="h-3 w-3" />
                                </div>
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                    <X className="h-3 w-3 text-gray-400" />
                                </div>
                            )}
                            <span className={cn(
                                'text-sm',
                                feature.included
                                    ? 'text-gray-700 dark:text-gray-300'
                                    : 'text-gray-400 line-through'
                            )}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button
                    variant={plan.isPopular ? 'primary' : plan.isCurrent ? 'outline' : 'primary'}
                    className={cn(
                        'w-full',
                        plan.isPopular && 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
                        plan.id === 'premium' && 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    )}
                    onClick={() => onSelect?.(plan.id)}
                    disabled={plan.isCurrent}
                    leftIcon={plan.id === 'premium' ? <Crown className="h-4 w-4" /> : undefined}
                >
                    {plan.isCurrent ? 'Current Plan' : plan.monthlyPrice === 0 ? 'Get Started' : 'Choose Plan'}
                </Button>
            </CardBody>
        </Card>
    );
}

export default PricingCard;
