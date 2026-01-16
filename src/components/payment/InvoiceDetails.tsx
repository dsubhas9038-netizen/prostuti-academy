'use client';

import React, { useRef } from 'react';
import { FileText, Download, Printer, Calendar, Building, User, Mail } from 'lucide-react';
import { Card, CardBody, Button, Badge, Modal } from '@/components/ui';
import { Invoice, formatPrice, formatDate } from '@/types/payment';
import { cn } from '@/lib/utils';

interface InvoiceDetailsProps {
    invoice: Invoice;
    isOpen: boolean;
    onClose: () => void;
    onDownload?: () => void;
    onPrint?: () => void;
}

function InvoiceDetails({
    invoice,
    isOpen,
    onClose,
    onDownload,
    onPrint
}: InvoiceDetailsProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (printRef.current) {
            const printContent = printRef.current.innerHTML;
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
          <html>
            <head>
              <title>Invoice ${invoice.invoiceNumber}</title>
              <style>
                body { font-family: system-ui, sans-serif; padding: 40px; }
                .header { text-align: center; margin-bottom: 40px; }
                .logo { font-size: 24px; font-weight: bold; color: #3B82F6; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
                .total { font-size: 18px; font-weight: bold; }
              </style>
            </head>
            <body>${printContent}</body>
          </html>
        `);
                printWindow.document.close();
                printWindow.print();
            }
        }
        onPrint?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details" size="lg">
            <div ref={printRef}>
                {/* Invoice Header */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">ProstutiAcademy</h1>
                        <p className="text-sm text-gray-500">Education Platform</p>
                    </div>
                    <div className="text-right">
                        <Badge size="lg" className="bg-green-100 text-green-700 mb-2">
                            PAID
                        </Badge>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {invoice.invoiceNumber}
                        </p>
                    </div>
                </div>

                {/* Bill To / Invoice Info */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Bill To</h3>
                        <div className="space-y-1">
                            <p className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <User className="h-4 w-4 text-gray-400" />
                                {invoice.userName}
                            </p>
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Mail className="h-4 w-4 text-gray-400" />
                                {invoice.userEmail}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Invoice Details</h3>
                        <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-500">Date:</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(invoice.paidAt)}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-500">Period:</span>
                                <span className="text-gray-900 dark:text-white">
                                    {formatDate(invoice.billingPeriod.start)} - {formatDate(invoice.billingPeriod.end)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="mb-8">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="py-3 text-left text-sm font-medium text-gray-500">Description</th>
                                <th className="py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-4">
                                    <p className="font-medium text-gray-900 dark:text-white">{invoice.planName}</p>
                                    <p className="text-sm text-gray-500">
                                        Subscription ({formatDate(invoice.billingPeriod.start)} - {formatDate(invoice.billingPeriod.end)})
                                    </p>
                                </td>
                                <td className="py-4 text-right text-gray-900 dark:text-white">
                                    {formatPrice(invoice.amount)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-3 text-gray-500">GST (18%)</td>
                                <td className="py-3 text-right text-gray-900 dark:text-white">
                                    {formatPrice(invoice.tax)}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-4 font-bold text-gray-900 dark:text-white">Total</td>
                                <td className="py-4 text-right text-xl font-bold text-blue-600">
                                    {formatPrice(invoice.total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p>Thank you for your subscription!</p>
                    <p className="font-bengali mt-1">তোমার সাবস্ক্রিপশনের জন্য ধন্যবাদ!</p>
                    <p className="mt-2">Questions? Contact support@prostutiacademy.com</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={handlePrint} leftIcon={<Printer className="h-4 w-4" />}>
                    Print
                </Button>
                <Button onClick={onDownload} leftIcon={<Download className="h-4 w-4" />}>
                    Download PDF
                </Button>
            </div>
        </Modal>
    );
}

export default InvoiceDetails;
