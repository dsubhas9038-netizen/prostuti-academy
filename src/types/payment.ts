// Payment Types

// Plan type
export type PlanId = 'free' | 'pro' | 'premium';
export type BillingCycle = 'monthly' | 'yearly';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded' | 'cancelled';
export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

// Plan config
export const planConfig: Record<PlanId, {
    name: string;
    nameBn: string;
    color: string;
    icon: string;
    gradient: string;
}> = {
    free: {
        name: 'Free',
        nameBn: 'ফ্রি',
        color: '#6B7280',
        icon: '🆓',
        gradient: 'from-gray-400 to-gray-500',
    },
    pro: {
        name: 'Pro',
        nameBn: 'প্রো',
        color: '#3B82F6',
        icon: '⭐',
        gradient: 'from-blue-500 to-indigo-500',
    },
    premium: {
        name: 'Premium',
        nameBn: 'প্রিমিয়াম',
        color: '#8B5CF6',
        icon: '👑',
        gradient: 'from-purple-500 to-pink-500',
    },
};

// Status config (renamed to avoid conflict with studyPlanner.ts)
export const paymentStatusConfig: Record<PaymentStatus, {
    label: string;
    labelBn: string;
    color: string;
    icon: string;
}> = {
    pending: { label: 'Pending', labelBn: 'অপেক্ষমান', color: '#F59E0B', icon: '⏳' },
    success: { label: 'Success', labelBn: 'সফল', color: '#22C55E', icon: '✅' },
    failed: { label: 'Failed', labelBn: 'ব্যর্থ', color: '#EF4444', icon: '❌' },
    refunded: { label: 'Refunded', labelBn: 'ফেরত', color: '#6B7280', icon: '🔄' },
    cancelled: { label: 'Cancelled', labelBn: 'বাতিল', color: '#9CA3AF', icon: '🚫' },
};

// Pricing plan
export interface Plan {
    id: PlanId;
    name: string;
    nameBn: string;
    description: string;
    descriptionBn: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: PlanFeature[];
    isPopular?: boolean;
    isCurrent?: boolean;
}

// Plan feature
export interface PlanFeature {
    id: string;
    text: string;
    textBn: string;
    included: boolean;
    highlight?: boolean;
}

// Subscription
export interface Subscription {
    id: string;
    userId: string;
    planId: PlanId;
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    billingCycle: BillingCycle;
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    nextBillingDate?: Date;
    cancelledAt?: Date;
}

// Transaction
export interface Transaction {
    id: string;
    userId: string;
    subscriptionId?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

// Invoice
export interface Invoice {
    id: string;
    transactionId: string;
    invoiceNumber: string;
    userId: string;
    userName: string;
    userEmail: string;
    planName: string;
    amount: number;
    tax: number;
    total: number;
    billingPeriod: {
        start: Date;
        end: Date;
    };
    paidAt: Date;
    downloadUrl?: string;
}

// Payment form data
export interface PaymentFormData {
    planId: PlanId;
    billingCycle: BillingCycle;
    paymentMethod: PaymentMethod;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    upiId?: string;
    bank?: string;
    couponCode?: string;
}

// Helper functions
export function formatPrice(amount: number, currency: string = '₹'): string {
    return `${currency}${amount.toLocaleString('en-IN')}`;
}

export function formatBillingCycle(cycle: BillingCycle): string {
    return cycle === 'monthly' ? '/month' : '/year';
}

export function calculateSavings(monthlyPrice: number, yearlyPrice: number): number {
    const annualMonthly = monthlyPrice * 12;
    return Math.round(((annualMonthly - yearlyPrice) / annualMonthly) * 100);
}

export function getNextBillingDate(startDate: Date, cycle: BillingCycle): Date {
    const next = new Date(startDate);
    if (cycle === 'monthly') {
        next.setMonth(next.getMonth() + 1);
    } else {
        next.setFullYear(next.getFullYear() + 1);
    }
    return next;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export function isSubscriptionActive(subscription: Subscription): boolean {
    return subscription.status === 'active' && new Date() < subscription.endDate;
}
