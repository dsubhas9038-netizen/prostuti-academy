'use client';

import React from 'react';
import {
    Star,
    TrendingUp,
    ChevronRight,
    Flame
} from 'lucide-react';
import { TopicFrequency, importanceConfig } from '@/types/pyq';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ImportantTopicsCardProps {
    topics: TopicFrequency[];
    maxTopics?: number;
    showViewAll?: boolean;
    onViewAll?: () => void;
    onTopicClick?: (topic: TopicFrequency) => void;
    className?: string;
}

function ImportantTopicsCard({
    topics,
    maxTopics = 8,
    showViewAll = true,
    onViewAll,
    onTopicClick,
    className,
}: ImportantTopicsCardProps) {
    const displayedTopics = topics.slice(0, maxTopics);
    const maxFrequency = Math.max(...topics.map(t => t.frequency), 1);

    return (
        <Card className={className}>
            <CardHeader
                title="Important Topics"
                subtitle="সবচেয়ে বেশি জিজ্ঞাসিত টপিক"
                icon={<Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                action={
                    showViewAll && topics.length > maxTopics && (
                        <button
                            onClick={onViewAll}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            View All ({topics.length}) <ChevronRight className="h-4 w-4" />
                        </button>
                    )
                }
            />
            <CardBody>
                <div className="space-y-3">
                    {displayedTopics.map((topic, index) => {
                        const config = importanceConfig[topic.importance];
                        const barWidth = (topic.frequency / maxFrequency) * 100;

                        return (
                            <button
                                key={topic.id}
                                onClick={() => onTopicClick?.(topic)}
                                className={cn(
                                    'w-full p-3 rounded-xl text-left transition-all',
                                    'border-2 hover:shadow-md',
                                    config.bg,
                                    topic.importance === 'very-high'
                                        ? 'border-red-200 dark:border-red-800'
                                        : 'border-transparent'
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Rank */}
                                    <div
                                        className={cn(
                                            'w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                                        )}
                                        style={{ backgroundColor: config.color }}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                                {topic.topicBn}
                                            </h4>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {topic.importance === 'very-high' && (
                                                    <Flame className="h-4 w-4 text-red-500" />
                                                )}
                                                <Badge
                                                    size="sm"
                                                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                                                >
                                                    {topic.frequency}x
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Frequency Bar */}
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${barWidth}%`,
                                                    backgroundColor: config.color
                                                }}
                                            />
                                        </div>

                                        {/* Years */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500">
                                                Last: {topic.lastAskedYear}
                                            </span>
                                            <span className="text-gray-500">
                                                Avg: {topic.avgMarks} marks
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(importanceConfig).map(([key, config]) => (
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

export default ImportantTopicsCard;
