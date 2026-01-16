'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface TestInterfacePageProps {
    params: Promise<{ testId: string }>;
}

export default function TestInterfacePage({ params }: TestInterfacePageProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [timeLeft] = useState(3600); // 60 minutes in seconds

    // Sample question data
    const questions = [
        {
            id: 'q1',
            question: '"পথের দাবী" গল্পের লেখক কে?',
            options: [
                'রবীন্দ্রনাথ ঠাকুর',
                'শরৎচন্দ্র চট্টোপাধ্যায়',
                'বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
                'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
            ],
        },
        {
            id: 'q2',
            question: 'The correct passive form of "She writes a letter" is:',
            options: [
                'A letter is written by her',
                'A letter was written by her',
                'A letter has been written by her',
                'A letter will be written by her',
            ],
        },
    ];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Test Header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="font-semibold text-gray-900 dark:text-white">
                            Bengali Mock Test
                        </h1>
                        <p className="text-sm text-gray-500">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                        </div>
                        <Button variant="danger" size="sm">
                            Submit Test
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Question Area */}
                    <div className="lg:col-span-3">
                        <Card className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <Badge variant="primary">Question {currentQuestion + 1}</Badge>
                                <Button variant="ghost" size="sm">
                                    <Flag className="mr-1 h-4 w-4" />
                                    Mark for Review
                                </Button>
                            </div>

                            <p className="mb-6 text-lg text-gray-900 dark:text-white">
                                {questions[currentQuestion]?.question}
                            </p>

                            <div className="space-y-3">
                                {questions[currentQuestion]?.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedAnswer(index)}
                                        className={`w-full rounded-lg border-2 p-4 text-left transition-colors ${selectedAnswer === index
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                                            }`}
                                    >
                                        <span className="mr-3 font-medium">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="mt-8 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
                                    }
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Question Navigator */}
                    <div className="lg:col-span-1">
                        <Card className="p-4">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                Question Navigator
                            </h3>
                            <div className="grid grid-cols-5 gap-2">
                                {questions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium ${currentQuestion === index
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                                    <span>Marked for Review</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                                    <span>Not Visited</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
