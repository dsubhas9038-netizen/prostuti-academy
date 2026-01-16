import { Card, Badge, ProgressBar } from '@/components/ui';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function PYQAnalysisPage() {
    const subjectAnalysis = [
        {
            subject: 'বাংলা',
            icon: '📕',
            chapters: [
                { name: 'পথের দাবী', avgMarks: 8, trend: 'up', years: [2023, 2022, 2021] },
                { name: 'অভিষেক', avgMarks: 6, trend: 'stable', years: [2023, 2021] },
                { name: 'সিন্ধু তীরে', avgMarks: 5, trend: 'down', years: [2022, 2020] },
            ],
        },
        {
            subject: 'ইতিহাস',
            icon: '📘',
            chapters: [
                { name: 'জাতীয়তাবাদ', avgMarks: 10, trend: 'up', years: [2023, 2022, 2021, 2020] },
                { name: 'সত্তর দশক', avgMarks: 7, trend: 'stable', years: [2023, 2022] },
                { name: 'শীতল যুদ্ধ', avgMarks: 6, trend: 'up', years: [2023, 2021] },
            ],
        },
    ];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="h-4 w-4 text-green-600" />;
            case 'down':
                return <TrendingDown className="h-4 w-4 text-red-600" />;
            default:
                return <Minus className="h-4 w-4 text-gray-400" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                📊 PYQ Analysis
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
                গত ১০ বছরের প্রশ্ন pattern বিশ্লেষণ - কোন chapter থেকে কত marks আসে
            </p>

            {/* Important Notice */}
            <Card className="mb-8 border-l-4 border-l-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    💡 <strong>Pro Tip:</strong> যে chapter গুলোতে ⬆️ আছে সেগুলো এই বছর আসার সম্ভাবনা বেশি!
                </p>
            </Card>

            {/* Subject Analysis */}
            <div className="space-y-8">
                {subjectAnalysis.map((subject) => (
                    <div key={subject.subject}>
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                            <span>{subject.icon}</span>
                            {subject.subject}
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {subject.chapters.map((chapter, index) => (
                                <Card key={index} className="p-4">
                                    <div className="mb-3 flex items-start justify-between">
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {chapter.name}
                                        </h3>
                                        {getTrendIcon(chapter.trend)}
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Avg. Marks</span>
                                            <span className="font-medium">{chapter.avgMarks}</span>
                                        </div>
                                        <ProgressBar value={chapter.avgMarks * 10} />
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {chapter.years.map((year) => (
                                            <Badge key={year} variant="default" className="text-xs">
                                                {year}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
