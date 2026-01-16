'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    GraduationCap,
    ChevronRight,
    ChevronLeft,
    Check,
    BookOpen,
    Calendar
} from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Button, Modal } from '@/components/ui';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface OnboardingModalProps {
    isOpen: boolean;
    onComplete?: () => void;
}

type Step = 'welcome' | 'stream' | 'semester' | 'complete';

interface StreamOption {
    id: 'arts' | 'commerce' | 'science';
    name: string;
    nameBn: string;
    icon: string;
    available: boolean;
}

const streams: StreamOption[] = [
    { id: 'arts', name: 'Arts', nameBn: 'কলা বিভাগ', icon: '📚', available: true },
    { id: 'commerce', name: 'Commerce', nameBn: 'বাণিজ্য বিভাগ', icon: '💼', available: false },
    { id: 'science', name: 'Science', nameBn: 'বিজ্ঞান বিভাগ', icon: '🔬', available: false },
];

const semesters = [
    { id: 1, name: 'Semester 1', nameBn: 'সেমিস্টার ১', description: 'Class 11 - First Half' },
    { id: 2, name: 'Semester 2', nameBn: 'সেমিস্টার ২', description: 'Class 11 - Second Half' },
    { id: 3, name: 'Semester 3', nameBn: 'সেমিস্টার ৩', description: 'Class 12 - First Half' },
    { id: 4, name: 'Semester 4', nameBn: 'সেমিস্টার ৪', description: 'Class 12 - Second Half' },
];

