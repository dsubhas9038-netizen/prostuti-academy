'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[300px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        কিছু একটা সমস্যা হয়েছে
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                        চিন্তা করো না, এটা আমাদের পক্ষ থেকে একটা সমস্যা। পেজ রিফ্রেশ করে আবার চেষ্টা করো।
                    </p>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            রিফ্রেশ করো
                        </Button>
                        <Button onClick={this.handleReset}>
                            আবার চেষ্টা করো
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
