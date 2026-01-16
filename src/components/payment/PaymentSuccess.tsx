'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, ArrowRight, Sparkles, Home, BookOpen } from 'lucide-react';
import { Card, CardBody, Button, Badge } from '@/components/ui';
import { Plan, Transaction, formatPrice, formatDate, planConfig } from '@/types/payment';
import { cn } from '@/lib/utils';

interface PaymentSuccessProps {
    transaction?: Transaction;
    plan?: Plan;
    onDownloadInvoice?: () => void;
    className?: string;
}

function PaymentSuccess({
    transaction,
    plan,
    onDownloadInvoice,
    className
}: PaymentSuccessProps) {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const config = plan ? planConfig[plan.id] : null;

    return (
        <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
            <Card className="max-w-lg w-full overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 text-center relative">
                    {/* Confetti animation */}
                    {showConfetti && (
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute animate-bounce"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        animationDuration: `${1 + Math.random()}s`,
                                    }}
                                >
                                    <Sparkles className="h-4 w-4 text-yellow-300" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                        <p className="text-green-100 font-bengali">পেমেন্ট সফল হয়েছে!</p>
                    </div>
                </div>

                <CardBody className="p-6 space-y-6">
                    {/* Plan Info */}
                    {plan && config && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className={cn(
                                'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                                `bg-gradient-to-br ${config.gradient}`
                            )}>
                                {config.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900 dark:text-white text-lg">
                                    {plan.name} Plan
                                </p>
                                <p className="text-sm text-gray-500">{plan.description}</p>
                            </div>
                            <Badge size="lg" className="bg-green-100 text-green-700">
                                Active
                            </Badge>
                        </div>
                    )}

                    {/* Transaction Details */}
                    {transaction && (
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{transaction.id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Amount Paid</span>
                                <span className="font-bold text-green-600">{formatPrice(transaction.amount)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Date</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(transaction.createdAt)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-500">Payment Method</span>
                                <span className="capitalize text-gray-900 dark:text-white">{transaction.paymentMethod}</span>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={onDownloadInvoice}
                            leftIcon={<Download className="h-4 w-4" />}
                        >
                            Download Invoice
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full" leftIcon={<Home className="h-4 w-4" />}>
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/subjects">
                                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500" leftIcon={<BookOpen className="h-4 w-4" />}>
                                    Start Learning
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Thank you message */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 text-sm">
                            Thank you for subscribing to ProstutiAcademy!
                        </p>
                        <p className="text-gray-400 text-xs mt-1 font-bengali">
                            তোমার সাবস্ক্রিপশনের জন্য ধন্যবাদ!
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default PaymentSuccess;
