'use client';

import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { ScheduleSlot, daysOfWeek, formatTimeRange } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface WeeklyScheduleProps {
    slots?: ScheduleSlot[];
    currentDay?: number; // 0-6
    onSlotClick?: (slot: ScheduleSlot) => void;
    className?: string;
}

// Time slots for display (8 AM - 6 PM)
const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return {
        hour,
        label: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'PM' : 'AM'}`,
        time: `${hour.toString().padStart(2, '0')}:00`,
    };
});

function WeeklySchedule({
    slots = [],
    currentDay = new Date().getDay(),
    onSlotClick,
    className
}: WeeklyScheduleProps) {
    // Group slots by day
    const slotsByDay = useMemo(() => {
        const grouped: Record<number, ScheduleSlot[]> = {};
        for (let i = 0; i < 7; i++) {
            grouped[i] = slots.filter(s => s.dayOfWeek === i);
        }
        return grouped;
    }, [slots]);

    // Calculate slot position
    const getSlotPosition = (slot: ScheduleSlot) => {
        const startHour = parseInt(slot.startTime.split(':')[0]);
        const startMin = parseInt(slot.startTime.split(':')[1]);
        const endHour = parseInt(slot.endTime.split(':')[0]);
        const endMin = parseInt(slot.endTime.split(':')[1]);

        const top = ((startHour - 8) * 60 + startMin) / 60 * 48; // 48px per hour
        const height = ((endHour - startHour) * 60 + (endMin - startMin)) / 60 * 48;

        return { top, height: Math.max(height, 40) };
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Weekly Schedule"
                subtitle="à¦¸à¦¾à¦ªà§à¦¤à¦¾à¦¹à¦¿à¦• à¦¸à¦®à¦¯à¦¼à¦¸à§‚à¦šà¦¿"
                icon={<Calendar className="h-5 w-5 text-purple-500" />}
            />
            <CardBody className="p-0">
                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        {/* Day Headers */}
                        <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
                            <div className="p-3 text-xs text-gray-500"></div>
                            {daysOfWeek.map((day) => (
                                <div
                                    key={day.id}
                                    className={cn(
                                        'p-3 text-center',
                                        day.id === currentDay && 'bg-blue-50 dark:bg-blue-900/20'
                                    )}
                                >
                                    <p className={cn(
                                        'font-medium text-sm',
                                        day.id === currentDay
                                            ? 'text-blue-600'
                                            : 'text-gray-900 dark:text-white'
                                    )}>
                                        {day.short}
                                    </p>
                                    <p className="text-xs text-gray-500 font-bengali">{day.shortBn}</p>
                                </div>
                            ))}
                        </div>

                        {/* Time Grid */}
                        <div className="relative">
                            {/* Time labels */}
                            <div className="grid grid-cols-8">
                                {/* Time column */}
                                <div className="relative">
                                    {timeSlots.map((slot, index) => (
                                        <div
                                            key={slot.hour}
                                            className="h-12 border-b border-gray-100 dark:border-gray-800 flex items-start px-2"
                                        >
                                            <span className="text-xs text-gray-400 -mt-2">{slot.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Day columns */}
                                {daysOfWeek.map((day) => (
                                    <div
                                        key={day.id}
                                        className={cn(
                                            'relative border-l border-gray-100 dark:border-gray-800',
                                            day.id === currentDay && 'bg-blue-50/50 dark:bg-blue-900/10'
                                        )}
                                    >
                                        {/* Time slot backgrounds */}
                                        {timeSlots.map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-12 border-b border-gray-100 dark:border-gray-800"
                                            />
                                        ))}

                                        {/* Schedule slots */}
                                        {slotsByDay[day.id].map((slot) => {
                                            const { top, height } = getSlotPosition(slot);

                                            return (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => onSlotClick?.(slot)}
                                                    className={cn(
                                                        'absolute left-1 right-1 rounded-lg p-2 text-left transition-transform hover:scale-[1.02]',
                                                        'shadow-sm hover:shadow-md'
                                                    )}
                                                    style={{
                                                        top: `${top}px`,
                                                        height: `${height}px`,
                                                        backgroundColor: slot.subjectColor + '20',
                                                        borderLeft: `3px solid ${slot.subjectColor}`,
                                                    }}
                                                >
                                                    <p
                                                        className="font-medium text-xs truncate"
                                                        style={{ color: slot.subjectColor }}
                                                    >
                                                        {slot.subjectName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {formatTimeRange(slot.startTime, slot.endTime)}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(slots.map(s => s.subjectId))).map(subjectId => {
                            const slot = slots.find(s => s.subjectId === subjectId);
                            if (!slot) return null;

                            return (
                                <Badge
                                    key={subjectId}
                                    size="sm"
                                    style={{
                                        backgroundColor: slot.subjectColor + '20',
                                        color: slot.subjectColor
                                    }}
                                >
                                    {slot.subjectName}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default WeeklySchedule;

