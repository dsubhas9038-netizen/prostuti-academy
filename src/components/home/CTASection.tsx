'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Users, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

function CTASection() {
    const { isAuthenticated } = useAuth();

    const benefits = [
        { icon: BookOpen, text: '10,000+ Exam Questions' },
        { icon: Users, text: '50,000+ Active Students' },
        { icon: Award, text: '100% Free Forever' },
    ];

    return (
        <section className="py-16 lg:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Join 50,000+ Students</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
                        আজই শুরু করো তোমার
                        <br />
                        <span className="text-yellow-300">সাফল্যের যাত্রা!</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        সম্পূর্ণ ফ্রি-তে পাও exam-oriented questions, mock tests,
                        এবং previous year analysis। কোনো hidden charge নেই!
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-white/90"
                            >
                                <benefit.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{benefit.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {isAuthenticated ? (
                            <Link href="/subjects">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-white/90"
                                    rightIcon={<ArrowRight className="h-5 w-5" />}
                                >
                                    Continue Learning
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/signup">
                                    <Button
                                        size="lg"
                                        className="bg-white text-blue-600 hover:bg-white/90"
                                        rightIcon={<ArrowRight className="h-5 w-5" />}
                                    >
                                        ফ্রি Account খোলো
                                    </Button>
                                </Link>
                                <Link href="/subjects">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white/10"
                                    >
                                        আগে ঘুরে দেখো
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Trust text */}
                    <p className="text-sm text-white/60 mt-6">
                        ✓ No credit card required &nbsp;&nbsp; ✓ Free forever &nbsp;&nbsp; ✓ Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
