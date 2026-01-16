'use client';

import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Wallet, Lock, Tag, Check, AlertCircle } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { Plan, PaymentMethod, BillingCycle, planConfig, formatPrice, calculateSavings } from '@/types/payment';
import { validateCoupon } from '@/data/samplePaymentData';
import { cn } from '@/lib/utils';

interface PaymentFormProps {
    plan: Plan;
    billingCycle: BillingCycle;
    onSubmit?: (data: PaymentFormData) => void;
    onBack?: () => void;
    className?: string;
}

interface PaymentFormData {
    paymentMethod: PaymentMethod;
    couponCode?: string;
}

// Payment method config
const paymentMethods = [
    { id: 'upi' as PaymentMethod, name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card' as PaymentMethod, name: 'Card', icon: CreditCard, description: 'Credit/Debit Card' },
    { id: 'netbanking' as PaymentMethod, name: 'Net Banking', icon: Building, description: 'All Major Banks' },
    { id: 'wallet' as PaymentMethod, name: 'Wallet', icon: Wallet, description: 'Paytm, Amazon Pay' },
];

function PaymentForm({
    plan,
    billingCycle,
    onSubmit,
    onBack,
    className
}: PaymentFormProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState<{ valid: boolean; discount?: number; type?: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const config = planConfig[plan.id];
    const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);

    // Calculate final price
    let discount = 0;
    if (couponApplied?.valid) {
        discount = couponApplied.type === 'percent'
            ? (basePrice * (couponApplied.discount || 0)) / 100
            : (couponApplied.discount || 0);
    }
    const tax = Math.round((basePrice - discount) * 0.18); // 18% GST
    const totalPrice = basePrice - discount + tax;

    // Apply coupon
    const handleApplyCoupon = () => {
        const result = validateCoupon(couponCode, billingCycle);
        setCouponApplied(result);
    };

    // Submit payment
    const handleSubmit = async () => {
        setLoading(true);

        // Simulate Razorpay integration
        await new Promise(resolve => setTimeout(resolve, 1500));

        onSubmit?.({
            paymentMethod: selectedMethod,
            couponCode: couponApplied?.valid ? couponCode : undefined,
        });

        setLoading(false);
    };

    return (
        <div className={cn('grid lg:grid-cols-3 gap-6', className)}>
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader
                        title="Payment Method"
                        subtitle="পেমেন্ট পদ্ধতি"
                        icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                    />
                    <CardBody>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                const isSelected = selectedMethod === method.id;

                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={cn(
                                            'flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                        )}
                                    >
                                        <div className={cn(
                                            'w-12 h-12 rounded-xl flex items-center justify-center',
                                            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                                        )}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                                            <p className="text-xs text-gray-500">{method.description}</p>
                                        </div>
                                        {isSelected && (
                                            <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>

                {/* Coupon Code */}
                <Card>
                    <CardHeader
                        title="Have a Coupon?"
                        subtitle="কুপন কোড"
                        icon={<Tag className="h-5 w-5 text-green-500" />}
                    />
                    <CardBody>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter coupon code"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 uppercase"
                            />
                            <Button
                                variant="outline"
                                onClick={handleApplyCoupon}
                                disabled={!couponCode}
                            >
                                Apply
                            </Button>
                        </div>

                        {couponApplied && (
                            <div className={cn(
                                'mt-3 flex items-center gap-2 text-sm',
                                couponApplied.valid ? 'text-green-600' : 'text-red-600'
                            )}>
                                {couponApplied.valid ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        <span>Coupon applied! {couponApplied.type === 'percent' ? `${couponApplied.discount}% off` : `₹${couponApplied.discount} off`}</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Invalid or expired coupon code</span>
                                    </>
                                )}
                            </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                            Try: WELCOME20 (20% off) or YEARLY50 (₹50 off yearly plans)
                        </p>
                    </CardBody>
                </Card>
            </div>

            {/* Order Summary */}
            <div>
                <Card className="sticky top-4">
                    <CardHeader
                        title="Order Summary"
                        subtitle="অর্ডার সারাংশ"
                    />
                    <CardBody className="space-y-4">
                        {/* Plan */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div
                                className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-xl', `bg-gradient-to-br ${config.gradient}`)}
                            >
                                {config.icon}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{plan.name} Plan</p>
                                <p className="text-xs text-gray-500">{billingCycle === 'monthly' ? 'Monthly' : 'Yearly'} billing</p>
                            </div>
                        </div>

                        {/* Price breakdown */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Base Price</span>
                                <span className="text-gray-900 dark:text-white">{formatPrice(basePrice)}</span>
                            </div>

                            {billingCycle === 'yearly' && savings > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Yearly Savings</span>
                                    <span>-{savings}%</span>
                                </div>
                            )}

                            {couponApplied?.valid && (
                                <div className="flex justify-between text-green-600">
                                    <span>Coupon Discount</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-500">GST (18%)</span>
                                <span className="text-gray-900 dark:text-white">{formatPrice(tax)}</span>
                            </div>

                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-lg text-blue-600">{formatPrice(totalPrice)}</span>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            onClick={handleSubmit}
                            isLoading={loading}
                            leftIcon={<Lock className="h-4 w-4" />}
                        >
                            Pay {formatPrice(totalPrice)}
                        </Button>

                        {/* Trust */}
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Lock className="h-3 w-3" />
                            <span>Secure payment via Razorpay</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default PaymentForm;
