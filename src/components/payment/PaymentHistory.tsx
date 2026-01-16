'use client';

import React, { useState } from 'react';
import { Receipt, Download, Eye, Filter, Calendar, CreditCard, ChevronDown } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Modal } from '@/components/ui';
import { Transaction, Invoice, paymentStatusConfig, formatPrice, formatDate } from '@/types/payment';
import { cn } from '@/lib/utils';

interface PaymentHistoryProps {
    transactions?: Transaction[];
    invoices?: Invoice[];
    onViewInvoice?: (invoice: Invoice) => void;
    onDownloadInvoice?: (invoice: Invoice) => void;
    className?: string;
}

// Payment method icons
const methodIcons = {
    card: '💳',
    upi: '📱',
    netbanking: '🏦',
    wallet: '👛',
};

function PaymentHistory({
    transactions = [],
    invoices = [],
    onViewInvoice,
    onDownloadInvoice,
    className
}: PaymentHistoryProps) {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Filter transactions
    const filteredTransactions = transactions.filter(txn =>
        filterStatus === 'all' || txn.status === filterStatus
    );

    // Find invoice for transaction
    const getInvoice = (txnId: string) => invoices.find(inv => inv.transactionId === txnId);

    return (
        <Card className={className}>
            <CardHeader
                title="Payment History"
                subtitle="পেমেন্ট ইতিহাস"
                icon={<Receipt className="h-5 w-5 text-green-500" />}
                action={
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        leftIcon={<Filter className="h-4 w-4" />}
                    >
                        Filter
                        <ChevronDown className={cn('h-4 w-4 ml-1 transition-transform', showFilters && 'rotate-180')} />
                    </Button>
                }
            />
            <CardBody className="p-0">
                {/* Filters */}
                {showFilters && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm text-gray-500">Status:</span>
                            {['all', 'success', 'pending', 'failed', 'refunded'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={cn(
                                        'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                                        filterStatus === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300'
                                    )}
                                >
                                    {status === 'all' ? 'All' : paymentStatusConfig[status as keyof typeof paymentStatusConfig]?.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Transactions */}
                {filteredTransactions.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filteredTransactions.map((txn) => {
                            const status = paymentStatusConfig[txn.status];
                            const invoice = getInvoice(txn.id);

                            return (
                                <div
                                    key={txn.id}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    {/* Method Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
                                        {methodIcons[txn.paymentMethod]}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {txn.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(txn.createdAt)}</span>
                                            <span>•</span>
                                            <span className="capitalize">{txn.paymentMethod}</span>
                                            {txn.razorpayPaymentId && (
                                                <>
                                                    <span>•</span>
                                                    <span className="font-mono text-gray-400">{txn.razorpayPaymentId}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="text-right">
                                        <p className={cn(
                                            'font-bold',
                                            txn.status === 'success' ? 'text-green-600' : 'text-gray-900 dark:text-white'
                                        )}>
                                            {formatPrice(txn.amount)}
                                        </p>
                                        <Badge
                                            size="sm"
                                            style={{ backgroundColor: status.color + '20', color: status.color }}
                                        >
                                            {status.icon} {status.label}
                                        </Badge>
                                    </div>

                                    {/* Actions */}
                                    {txn.status === 'success' && invoice && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onViewInvoice?.(invoice)}
                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                                                title="View Invoice"
                                            >
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => onDownloadInvoice?.(invoice)}
                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                                                title="Download Invoice"
                                            >
                                                <Download className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">কোনো পেমেন্ট নেই</p>
                    </div>
                )}

                {/* Summary */}
                {filteredTransactions.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                                Showing {filteredTransactions.length} transaction(s)
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                Total Paid: {formatPrice(
                                    filteredTransactions
                                        .filter(t => t.status === 'success')
                                        .reduce((sum, t) => sum + t.amount, 0)
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default PaymentHistory;
