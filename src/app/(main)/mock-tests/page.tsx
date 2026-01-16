import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { Clock, Users, Star } from 'lucide-react';

export default function MockTestsPage() {
    const tests = [
        {
            id: 'test1',
            title: 'Bengali Semester 1 Mock Test',
            titleBn: 'বাংলা সেমিস্টার ১ মক টেস্ট',
            duration: 60,
            questions: 25,
            marks: 50,
            difficulty: 'medium',
            attempts: 150,
            isFree: true,
        },
        {
            id: 'test2',
            title: 'History Full Syllabus Test',
            titleBn: 'ইতিহাস সম্পূর্ণ সিলেবাস টেস্ট',
            duration: 90,
            questions: 40,
            marks: 80,
            difficulty: 'hard',
            attempts: 89,
            isFree: true,
        },
        {
            id: 'test3',
            title: 'English Grammar Quick Test',
            titleBn: 'ইংরেজি গ্রামার কুইক টেস্ট',
            duration: 30,
            questions: 15,
            marks: 30,
            difficulty: 'easy',
            attempts: 234,
            isFree: true,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                📝 Mock Tests
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
                Real exam এর মতো practice করো এবং নিজেকে যাচাই করো
            </p>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                <Button variant="primary" size="sm">All Tests</Button>
                <Button variant="outline" size="sm">Bengali</Button>
                <Button variant="outline" size="sm">English</Button>
                <Button variant="outline" size="sm">History</Button>
                <Button variant="outline" size="sm">Geography</Button>
            </div>

            {/* Tests Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tests.map((test) => (
                    <Card key={test.id} className="card-hover p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <Badge variant={test.isFree ? 'success' : 'warning'}>
                                {test.isFree ? 'FREE' : 'Premium'}
                            </Badge>
                            <Badge
                                variant={
                                    test.difficulty === 'easy'
                                        ? 'success'
                                        : test.difficulty === 'medium'
                                            ? 'warning'
                                            : 'danger'
                                }
                            >
                                {test.difficulty}
                            </Badge>
                        </div>

                        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {test.titleBn}
                        </h3>
                        <p className="mb-4 text-sm text-gray-500">{test.title}</p>

                        <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {test.duration} min
                            </span>
                            <span>{test.questions} প্রশ্ন</span>
                            <span>{test.marks} marks</span>
                        </div>

                        <div className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            {test.attempts} জন দিয়েছে
                        </div>

                        <Link href={`/mock-tests/${test.id}`}>
                            <Button variant="primary" className="w-full">
                                টেস্ট শুরু করো
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
