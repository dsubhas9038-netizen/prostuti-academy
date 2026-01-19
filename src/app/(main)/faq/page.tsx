import React from 'react';
import { MainLayout } from '@/components/layout';
import { FAQSection } from '@/components/home';

export const metadata = {
    title: 'FAQs - Prostuti Academy',
    description: 'Common questions about Prostuti Academy.',
};

export default function FAQPage() {
    return (
        <MainLayout>
            <div className="pt-20 pb-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h1>
                    <FAQSection />
                </div>
            </div>
        </MainLayout>
    );
}
