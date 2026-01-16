'use client';

import React, { useState } from 'react';
import {
    Save,
    X,
    Plus,
    Trash2,
    Eye,
    Lightbulb,
    CheckSquare
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuestionEditorProps {
    questionId?: string | null;
    onSave?: (data: any) => void;
    onCancel?: () => void;
    className?: string;
}

function QuestionEditor({ questionId, onSave, onCancel, className }: QuestionEditorProps) {
    const isEditing = !!questionId;

    const [question, setQuestion] = useState({
        title: '',
        titleBn: '',
        type: 'broad' as 'short' | 'broad' | 'mcq',
        marks: 5,
        subjectId: '',
        chapterId: '',
        hint: '',
        answer: '',
        keyPoints: [''],
        examinerTips: '',
        status: 'draft' as 'draft' | 'published',
        // MCQ options
        options: [
            { text: '', textBn: '', isCorrect: false },
            { text: '', textBn: '', isCorrect: false },
            { text: '', textBn: '', isCorrect: false },
            { text: '', textBn: '', isCorrect: false },
        ],
    });

    const [showPreview, setShowPreview] = useState(false);

    // Handle key point add/remove
    const addKeyPoint = () => {
        setQuestion({ ...question, keyPoints: [...question.keyPoints, ''] });
    };

    const removeKeyPoint = (index: number) => {
        const newPoints = [...question.keyPoints];
        newPoints.splice(index, 1);
        setQuestion({ ...question, keyPoints: newPoints });
    };

    const updateKeyPoint = (index: number, value: string) => {
        const newPoints = [...question.keyPoints];
        newPoints[index] = value;
        setQuestion({ ...question, keyPoints: newPoints });
    };

    // Handle MCQ option
    const updateOption = (index: number, field: string, value: any) => {
        const newOptions = [...question.options];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setQuestion({ ...question, options: newOptions });
    };

    // Handle save
    const handleSave = (status: 'draft' | 'published') => {
        onSave?.({ ...question, status });
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Question' : 'Add New Question'}
                    </h2>
                    <p className="text-sm text-gray-500 font-bengali">
                        {isEditing ? 'প্রশ্ন সম্পাদনা করুন' : 'নতুন প্রশ্ন যোগ করুন'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setShowPreview(!showPreview)} leftIcon={<Eye className="h-4 w-4" />}>
                        {showPreview ? 'Edit' : 'Preview'}
                    </Button>
                    <Button variant="outline" onClick={onCancel} leftIcon={<X className="h-4 w-4" />}>
                        Cancel
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader title="Question Details" subtitle="প্রশ্নের বিবরণ" />
                        <CardBody className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Title (English)
                                </label>
                                <input
                                    type="text"
                                    value={question.title}
                                    onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                                    placeholder="Enter question title..."
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Title (Bengali)
                                </label>
                                <textarea
                                    value={question.titleBn}
                                    onChange={(e) => setQuestion({ ...question, titleBn: e.target.value })}
                                    placeholder="বাংলায় প্রশ্ন লিখুন..."
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-bengali"
                                />
                            </div>

                            {/* Type & Marks */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select
                                        value={question.type}
                                        onChange={(e) => setQuestion({ ...question, type: e.target.value as any })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    >
                                        <option value="short">Short Answer (SAQ)</option>
                                        <option value="broad">Broad Answer (LAQ)</option>
                                        <option value="mcq">Multiple Choice (MCQ)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks</label>
                                    <input
                                        type="number"
                                        value={question.marks}
                                        onChange={(e) => setQuestion({ ...question, marks: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* MCQ Options (if MCQ) */}
                    {question.type === 'mcq' && (
                        <Card>
                            <CardHeader title="MCQ Options" subtitle="বহুনির্বাচনী উত্তর" />
                            <CardBody className="space-y-3">
                                {question.options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <input
                                            type="radio"
                                            checked={option.isCorrect}
                                            onChange={() => {
                                                const newOptions = question.options.map((o, i) => ({
                                                    ...o,
                                                    isCorrect: i === index
                                                }));
                                                setQuestion({ ...question, options: newOptions });
                                            }}
                                            className="w-4 h-4 text-green-600"
                                        />
                                        <span className="text-sm font-medium text-gray-500 w-6">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        <div className="flex-1 grid grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => updateOption(index, 'text', e.target.value)}
                                                placeholder="Option (English)"
                                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                            />
                                            <input
                                                type="text"
                                                value={option.textBn}
                                                onChange={(e) => updateOption(index, 'textBn', e.target.value)}
                                                placeholder="বিকল্প (বাংলা)"
                                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-bengali"
                                            />
                                        </div>
                                        {option.isCorrect && (
                                            <Badge size="sm" className="bg-green-100 text-green-700">Correct</Badge>
                                        )}
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    )}

                    {/* Answer (if not MCQ) */}
                    {question.type !== 'mcq' && (
                        <Card>
                            <CardHeader title="Answer" subtitle="উত্তর" />
                            <CardBody>
                                <textarea
                                    value={question.answer}
                                    onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
                                    placeholder="Write the model answer..."
                                    rows={8}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </CardBody>
                        </Card>
                    )}

                    {/* Key Points */}
                    <Card>
                        <CardHeader
                            title="Key Points"
                            subtitle="মূল পয়েন্টসমূহ"
                            icon={<CheckSquare className="h-5 w-5 text-green-500" />}
                            action={
                                <Button variant="outline" size="sm" onClick={addKeyPoint} leftIcon={<Plus className="h-4 w-4" />}>
                                    Add Point
                                </Button>
                            }
                        />
                        <CardBody className="space-y-3">
                            {question.keyPoints.map((point, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 w-6">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => updateKeyPoint(index, e.target.value)}
                                        placeholder="Enter key point..."
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                    />
                                    <button
                                        onClick={() => removeKeyPoint(index)}
                                        className="p-2 text-gray-400 hover:text-red-500"
                                        disabled={question.keyPoints.length <= 1}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
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
                                Publish Question
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

                    {/* Subject & Chapter */}
                    <Card>
                        <CardHeader title="Organization" subtitle="বিভাগ" />
                        <CardBody className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                <select
                                    value={question.subjectId}
                                    onChange={(e) => setQuestion({ ...question, subjectId: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="">Select Subject</option>
                                    <option value="bengali">Bengali</option>
                                    <option value="english">English</option>
                                    <option value="history">History</option>
                                    <option value="philosophy">Philosophy</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chapter</label>
                                <select
                                    value={question.chapterId}
                                    onChange={(e) => setQuestion({ ...question, chapterId: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                >
                                    <option value="">Select Chapter</option>
                                    <option value="ch1">Chapter 1</option>
                                    <option value="ch2">Chapter 2</option>
                                </select>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Hint */}
                    <Card>
                        <CardHeader title="Hint" subtitle="ইঙ্গিত" icon={<Lightbulb className="h-5 w-5 text-amber-500" />} />
                        <CardBody>
                            <textarea
                                value={question.hint}
                                onChange={(e) => setQuestion({ ...question, hint: e.target.value })}
                                placeholder="Optional hint for students..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </CardBody>
                    </Card>

                    {/* Examiner Tips */}
                    <Card>
                        <CardHeader title="Examiner Tips" subtitle="পরীক্ষকের টিপস" />
                        <CardBody>
                            <textarea
                                value={question.examinerTips}
                                onChange={(e) => setQuestion({ ...question, examinerTips: e.target.value })}
                                placeholder="Tips for writing in exams..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default QuestionEditor;
