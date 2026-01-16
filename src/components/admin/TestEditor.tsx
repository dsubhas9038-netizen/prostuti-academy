'use client';

import React, { useState } from 'react';
import {
    Save,
    X,
    Plus,
    Trash2,
    GripVertical,
    Clock,
    Calculator
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestQuestion {
    id: string;
    questionId: string;
    title: string;
    marks: number;
    type: 'short' | 'broad' | 'mcq';
}

interface TestEditorProps {
    testId?: string | null;
    onSave?: (data: any) => void;
    onCancel?: () => void;
    className?: string;
}

function TestEditor({ testId, onSave, onCancel, className }: TestEditorProps) {
    const isEditing = !!testId;

    const [test, setTest] = useState({
        title: '',
        titleBn: '',
        type: 'chapter' as 'chapter' | 'full' | 'practice',
        duration: 60,
        subjectId: '',
        chapterId: '',
        instructions: '',
        instructionsBn: '',
        passingScore: 40,
        shuffleQuestions: false,
        showResults: true,
        status: 'draft' as 'draft' | 'published',
    });

    const [questions, setQuestions] = useState<TestQuestion[]>([
        { id: '1', questionId: 'q1', title: 'Sample Question 1', marks: 5, type: 'broad' },
        { id: '2', questionId: 'q2', title: 'Sample Question 2', marks: 5, type: 'broad' },
    ]);

    // Calculate totals
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const totalQuestions = questions.length;

    // Add question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now().toString(), questionId: '', title: 'New Question', marks: 5, type: 'broad' },
        ]);
    };

    // Remove question
    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // Handle save
    const handleSave = (status: 'draft' | 'published') => {
        onSave?.({
            ...test,
            status,
            questions: questions.map(q => q.questionId),
        });
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Test' : 'Create New Test'}
                    </h2>
                    <p className="text-sm text-gray-500 font-bengali">
                        {isEditing ? 'টেস্ট সম্পাদনা করুন' : 'নতুন টেস্ট তৈরি করুন'}
                    </p>
                </div>
                <Button variant="outline" onClick={onCancel} leftIcon={<X className="h-4 w-4" />}>
                    Cancel
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader title="Test Details" subtitle="টেস্টের বিবরণ" />
                        <CardBody className="space-y-4">
                            {/* Title */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Test Title (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={test.title}
                                        onChange={(e) => setTest({ ...test, title: e.target.value })}
                                        placeholder="Enter test title..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Test Title (Bengali)
                                    </label>
                                    <input
                                        type="text"
                                        value={test.titleBn}
                                        onChange={(e) => setTest({ ...test, titleBn: e.target.value })}
                                        placeholder="টেস্টের শিরোনাম..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-bengali"
                                    />
                                </div>
                            </div>

                            {/* Type & Duration */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select
                                        value={test.type}
                                        onChange={(e) => setTest({ ...test, type: e.target.value as any })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    >
                                        <option value="chapter">Chapter Test</option>
                                        <option value="full">Full Mock Test</option>
                                        <option value="practice">Practice Test</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (mins)</label>
                                    <input
                                        type="number"
                                        value={test.duration}
                                        onChange={(e) => setTest({ ...test, duration: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Passing Score (%)</label>
                                    <input
                                        type="number"
                                        value={test.passingScore}
                                        onChange={(e) => setTest({ ...test, passingScore: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Instructions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Instructions (Bengali)
                                </label>
                                <textarea
                                    value={test.instructionsBn}
                                    onChange={(e) => setTest({ ...test, instructionsBn: e.target.value })}
                                    placeholder="টেস্ট দেওয়ার নির্দেশনা..."
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-bengali"
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Questions */}
                    <Card>
                        <CardHeader
                            title="Questions"
                            subtitle="প্রশ্নসমূহ"
                            action={
                                <Button variant="outline" size="sm" onClick={addQuestion} leftIcon={<Plus className="h-4 w-4" />}>
                                    Add Question
                                </Button>
                            }
                        />
                        <CardBody className="space-y-3">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                >
                                    <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                                    <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>

                                    <div className="flex-1">
                                        <select
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                                        >
                                            <option value="">Select Question</option>
                                            <option value="q1">পথের দাবী সারাংশ লেখ</option>
                                            <option value="q2">চরিত্র বিশ্লেষণ কর</option>
                                            <option value="q3">MCQ - Grammar</option>
                                        </select>
                                    </div>

                                    <Badge variant="secondary" size="sm" className="uppercase">{question.type}</Badge>

                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Calculator className="h-4 w-4" />
                                        {question.marks}
                                    </div>

                                    <button
                                        onClick={() => removeQuestion(question.id)}
                                        className="p-2 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            {questions.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No questions added yet. Click "Add Question" to start.
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publish */}
                    <Card>
                        <CardHeader title="Publish" subtitle="প্রকাশ করুন" />
                        <CardBody className="space-y-3">
                            <Button
                                className="w-full"
                                onClick={() => handleSave('published')}
                                leftIcon={<Save className="h-4 w-4" />}
                            >
                                Publish Test
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSave('draft')}
                            >
                                Save as Draft
                            </Button>
                        </CardBody>
                    </Card>

                    {/* Summary */}
                    <Card>
                        <CardHeader title="Summary" subtitle="সারাংশ" />
                        <CardBody>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <span className="text-sm text-gray-600">Questions</span>
                                    <span className="font-semibold text-blue-600">{totalQuestions}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <span className="text-sm text-gray-600">Total Marks</span>
                                    <span className="font-semibold text-purple-600">{totalMarks}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        Duration
                                    </div>
                                    <span className="font-semibold text-amber-600">{test.duration} mins</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Subject & Chapter */}
                    <Card>
                        <CardHeader title="Organization" subtitle="বিভাগ" />
                        <CardBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                <select
                                    value={test.subjectId}
                                    onChange={(e) => setTest({ ...test, subjectId: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="">Select Subject</option>
                                    <option value="bengali">Bengali</option>
                                    <option value="english">English</option>
                                    <option value="history">History</option>
                                </select>
                            </div>
                            {test.type === 'chapter' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chapter</label>
                                    <select
                                        value={test.chapterId}
                                        onChange={(e) => setTest({ ...test, chapterId: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    >
                                        <option value="">Select Chapter</option>
                                        <option value="ch1">Chapter 1</option>
                                        <option value="ch2">Chapter 2</option>
                                    </select>
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    {/* Options */}
                    <Card>
                        <CardHeader title="Options" subtitle="বিকল্প" />
                        <CardBody className="space-y-4">
                            {[
                                { key: 'shuffleQuestions', label: 'Shuffle Questions', desc: 'Randomize question order' },
                                { key: 'showResults', label: 'Show Results', desc: 'Show score after completion' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={test[item.key as keyof typeof test] as boolean}
                                            onChange={(e) => setTest({ ...test, [item.key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default TestEditor;
