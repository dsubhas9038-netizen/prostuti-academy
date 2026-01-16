import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Plan,
    Subscription,
    Transaction,
    Invoice,
    BillingCycle,
    PaymentMethod,
    PaymentStatus,
    isSubscriptionActive,
} from '@/types/payment';
import {
    plans,
    getCurrentSubscription,
    getTransactionHistory,
    getInvoices,
    getPlanById,
    validateCoupon,
} from '@/data/samplePaymentData';

interface UsePaymentOptions {
    autoRefresh?: boolean;
}

interface UsePaymentReturn {
    // Data
    plans: Plan[];
    currentPlan: Plan | undefined;
    subscription: Subscription | null;
    transactions: Transaction[];
    invoices: Invoice[];

    // State
    loading: boolean;
    error: string | null;
    processing: boolean;

    // Selected
    selectedPlan: Plan | null;
    billingCycle: BillingCycle;

    // Actions
    selectPlan: (planId: string) => void;
    setBillingCycle: (cycle: BillingCycle) => void;
    processPayment: (method: PaymentMethod, couponCode?: string) => Promise<PaymentResult>;
    cancelSubscription: () => Promise<boolean>;
    refresh: () => void;

    // Computed
    isSubscribed: boolean;
    daysRemaining: number;
}

interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

export function usePayment(options: UsePaymentOptions = {}): UsePaymentReturn {
    // State
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            setSubscription(getCurrentSubscription());
            setTransactions(getTransactionHistory());
            setInvoices(getInvoices());
        } catch (err) {
            setError('Failed to load payment data');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Current plan
    const currentPlan = useMemo(() => {
        if (!subscription) return plans.find(p => p.id === 'free');
        return getPlanById(subscription.planId);
    }, [subscription]);

    // Select plan
    const selectPlan = useCallback((planId: string) => {
        const plan = getPlanById(planId);
        setSelectedPlan(plan || null);
    }, []);

    // Process payment
    const processPayment = useCallback(async (
        method: PaymentMethod,
        couponCode?: string
    ): Promise<PaymentResult> => {
        if (!selectedPlan) {
            return { success: false, error: 'No plan selected' };
        }

        setProcessing(true);

        try {
            // Simulate Razorpay payment
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create transaction
            const newTransaction: Transaction = {
                id: `txn_${Date.now()}`,
                userId: 'user_001',
                amount: billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice,
                currency: 'INR',
                status: 'success',
                paymentMethod: method,
                razorpayPaymentId: `pay_${Date.now()}`,
                description: `${selectedPlan.name} Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            setTransactions(prev => [newTransaction, ...prev]);

            // Update subscription
            const newSubscription: Subscription = {
                id: `sub_${Date.now()}`,
                userId: 'user_001',
                planId: selectedPlan.id,
                status: 'active',
                billingCycle,
                startDate: new Date(),
                endDate: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000),
                autoRenew: true,
            };

            setSubscription(newSubscription);
            setSelectedPlan(null);

            return { success: true, transactionId: newTransaction.id };
        } catch (err) {
            return { success: false, error: 'Payment failed' };
        } finally {
            setProcessing(false);
        }
    }, [selectedPlan, billingCycle]);

    // Cancel subscription
    const cancelSubscription = useCallback(async (): Promise<boolean> => {
        if (!subscription) return false;

        setProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubscription({
                ...subscription,
                status: 'cancelled',
                cancelledAt: new Date(),
                autoRenew: false,
            });

            return true;
        } catch (err) {
            return false;
        } finally {
            setProcessing(false);
        }
    }, [subscription]);

    // Computed values
    const isSubscribed = subscription ? isSubscriptionActive(subscription) && subscription.planId !== 'free' : false;

    const daysRemaining = useMemo(() => {
        if (!subscription) return 0;
        const diff = subscription.endDate.getTime() - Date.now();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, [subscription]);

    return {
        // Data
        plans,
        currentPlan,
        subscription,
        transactions,
        invoices,

        // State
        loading,
        error,
        processing,

        // Selected
        selectedPlan,
        billingCycle,

        // Actions
        selectPlan,
        setBillingCycle,
        processPayment,
        cancelSubscription,
        refresh: fetchData,

        // Computed
        isSubscribed,
        daysRemaining,
    };
}

export default usePayment;

// Compact hook for subscription status
export function useSubscriptionStatus() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 200));
            setSubscription(getCurrentSubscription());
            setLoading(false);
        };
        fetch();
    }, []);

    const currentPlan = subscription ? getPlanById(subscription.planId) : plans.find(p => p.id === 'free');
    const isActive = subscription ? isSubscriptionActive(subscription) : false;

    return { subscription, currentPlan, isActive, loading };
}
