import Link from 'next/link';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { Trophy, Target, Clock, CheckCircle, XCircle, Share2 } from 'lucide-react';

interface TestResultPageProps {
    params: Promise<{ testId: string }>;
}

export default async function TestResultPage({ params }: TestResultPageProps) {
    const { testId } = await params;

    // Sample result data
    const result = {
        score: 38,
        totalMarks: 50,
        percentage: 76,
        correctAnswers: 19,
        wrongAnswers: 4,
        skipped: 2,
        timeTaken: '45:30',
        rank: 12,
        totalAttempts: 150,
    };

    const isPassed = result.percentage >= 40;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Result Header */}
            <div className="mb-8 text-center">
                <div
                    className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full ${isPassed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                >
                    {isPassed ? (
                        <Trophy className="h-12 w-12 text-green-600" />
                    ) : (
                        <Target className="h-12 w-12 text-red-600" />
                    )}
                </div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {isPassed ? '🎉 অভিনন্দন!' : 'আবার চেষ্টা করো!'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Bengali Semester 1 Mock Test
                </p>
            </div>

            {/* Score Card */}
            <Card className="mx-auto mb-8 max-w-md p-6 text-center">
                <div className="mb-4 text-5xl font-bold text-blue-600">{result.percentage}%</div>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                    তুমি {result.score} / {result.totalMarks} পেয়েছ
                </p>
                <ProgressBar value={result.percentage} variant={isPassed ? 'success' : 'error'} size="lg" />
            </Card>

            {/* Stats Grid */}
            <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
                <Card className="p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-6 w-6 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.correctAnswers}
                    </div>
                    <div className="text-sm text-gray-500">সঠিক</div>
                </Card>
                <Card className="p-4 text-center">
                    <XCircle className="mx-auto mb-2 h-6 w-6 text-red-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.wrongAnswers}
                    </div>
                    <div className="text-sm text-gray-500">ভুল</div>
                </Card>
                <Card className="p-4 text-center">
                    <Clock className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.timeTaken}
                    </div>
                    <div className="text-sm text-gray-500">সময়</div>
                </Card>
                <Card className="p-4 text-center">
                    <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        #{result.rank}
                    </div>
                    <div className="text-sm text-gray-500">Rank</div>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <Button variant="primary" className="flex-1">
                    উত্তর দেখো
                </Button>
                <Link href="/mock-tests" className="flex-1">
                    <Button variant="outline" className="w-full">
                        আরো টেস্ট দাও
                    </Button>
                </Link>
                <Button variant="ghost">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
