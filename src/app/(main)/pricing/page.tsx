'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Sparkles, Check, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PlanSelector } from '@/components/payment';
import { Button, Badge } from '@/components/ui';
import { isPhase1 } from '@/data/samplePaymentData';
import { cn } from '@/lib/utils';

// FAQ data
const faqs = [
    {
        question: 'Is everything really free right now?',
        questionBn: 'সত্যিই কি সব কিছু বিনামূল্যে?',
        answer: 'Yes! During our launch phase (Phase 1), all features including mock tests, PDFs, analytics, and study planner are completely free for everyone.',
        answerBn: 'হ্যাঁ! আমাদের লঞ্চ ফেজে সব ফিচার বিনামূল্যে।',
    },
    {
        question: 'When will paid plans be introduced?',
        questionBn: 'পেইড প্ল্যান কখন আসবে?',
        answer: 'We plan to introduce premium plans after 6 months of launch. We will notify all users before any changes.',
        answerBn: 'লঞ্চের ৬ মাস পর প্রিমিয়াম প্ল্যান আসবে।',
    },
    {
        question: 'What payment methods do you accept?',
        questionBn: 'কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?',
        answer: 'In future, we will accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Wallets via Razorpay.',
        answerBn: 'ভবিষ্যতে UPI, কার্ড, নেট ব্যাঙ্কিং, ওয়ালেট চালু হবে।',
    },
    {
        question: 'Can I get a refund?',
        questionBn: 'রিফান্ড পাওয়া যাবে?',
        answer: 'Yes, we offer a 7-day money-back guarantee on all paid plans. No questions asked.',
        answerBn: 'হ্যাঁ, ৭ দিনের মধ্যে রিফান্ড নিতে পারবে।',
    },
];

export default function PricingPage() {
    const router = useRouter();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    const handlePlanSelect = (planId: string, billingCycle: 'monthly' | 'yearly') => {
        if (planId === 'free') return;
        router.push(`/checkout?plan=${planId}&cycle=${billingCycle}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
                    {isPhase1() && (
                        <Badge size="lg" className="bg-white/20 text-white mb-6 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Phase 1: Everything is FREE!
                        </Badge>
                    )}

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-purple-200 mb-2 font-bengali">
                        সহজ এবং স্বচ্ছ মূল্য
                    </p>
                    <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                        Choose the plan that works best for you. Upgrade or downgrade anytime.
                    </p>
                </div>
            </div>

            {/* Phase 1 Banner */}
            {isPhase1() && (
                <div className="max-w-4xl mx-auto px-4 -mt-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-xl text-center">
                        <h2 className="text-2xl font-bold mb-2">
                            🎉 Launch Celebration - Everything FREE!
                        </h2>
                        <p className="text-green-100 font-bengali">
                            লঞ্চ উদযাপনে সব ফিচার বিনামূল্যে! মক টেস্ট, PDF, Analytics - সব কিছু!
                        </p>
                    </div>
                </div>
            )}

            {/* Pricing Plans */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <PlanSelector
                    onSelect={handlePlanSelect}
                    currentPlanId="free"
                />
            </div>

            {/* Features Comparison */}
            <div className="max-w-5xl mx-auto px-4 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        What's Included
                    </h2>
                    <p className="text-gray-500 font-bengali">অন্তর্ভুক্ত বৈশিষ্ট্যসমূহ</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Unlimited Questions', titleBn: 'সীমাহীন প্রশ্ন', free: true },
                        { title: 'All Subjects', titleBn: 'সব বিষয়', free: true },
                        { title: 'PYQ Access', titleBn: 'বিগত প্রশ্ন', free: true },
                        { title: 'Mock Tests', titleBn: 'মক টেস্ট', free: true },
                        { title: 'Performance Analytics', titleBn: 'পারফরম্যান্স', free: true },
                        { title: 'Study Planner', titleBn: 'পড়ার পরিকল্পনা', free: true },
                        { title: 'PDF Downloads', titleBn: 'PDF ডাউনলোড', free: true },
                        { title: 'Leaderboard', titleBn: 'লিডারবোর্ড', free: true },
                        { title: 'Community Support', titleBn: 'কমিউনিটি', free: true },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"
                        >
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{feature.title}</p>
                                <p className="text-sm text-gray-500 font-bengali">{feature.titleBn}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto px-4 pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 font-bengali">সচরাচর জিজ্ঞাসিত প্রশ্ন</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {faq.question}
                                    </p>
                                    <p className="text-sm text-gray-500 font-bengali">{faq.questionBn}</p>
                                </div>
                                {expandedFaq === index ? (
                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                            {expandedFaq === index && (
                                <div className="px-5 pb-5 pt-0">
                                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                    <p className="text-sm text-gray-500 font-bengali mt-1">{faq.answerBn}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Support */}
            <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-blue-100 mb-4 font-bengali">আরও প্রশ্ন আছে?</p>
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
}
