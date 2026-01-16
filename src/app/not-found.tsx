import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui';
import Logo from '@/components/shared/Logo';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            {/* Simple Header */}
            <header className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto">
                    <Logo size="md" />
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    {/* 404 Illustration */}
                    <div className="relative mb-8">
                        <div className="text-[150px] lg:text-[200px] font-bold text-blue-500/10 leading-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl">🔍</div>
                        </div>
                    </div>

                    {/* Message */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-gray-500 mb-8">
                        দুঃখিত! তুমি যে page টা খুঁজছো সেটা পাওয়া যাচ্ছে না।
                        হয়তো URL ভুল হয়েছে অথবা page টা সরিয়ে ফেলা হয়েছে।
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button leftIcon={<Home className="h-4 w-4" />}>
                                Go to Homepage
                            </Button>
                        </Link>
                        <Link href="/subjects">
                            <Button variant="outline" leftIcon={<Search className="h-4 w-4" />}>
                                Browse Subjects
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
