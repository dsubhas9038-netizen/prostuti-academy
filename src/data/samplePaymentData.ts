import {
    Plan,
    PlanFeature,
    Subscription,
    Transaction,
    Invoice,
} from '@/types/payment';

// ============================================
// 💰 MONETIZATION STRATEGY
// ============================================
// PHASE 1 (Launch): 100% FREE - All features
// PHASE 2 (6 months): Freemium - ₹99/month premium
// PHASE 3 (12 months): Expansion - Packages & tie-ups
// ============================================

// Current Phase: PHASE 1 (100% FREE)
export const currentMonetizationPhase = 1;

// Plans - Updated for 3-Phase Strategy
export const plans: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        nameBn: 'ফ্রি',
        description: 'Phase 1: Everything is FREE!',
        descriptionBn: 'ফেজ ১: সব কিছু বিনামূল্যে!',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            { id: 'f1', text: 'Unlimited questions', textBn: 'সীমাহীন প্রশ্ন', included: true, highlight: true },
            { id: 'f2', text: 'All subjects access', textBn: 'সব বিষয়ে অ্যাক্সেস', included: true },
            { id: 'f3', text: 'Full PYQ access', textBn: 'সম্পূর্ণ বিগত প্রশ্ন', included: true },
            { id: 'f4', text: 'Unlimited mock tests', textBn: 'সীমাহীন মক টেস্ট', included: true, highlight: true },
            { id: 'f5', text: 'Performance analytics', textBn: 'পারফরম্যান্স বিশ্লেষণ', included: true },
            { id: 'f6', text: 'PDF downloads', textBn: 'PDF ডাউনলোড', included: true },
            { id: 'f7', text: 'Study planner', textBn: 'পড়ার পরিকল্পনা', included: true },
        ],
        isCurrent: true,
    },
    // PHASE 2 Plans (Freemium - After 6 months)
    {
        id: 'premium',
        name: 'Premium',
        nameBn: 'প্রিমিয়াম',
        description: 'Coming in Phase 2',
        descriptionBn: 'ফেজ ২-তে আসছে',
        monthlyPrice: 99,
        yearlyPrice: 999,
        features: [
            { id: 'f1', text: 'All mock tests', textBn: 'সব মক টেস্ট', included: true, highlight: true },
            { id: 'f2', text: 'Detailed analytics', textBn: 'বিস্তারিত বিশ্লেষণ', included: true },
            { id: 'f3', text: 'Ad-free experience', textBn: 'বিজ্ঞাপন মুক্ত', included: true },
            { id: 'f4', text: 'Download PDFs', textBn: 'PDF ডাউনলোড', included: true },
            { id: 'f5', text: 'Priority support', textBn: 'প্রায়োরিটি সাপোর্ট', included: true },
            { id: 'f6', text: 'Exclusive resources', textBn: 'এক্সক্লুসিভ রিসোর্স', included: true },
            { id: 'f7', text: 'Early access', textBn: 'আগাম অ্যাক্সেস', included: true },
        ],
        isPopular: true,
    },
];

// PHASE 3 Packages (After 12 months)
export const expansionPackages = [
    {
        id: 'test-series-single',
        name: 'Single Subject Test Series',
        nameBn: 'একক বিষয় টেস্ট সিরিজ',
        price: 199,
        subjects: 1,
        tests: 20,
    },
    {
        id: 'test-series-all',
        name: 'All Subject Test Series',
        nameBn: 'সব বিষয় টেস্ট সিরিজ',
        price: 499,
        subjects: 'all',
        tests: 100,
    },
    {
        id: 'live-doubt',
        name: 'Live Doubt Solving',
        nameBn: 'লাইভ সন্দেহ দূরীকরণ',
        price: 299,
        sessionsPerMonth: 4,
    },
];

// Sample subscription (Currently everyone is on Free)
export const sampleSubscription: Subscription = {
    id: 'sub_001',
    userId: 'user_001',
    planId: 'free', // Phase 1: Everyone is free
    status: 'active',
    billingCycle: 'monthly',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2099-12-31'), // Free forever in Phase 1
    autoRenew: false,
};

// Sample transactions (Empty in Phase 1)
export const sampleTransactions: Transaction[] = [];

// Sample invoices (Empty in Phase 1)
export const sampleInvoices: Invoice[] = [];

// Getters
export function getPlanById(id: string): Plan | undefined {
    return plans.find(p => p.id === id);
}

export function getCurrentSubscription(): Subscription {
    return sampleSubscription;
}

export function getTransactionHistory(): Transaction[] {
    return sampleTransactions;
}

export function getInvoices(): Invoice[] {
    return sampleInvoices;
}

// Phase checker
export function isPhase1(): boolean {
    return currentMonetizationPhase === 1;
}

export function isPhase2(): boolean {
    return currentMonetizationPhase >= 2;
}

export function isPhase3(): boolean {
    return currentMonetizationPhase >= 3;
}

// Feature access (Phase 1: All free)
export function hasFeatureAccess(feature: string, planId: string = 'free'): boolean {
    // Phase 1: Everyone has access to everything
    if (isPhase1()) return true;

    // Phase 2+: Check subscription
    const plan = getPlanById(planId);
    if (!plan) return false;

    const planFeature = plan.features.find(f => f.id === feature);
    return planFeature?.included || false;
}

// Coupon codes (For Phase 2+)
export const coupons = [
    { code: 'WELCOME20', discount: 20, type: 'percent' as const, validUntil: new Date('2027-03-31') },
    { code: 'YEARLY50', discount: 50, type: 'flat' as const, validUntil: new Date('2027-02-28'), appliesTo: 'yearly' as const },
    { code: 'STUDENT10', discount: 10, type: 'percent' as const, validUntil: new Date('2027-12-31') },
];

export function validateCoupon(code: string, billingCycle: 'monthly' | 'yearly'): { valid: boolean; discount?: number; type?: string } {
    // Phase 1: No payments, no coupons needed
    if (isPhase1()) return { valid: false };

    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) return { valid: false };
    if (new Date() > coupon.validUntil) return { valid: false };
    if (coupon.appliesTo && coupon.appliesTo !== billingCycle) return { valid: false };
    return { valid: true, discount: coupon.discount, type: coupon.type };
}
