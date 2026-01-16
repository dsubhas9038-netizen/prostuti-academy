'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui';

const testimonials = [
    {
        id: 1,
        name: 'রাহুল মণ্ডল',
        nameEn: 'Rahul Mondal',
        role: 'HS 2nd Year, Arts',
        image: null,
        rating: 5,
        text: 'ProstutiAcademy আমার exam preparation সম্পূর্ণ বদলে দিয়েছে। SmartAnswer feature টা অসাধারণ - আগে নিজে চেষ্টা করি, তারপর উত্তর দেখি। এতে concept অনেক ভালো clear হয়।',
    },
    {
        id: 2,
        name: 'প্রিয়াংকা দাস',
        nameEn: 'Priyanka Das',
        role: 'HS 1st Year, Arts',
        image: null,
        rating: 5,
        text: 'বাংলায় এত সুন্দর করে exam-oriented questions কোথাও পাইনি। Previous year analysis দেখে বুঝতে পারি কোন chapter বেশি important।',
    },
    {
        id: 3,
        name: 'সুমিত সাহা',
        nameEn: 'Sumit Saha',
        role: 'HS 2nd Year, Arts',
        image: null,
        rating: 5,
        text: 'Mock test গুলো real exam এর মতোই। Timer থাকায় time management practice হয়। আর result এ detailed analysis পাই যেটা অনেক helpful।',
    },
    {
        id: 4,
        name: 'অনিতা ঘোষ',
        nameEn: 'Anita Ghosh',
        role: 'HS 1st Year, Arts',
        image: null,
        rating: 5,
        text: 'সম্পূর্ণ free তেই এত features! আমার মতো যাদের coaching এ যাওয়ার সুযোগ নেই তাদের জন্য এই website টা বিশাল সাহায্য।',
    },
];

function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        ছাত্রছাত্রীরা কী বলছে
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        হাজার হাজার students আমাদের সাথে প্রস্তুতি নিচ্ছে
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                        {/* Quote Icon */}
                        <div className="absolute -top-4 left-8 p-3 bg-blue-600 rounded-xl">
                            <Quote className="h-5 w-5 text-white" />
                        </div>

                        {/* Content */}
                        <div className="pt-6">
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            'h-5 w-5',
                                            i < currentTestimonial.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-lg text-gray-900 dark:text-white leading-relaxed mb-6 font-bengali">
                                "{currentTestimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <Avatar
                                    src={currentTestimonial.image}
                                    name={currentTestimonial.name}
                                    size="lg"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {currentTestimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {currentTestimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between pointer-events-none">
                            <button
                                onClick={goToPrevious}
                                className="pointer-events-auto -ml-4 lg:-ml-6 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 text-gray-900 dark:text-white" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="pointer-events-auto -mr-4 lg:-mr-6 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5 text-gray-900 dark:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    'w-2 h-2 rounded-full transition-all',
                                    index === currentIndex
                                        ? 'w-6 bg-blue-600'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
