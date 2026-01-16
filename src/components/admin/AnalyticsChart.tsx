'use client';

import React, { useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui';
import { ChartData, ChartType, chartColorsPalette } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface AnalyticsChartProps {
    title: string;
    subtitle?: string;
    data: ChartData;
    type?: ChartType;
    height?: number;
    showLegend?: boolean;
    className?: string;
}

function AnalyticsChart({
    title,
    subtitle,
    data,
    type = 'line',
    height = 300,
    showLegend = true,
    className,
}: AnalyticsChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 50;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;

        // Calculate max value
        const allValues = data.datasets.flatMap(d => d.data);
        const maxValue = Math.max(...allValues) * 1.1;
        const minValue = Math.min(0, ...allValues);

        // Draw grid lines
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = '#9CA3AF';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'right';
            const value = Math.round(maxValue - (maxValue / 5) * i);
            ctx.fillText(value.toString(), padding - 10, y + 4);
        }

        // Draw X-axis labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';

        const xStep = chartWidth / (data.labels.length - 1 || 1);
        data.labels.forEach((label, i) => {
            const x = padding + xStep * i;
            ctx.fillText(label, x, canvas.height - 15);
        });

        // Draw datasets
        data.datasets.forEach((dataset, datasetIndex) => {
            const color = dataset.color || chartColorsPalette[datasetIndex % chartColorsPalette.length];

            if (type === 'line' || type === 'area') {
                // Draw line chart
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';

                dataset.data.forEach((value, i) => {
                    const x = padding + xStep * i;
                    const y = padding + chartHeight - (value / maxValue) * chartHeight;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                ctx.stroke();

                // Fill area
                if (type === 'area') {
                    ctx.lineTo(padding + xStep * (dataset.data.length - 1), padding + chartHeight);
                    ctx.lineTo(padding, padding + chartHeight);
                    ctx.closePath();
                    ctx.fillStyle = `${color}20`;
                    ctx.fill();
                }

                // Draw points
                dataset.data.forEach((value, i) => {
                    const x = padding + xStep * i;
                    const y = padding + chartHeight - (value / maxValue) * chartHeight;

                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff';
                    ctx.fill();
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
            } else if (type === 'bar') {
                // Draw bar chart
                const barWidth = (xStep - 10) / data.datasets.length;

                dataset.data.forEach((value, i) => {
                    const x = padding + xStep * i - (data.datasets.length * barWidth) / 2 + datasetIndex * barWidth;
                    const barHeight = (value / maxValue) * chartHeight;
                    const y = padding + chartHeight - barHeight;

                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, barWidth - 2, barHeight);
                });
            }
        });

    }, [data, type]);

    return (
        <Card className={className}>
            <CardHeader title={title} subtitle={subtitle} />
            <CardBody>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={height}
                    style={{ width: '100%', height: `${height}px` }}
                />

                {/* Legend */}
                {showLegend && data.datasets.length > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {data.datasets.map((dataset, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: dataset.color || chartColorsPalette[i] }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {dataset.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default AnalyticsChart;

// Simple Pie Chart Component
interface PieChartProps {
    data: { label: string; value: number; color?: string }[];
    size?: number;
    showLabels?: boolean;
}

export function PieChart({ data, size = 200, showLabels = true }: PieChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const total = data.reduce((sum, d) => sum + d.value, 0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 10;

        ctx.clearRect(0, 0, size, size);

        let startAngle = -Math.PI / 2;

        data.forEach((item, i) => {
            const sliceAngle = (item.value / total) * Math.PI * 2;
            const endAngle = startAngle + sliceAngle;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = item.color || chartColorsPalette[i % chartColorsPalette.length];
            ctx.fill();

            startAngle = endAngle;
        });

        // Draw center circle (for doughnut effect)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

    }, [data, size, total]);

    return (
        <div className="flex flex-col items-center">
            <canvas ref={canvasRef} width={size} height={size} />
            {showLabels && (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color || chartColorsPalette[i] }}
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                {item.label} ({Math.round(item.value / total * 100)}%)
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
