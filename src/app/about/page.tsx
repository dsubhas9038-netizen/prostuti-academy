import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Button, Card, CardBody } from '@/components/ui';
import {
    GraduationCap,
    Target,
    Users,
    Heart,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'ProstutiAcademy সম্পর্কে জানো - West Bengal HS students এর জন্য সেরা exam preparation platform।',
};

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: 'Exam Focused',
            description: 'শুধুমাত্র exam-এ যা আসে, তাই পড়াই',
        },
        {
            icon: Users,
            title: 'Student First',
            description: 'Students এর সুবিধার কথা সবার আগে ভাবি',
        },
        {
            icon: Heart,
            title: 'Free Forever',
            description: 'Quality education সবার জন্য, ফ্রি-তে',
        },
    ];

    const stats = [
        { value: '10,000+', label: 'Questions' },
        { value: '50,000+', label: 'Students' },
        { value: '500+', label: 'Mock Tests' },
        { value: '8', label: 'Subjects' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-6">
                        <GraduationCap className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        আমাদের সম্পর্কে
                    </h1>
                    <p className="text-lg text-gray-500">
                        ProstutiAcademy হলো West Bengal Higher Secondary students এর জন্য
                        একটি সম্পূর্ণ ফ্রি exam preparation platform। আমাদের লক্ষ্য হলো
                        প্রতিটি ছাত্রছাত্রীকে সেরা প্রস্তুতি নিতে সাহায্য করা।
                    </p>
                </div>

                {/* Mission Section */}
                <Card className="mb-16">
                    <CardBody className="p-8 lg:p-12">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    আমাদের Mission 🎯
                                </h2>
                                <p className="text-gray-500 mb-4">
                                    West Bengal এর প্রতিটি HS student যাতে quality exam preparation
                                    পেতে পারে - তা সে শহরে থাকুক বা গ্রামে, coaching এ যাক বা না যাক।
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Exam-oriented questions with proper word count',
                                        'Previous year analysis for smart preparation',
                                        'Free mock tests with instant results',
                                        'বাংলা ও English দুই ভাষায় content',
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-900 dark:text-white">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        আমাদের Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center">
                                <CardBody className="py-8">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 mb-4">
                                        <value.icon className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        {value.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        তুমিও আমাদের সাথে যোগ দাও!
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-xl mx-auto">
                        এখনই ফ্রি account তৈরি করো এবং exam preparation শুরু করো।
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
