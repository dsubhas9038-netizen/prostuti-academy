'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft, AlertTriangle, CreditCard } from 'lucide-react';
import { Card, CardBody, Button, Badge } from '@/components/ui';
import { Transaction, formatPrice, formatDate } from '@/types/payment';
import { cn } from '@/lib/utils';

interface PaymentFailedProps {
    transaction?: Transaction;
    errorMessage?: string;
    onRetry?: () => void;
    className?: string;
}

// Common error messages
const errorMessages: Record<string, { title: string; titleBn: string; description: string }> = {
    'card_declined': {
        title: 'Card Declined',
        titleBn: 'কার্ড প্রত্যাখ্যাত',
        description: 'Your card was declined. Please try a different payment method.',
    },
    'insufficient_funds': {
        title: 'Insufficient Funds',
        titleBn: 'অপর্যাপ্ত ব্যালেন্স',
        description: 'Your account has insufficient funds. Please try another card.',
    },
    'network_error': {
        title: 'Network Error',
        titleBn: 'নেটওয়ার্ক সমস্যা',
        description: 'Connection failed. Please check your internet and try again.',
    },
    'timeout': {
        title: 'Request Timeout',
        titleBn: 'সময়সীমা অতিক্রান্ত',
        description: 'The request took too long. Please try again.',
    },
    'default': {
        title: 'Payment Failed',
        titleBn: 'পেমেন্ট ব্যর্থ',
        description: 'Something went wrong with your payment. Please try again.',
    },
};

function PaymentFailed({
    transaction,
    errorMessage = 'default',
    onRetry,
    className
}: PaymentFailedProps) {
    const error = errorMessages[errorMessage] || errorMessages.default;

    return (
        <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
            <Card className="max-w-lg w-full overflow-hidden">
                {/* Error Header */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white p-8 text-center">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                        <XCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{error.title}</h1>
                    <p className="text-red-100 font-bengali">{error.titleBn}</p>
                </div>

                <CardBody className="p-6 space-y-6">
                    {/* Error Message */}
                    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-700 dark:text-red-400">{error.description}</p>
                        </div>
                    </div>

                    {/* Transaction Details (if available) */}
                    {transaction && (
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{transaction.id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Amount</span>
                                <span className="text-gray-900 dark:text-white">{formatPrice(transaction.amount)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500">Date</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(transaction.createdAt)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-500">Status</span>
                                <Badge size="sm" className="bg-red-100 text-red-700">
                                    ❌ Failed
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* What to do next */}
                    <div className="space-y-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">What you can do:</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-gray-400" />
                                Try a different payment method
                            </li>
                            <li className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-gray-400" />
                                Check your bank account and retry
                            </li>
                            <li className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-gray-400" />
                                Contact support if issue persists
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            onClick={onRetry}
                            leftIcon={<RefreshCw className="h-4 w-4" />}
                        >
                            Try Again
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/pricing">
                                <Button variant="outline" className="w-full" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                                    Back to Plans
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="w-full"
                                leftIcon={<MessageCircle className="h-4 w-4" />}
                            >
                                Contact Support
                            </Button>
                        </div>
                    </div>

                    {/* Support info */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 text-sm">
                            Need help? Email us at support@prostutiacademy.com
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default PaymentFailed;
