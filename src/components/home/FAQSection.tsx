'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
    question: string;
    questionBn: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'Is ProstutiAcademy free?',
        questionBn: 'ProstutiAcademy কি ফ্রি?',
        answer: 'হ্যাঁ! ProstutiAcademy সম্পূর্ণ ফ্রি। সব questions, mock tests, এবং resources বিনামূল্যে ব্যবহার করা যায়। কোনো hidden charge নেই।',
    },
    {
        question: 'Which subjects are available?',
        questionBn: 'কোন কোন subject আছে?',
        answer: 'বর্তমানে আমরা HS Arts এর সব subjects cover করছি - Bengali, English, History, Geography, Philosophy, Political Science, Education, এবং Sanskrit। Commerce এবং Science শীঘ্রই আসছে!',
    },
    {
        question: 'How are questions organized?',
        questionBn: 'Questions কীভাবে সাজানো আছে?',
        answer: 'সব questions semester-wise এবং chapter-wise সাজানো আছে। প্রতিটা question এর marks, word count, এবং importance level দেওয়া আছে।',
    },
    {
        question: 'Can I use it on mobile?',
        questionBn: 'Mobile এ use করা যাবে?',
        answer: 'অবশ্যই! আমাদের website সম্পূর্ণ mobile-friendly। যেকোনো device থেকে comfortable ভাবে পড়াশোনা করতে পারবে।',
    },
    {
        question: 'How often is content updated?',
        questionBn: 'Content কত frequently update হয়?',
        answer: 'আমরা নিয়মিত নতুন questions এবং mock tests add করি। Previous year questions প্রতি বছর exam এর পর update করা হয়।',
    },
    {
        question: 'Do I need to create an account?',
        questionBn: 'Account তৈরি করতে হবে?',
        answer: 'Account ছাড়াও অনেক content দেখা যায়। তবে progress tracking, bookmarks, এবং mock tests এর জন্য free account তৈরি করতে হবে।',
    },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4">
                        <HelpCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">FAQ</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        সাধারণ জিজ্ঞাসা
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        তোমার মনে যে প্রশ্ন আসতে পারে
                    </p>
                </div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-4 lg:p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{faq.question}</p>
                                    <p className="text-sm text-gray-500 font-bengali">
                                        {faq.questionBn}
                                    </p>
                                </div>
                                <ChevronDown
                                    className={cn(
                                        'h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4',
                                        openIndex === index && 'rotate-180'
                                    )}
                                />
                            </button>

                            <div
                                className={cn(
                                    'overflow-hidden transition-all duration-300',
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                )}
                            >
                                <div className="p-4 lg:p-5 pt-0 text-gray-600 dark:text-gray-400 font-bengali">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