function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
    const router = useRouter();
    const { firebaseUser, userData } = useAuth();

    const [step, setStep] = useState<Step>('welcome');
    const [selectedStream, setSelectedStream] = useState<'arts' | 'commerce' | 'science' | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get user's first name
    const firstName = userData?.displayName?.split(' ')[0] || 'Student';

    // Handle step navigation
    const goToNext = () => {
        if (step === 'welcome') setStep('stream');
        else if (step === 'stream' && selectedStream) setStep('semester');
        else if (step === 'semester' && selectedSemester) setStep('complete');
    };

    const goToPrev = () => {
        if (step === 'stream') setStep('welcome');
        else if (step === 'semester') setStep('stream');
        else if (step === 'complete') setStep('semester');
    };

    // Handle completion
    const handleComplete = async () => {
        if (!firebaseUser || !selectedStream || !selectedSemester) return;

        setIsLoading(true);
        try {
            // Update user document in Firestore
            const userRef = doc(db, 'users', firebaseUser.uid);
            await updateDoc(userRef, {
                stream: selectedStream,
                currentSemester: selectedSemester,
                onboardingCompleted: true,
                updatedAt: new Date(),
            });

            toast.success('তোমার profile আপডেট হয়েছে! 🎉');
            onComplete?.();
            router.refresh();
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('সমস্যা হয়েছে। আবার চেষ্টা করো।');
        } finally {
            setIsLoading(false);
        }
    };

    // Render step content
    const renderContent = () => {
        switch (step) {
            case 'welcome':
                return (
                    <div className="text-center py-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                            <GraduationCap className="h-10 w-10 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            স্বাগতম, {firstName}! 👋
                        </h2>
                        <p className="text-gray-500 mb-6">
                            ProstutiAcademy তে তোমাকে স্বাগতম!
                            তোমার জন্য সঠিক content দেখাতে কিছু তথ্য দরকার।
                        </p>
                        <p className="text-sm text-gray-500">
                            এটা মাত্র 2টি সহজ step!
                        </p>
                    </div>
                );

            case 'stream':
                return (
                    <div className="py-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Step 1 of 2</h3>
                                <p className="text-sm text-gray-500">তোমার Stream বেছে নাও</p>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            {streams.map((stream) => (
                                <button
                                    key={stream.id}
                                    onClick={() => stream.available && setSelectedStream(stream.id)}
                                    disabled={!stream.available}
                                    className={cn(
                                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                                        stream.available
                                            ? selectedStream === stream.id
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                                    )}
                                >
                                    <span className="text-3xl">{stream.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white">{stream.name}</p>
                                        <p className="text-sm text-gray-500">{stream.nameBn}</p>
                                    </div>
                                    {!stream.available && (
                                        <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full">
                                            Coming Soon
                                        </span>
                                    )}
                                    {selectedStream === stream.id && (
                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'semester':
                return (
                    <div className="py-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Step 2 of 2</h3>
                                <p className="text-sm text-gray-500">তুমি এখন কোন Semester এ আছো?</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {semesters.map((sem) => (
                                <button
                                    key={sem.id}
                                    onClick={() => setSelectedSemester(sem.id)}
                                    className={cn(
                                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                                        selectedSemester === sem.id
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    )}
                                >
                                    <span className="text-2xl font-bold text-blue-600">{sem.id}</span>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{sem.nameBn}</p>
                                    <p className="text-xs text-gray-500">{sem.description}</p>
                                    {selectedSemester === sem.id && (
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'complete':
                const selectedStreamData = streams.find(s => s.id === selectedStream);
                const selectedSemesterData = semesters.find(s => s.id === selectedSemester);

                return (
                    <div className="text-center py-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                            <Check className="h-10 w-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            সব ঠিক আছে! 🎉
                        </h2>
                        <p className="text-gray-500 mb-6">
                            তোমার জন্য personalized content ready করছি।
                        </p>

                        {/* Summary */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">তোমার Selection:</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span>{selectedStreamData?.icon}</span>
                                    <span className="text-sm text-gray-500">
                                        {selectedStreamData?.name} ({selectedStreamData?.nameBn})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">
                                        {selectedSemesterData?.nameBn} - {selectedSemesterData?.description}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            পরে Settings থেকে এটা change করতে পারবে
                        </p>
                    </div>
                );
        }
    };

    // Render footer buttons
    const renderFooter = () => {
        switch (step) {
            case 'welcome':
                return (
                    <Button fullWidth size="lg" onClick={goToNext} rightIcon={<ChevronRight className="h-5 w-5" />}>
                        শুরু করো
                    </Button>
                );

            case 'stream':
                return (
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={goToPrev} leftIcon={<ChevronLeft className="h-4 w-4" />}>
                            Back
                        </Button>
                        <Button
                            fullWidth
                            onClick={goToNext}
                            disabled={!selectedStream}
                            rightIcon={<ChevronRight className="h-5 w-5" />}
                        >
                            Next
                        </Button>
                    </div>
                );

            case 'semester':
                return (
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={goToPrev} leftIcon={<ChevronLeft className="h-4 w-4" />}>
                            Back
                        </Button>
                        <Button
                            fullWidth
                            onClick={goToNext}
                            disabled={!selectedSemester}
                            rightIcon={<ChevronRight className="h-5 w-5" />}
                        >
                            Next
                        </Button>
                    </div>
                );

            case 'complete':
                return (
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={goToPrev} leftIcon={<ChevronLeft className="h-4 w-4" />}>
                            Back
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleComplete}
                            isLoading={isLoading}
                            loadingText="Saving..."
                            rightIcon={<Check className="h-5 w-5" />}
                        >
                            শুরু করো
                        </Button>
                    </div>
                );
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => { }} // Prevent closing without completing
            showCloseButton={false}
            closeOnOverlayClick={false}
            closeOnEscape={false}
            size="md"
        >
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
                {['welcome', 'stream', 'semester', 'complete'].map((s, index) => (
                    <div
                        key={s}
                        className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            step === s ? 'w-6 bg-blue-600' :
                                ['welcome', 'stream', 'semester', 'complete'].indexOf(step) > index
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200 dark:bg-gray-700'
                        )}
                    />
                ))}
            </div>

            {/* Content */}
            {renderContent()}

            {/* Footer */}
            <div className="mt-6">
                {renderFooter()}
            </div>
        </Modal>
    );
}

export default OnboardingModal;
