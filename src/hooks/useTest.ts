'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    Test,
    TestSession,
    TestAnswer,
    QuestionStatus,
    TimerStatus,
    getTimerStatus
} from '@/types';
import { Question } from '@/types/question';
import { getTestById } from '@/data/sampleTests';
import { getQuestionById } from '@/data/sampleQuestions';

interface UseTestOptions {
    testId: string;
    userId?: string;
    autoSaveInterval?: number; // in milliseconds
}

interface UseTestReturn {
    // Test data
    test: Test | null;
    questions: Question[];
    loading: boolean;
    error: string | null;

    // Session state
    session: TestSession | null;
    currentQuestionIndex: number;
    currentQuestion: Question | null;
    answers: Record<string, TestAnswer>;
    questionStatuses: Record<number, QuestionStatus>;

    // Timer
    timeRemaining: number;
    timerStatus: TimerStatus;

    // Counts
    answeredCount: number;
    skippedCount: number;

    // Actions
    startTest: () => void;
    setAnswer: (questionId: string, answer: Partial<TestAnswer>) => void;
    navigateToQuestion: (index: number) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    markQuestion: (index: number) => void;
    skipQuestion: () => void;
    submitTest: () => Promise<void>;
    pauseTest: () => void;
    resumeTest: () => void;

    // Status
    isStarted: boolean;
    isSubmitted: boolean;
    isPaused: boolean;
}

export default function useTest(options: UseTestOptions): UseTestReturn {
    const { testId, userId = 'anonymous', autoSaveInterval = 30000 } = options;

    // State
    const [test, setTest] = useState<Test | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [session, setSession] = useState<TestSession | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, TestAnswer>>({});
    const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('running');

    const [isStarted, setIsStarted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

    // Load test data
    useEffect(() => {
        setLoading(true);

        try {
            const testData = getTestById(testId);

            if (!testData) {
                setError('Test not found');
                setLoading(false);
                return;
            }

            setTest(testData);

            // Load questions
            const loadedQuestions: Question[] = [];
            for (const qId of testData.questionIds) {
                const q = getQuestionById(qId);
                if (q) loadedQuestions.push(q);
            }
            setQuestions(loadedQuestions);

            // Initialize time
            setTimeRemaining(testData.duration * 60);

            setLoading(false);
        } catch (err) {
            setError('Failed to load test');
            setLoading(false);
        }
    }, [testId]);

    // Timer logic
    useEffect(() => {
        if (!isStarted || isPaused || isSubmitted || timeRemaining <= 0) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                const newTime = prev - 1;
                const status = getTimerStatus(newTime, (test?.duration || 0) * 60);
                setTimerStatus(status);

                if (newTime <= 0) {
                    // Auto-submit on time expiry
                    handleSubmit();
                }

                return newTime;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isStarted, isPaused, isSubmitted, test?.duration]);

    // Auto-save
    useEffect(() => {
        if (!isStarted || isSubmitted || !autoSaveInterval) return;

        autoSaveRef.current = setInterval(() => {
            // Save to localStorage
            const saveData = {
                testId,
                answers,
                questionStatuses,
                currentQuestionIndex,
                timeRemaining,
                savedAt: new Date().toISOString(),
            };
            localStorage.setItem(`test_${testId}_autosave`, JSON.stringify(saveData));
        }, autoSaveInterval);

        return () => {
            if (autoSaveRef.current) {
                clearInterval(autoSaveRef.current);
            }
        };
    }, [isStarted, isSubmitted, answers, questionStatuses, currentQuestionIndex, timeRemaining, autoSaveInterval, testId]);

    // Current question
    const currentQuestion = questions[currentQuestionIndex] || null;

    // Counts
    const answeredCount = Object.values(questionStatuses).filter(s => s === 'answered').length;
    const skippedCount = Object.values(questionStatuses).filter(s => s === 'skipped').length;

    // Start test
    const startTest = useCallback(() => {
        if (!test) return;

        // Check for existing auto-save
        const savedData = localStorage.getItem(`test_${testId}_autosave`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setAnswers(parsed.answers || {});
            setQuestionStatuses(parsed.questionStatuses || {});
            setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
            setTimeRemaining(parsed.timeRemaining || test.duration * 60);
        }

        setIsStarted(true);
        setSession({
            id: `session_${Date.now()}`,
            testId,
            userId,
            test,
            startedAt: new Date(),
            timeRemaining: test.duration * 60,
            currentQuestionIndex: 0,
            answers: {},
            questionStatuses: {},
            status: 'active',
            autoSaveEnabled: true,
        });
    }, [test, testId, userId]);

    // Set answer
    const setAnswer = useCallback((questionId: string, answer: Partial<TestAnswer>) => {
        const qIndex = questions.findIndex(q => q.id === questionId);

        setAnswers((prev) => {
            const defaults: TestAnswer = {
                questionId: questionId,
                selectedOption: null,
                textAnswer: null,
                isCorrect: null,
                marksObtained: null,
                timeTaken: 0,
                answeredAt: new Date(),
            };
            const existingAnswer = prev[questionId] || {};
            const newAnswer = Object.assign({}, defaults, existingAnswer, answer, { questionId: questionId }) as TestAnswer;
            return {
                ...prev,
                [questionId]: newAnswer,
            };
        });

        // Update status
        if (qIndex >= 0) {
            setQuestionStatuses((prev) => ({
                ...prev,
                [qIndex]: 'answered',
            }));
        }
    }, [questions]);

    // Navigation
    const navigateToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    }, [questions.length]);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    }, [currentQuestionIndex, questions.length]);

    const prevQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    }, [currentQuestionIndex]);

    // Mark question for review
    const markQuestion = useCallback((index: number) => {
        setQuestionStatuses((prev) => ({
            ...prev,
            [index]: prev[index] === 'marked' ? 'not-visited' : 'marked',
        }));
    }, []);

    // Skip question
    const skipQuestion = useCallback(() => {
        setQuestionStatuses((prev) => ({
            ...prev,
            [currentQuestionIndex]: 'skipped',
        }));
        nextQuestion();
    }, [currentQuestionIndex, nextQuestion]);

    // Submit test
    const handleSubmit = async () => {
        setIsSubmitted(true);

        // Clear auto-save
        localStorage.removeItem(`test_${testId}_autosave`);

        // Calculate score (simplified)
        let score = 0;
        for (const q of questions) {
            const answer = answers[q.id];
            if (answer) {
                if (q.type === 'mcq' && q.options) {
                    const correctIndex = q.options.findIndex(opt => opt.isCorrect);
                    if (answer.selectedOption === correctIndex) {
                        score += q.marks;
                    }
                }
                // For SAQ/LAQ, we'd need manual grading or AI evaluation
            }
        }

        return;
    };

    const submitTest = useCallback(handleSubmit, [testId, questions, answers]);

    // Pause/Resume
    const pauseTest = useCallback(() => {
        setIsPaused(true);
    }, []);

    const resumeTest = useCallback(() => {
        setIsPaused(false);
    }, []);

    return {
        test,
        questions,
        loading,
        error,
        session,
        currentQuestionIndex,
        currentQuestion,
        answers,
        questionStatuses,
        timeRemaining,
        timerStatus,
        answeredCount,
        skippedCount,
        startTest,
        setAnswer,
        navigateToQuestion,
        nextQuestion,
        prevQuestion,
        markQuestion,
        skipQuestion,
        submitTest,
        pauseTest,
        resumeTest,
        isStarted,
        isSubmitted,
        isPaused,
    };
}
