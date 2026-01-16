'use client';

import React from 'react';
import {
    TrendingUp,
    Sparkles,
    ArrowRight,
    Target,
    Calendar,
    Award
} from 'lucide-react';
import { TrendPrediction as TrendPredictionType, importanceConfig } from '@/types/pyq';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TrendPredictionProps {
    predictions: TrendPredictionType[];
    targetYear?: number;
    maxPredictions?: number;
    className?: string;
}

// Probability config
const probabilityConfig = {
    'very-high': {
        color: '#EF4444',
        bg: 'bg-red-100 dark:bg-red-900/30',
        gradient: 'from-red-500 to-orange-500',
        label: 'অত্যন্ত সম্ভাব্য',
        labelEn: 'Very Likely',
        icon: '🔥',
        percentage: '85-95%'
    },
    'high': {
        color: '#F59E0B',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        gradient: 'from-yellow-500 to-amber-500',
        label: 'সম্ভাব্য',
        labelEn: 'Likely',
        icon: '⭐',
        percentage: '65-80%'
    },
    'medium': {
        color: '#22C55E',
        bg: 'bg-green-100 dark:bg-green-900/30',
        gradient: 'from-green-500 to-emerald-500',
        label: 'মাঝারি সম্ভাবনা',
        labelEn: 'Moderate',
        icon: '📊',
        percentage: '40-60%'
    },
    'low': {
        color: '#6B7280',
        bg: 'bg-gray-100 dark:bg-gray-800',
        gradient: 'from-gray-500 to-slate-500',
        label: 'কম সম্ভাবনা',
        labelEn: 'Less Likely',
        icon: '📈',
        percentage: '20-35%'
    },
};

function TrendPrediction({
    predictions,
    targetYear = 2024,
    maxPredictions = 6,
    className,
}: TrendPredictionProps) {
    const displayedPredictions = predictions.slice(0, maxPredictions);

    return (
        <Card className={className}>
            <CardHeader
                title={`Trend Prediction ${targetYear}`}
                subtitle="এই টপিকগুলো আসার সম্ভাবনা বেশি"
                icon={<Sparkles className="h-5 w-5 text-purple-500" />}
            />
            <CardBody>
                {/* Main Predictions */}
                <div className="space-y-3">
                    {displayedPredictions.map((prediction, index) => {
                        const config = probabilityConfig[prediction.probability];

                        return (
                            <div
                                key={`${prediction.topic}-${index}`}
                                className={cn(
                                    'p-4 rounded-xl border-2 transition-all',
                                    prediction.probability === 'very-high'
                                        ? 'border-red-300 dark:border-red-800'
                                        : prediction.probability === 'high'
                                            ? 'border-yellow-300 dark:border-yellow-800'
                                            : 'border-gray-200 dark:border-gray-700',
                                    config.bg
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Rank & Icon */}
                                    <div className={cn(
                                        'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0',
                                        `bg-gradient-to-br ${config.gradient}`
                                    )}>
                                        {index + 1}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {config.icon} {prediction.topicBn}
                                            </h4>
                                            <Badge
                                                size="sm"
                                                className="flex-shrink-0"
                                                style={{ backgroundColor: `${config.color}20`, color: config.color }}
                                            >
                                                {config.percentage}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-2">
                                            {prediction.chapterTitle}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>Last: {prediction.lastAskedYear}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Award className="h-3 w-3" />
                                                <span>Avg: {prediction.avgMarks} marks</span>
                                            </div>
                                            {prediction.gapYears > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp className="h-3 w-3" />
                                                    <span>{prediction.gapYears} year gap</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Reasoning */}
                                        <p className="text-xs text-gray-400 mt-2 italic font-bengali">
                                            💡 {prediction.reasoningBn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-400">
                    📌 <strong>Note:</strong> এই predictions বিগত বছরের pattern অনুযায়ী।
                    শুধুমাত্র guidance হিসেবে ব্যবহার করো।
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(probabilityConfig).map(([key, config]) => (
                            <div key={key} className="flex items-center gap-1.5 text-xs">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: config.color }}
                                />
                                <span className="text-gray-500">{config.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default TrendPrediction;
