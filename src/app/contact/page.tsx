import { Metadata } from 'next';
import { MainLayout } from '@/components/layout';
import { Card, CardBody, Input, Textarea, Button } from '@/components/ui';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'ProstutiAcademy এর সাথে যোগাযোগ করো। আমরা তোমার সাহায্যে সবসময় আছি।',
};

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'support@prostutiacademy.com',
            href: 'mailto:support@prostutiacademy.com',
        },
        {
            icon: MessageSquare,
            title: 'Telegram',
            value: '@prostutiacademy',
            href: 'https://t.me/prostutiacademy',
        },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        যোগাযোগ করো 📬
                    </h1>
                    <p className="text-lg text-gray-500">
                        কোনো প্রশ্ন, suggestion, বা feedback থাকলে আমাদের জানাও।
                        আমরা সাহায্য করতে সবসময় প্রস্তুত!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-4">
                        {contactInfo.map((item, index) => (
                            <Card key={index}>
                                <CardBody className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                        <item.icon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{item.title}</p>
                                        <a
                                            href={item.href}
                                            className="text-gray-900 dark:text-white font-medium hover:text-blue-600 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}

                        <Card>
                            <CardBody>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Response Time</h3>
                                <p className="text-sm text-gray-500">
                                    সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।
                                </p>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardBody className="p-6 lg:p-8">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Message পাঠাও
                                </h2>
                                <form className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="তোমার নাম"
                                            placeholder="যেমন: রাহুল মণ্ডল"
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="tomar@email.com"
                                        />
                                    </div>
                                    <Input
                                        label="Subject"
                                        placeholder="কী বিষয়ে জানতে চাও?"
                                    />
                                    <Textarea
                                        label="Message"
                                        placeholder="তোমার message লেখো..."
                                        showCharCount
                                        maxLength={1000}
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        rightIcon={<Send className="h-4 w-4" />}
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
