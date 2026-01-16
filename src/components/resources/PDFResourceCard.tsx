'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileText,
    Download,
    Eye,
    Star,
    Bookmark,
    Share2,
    Clock,
    Crown
} from 'lucide-react';
import { PDFResource, pdfCategoryConfig, formatFileSize, formatDownloads } from '@/types';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PDFResourceCardProps {
    resource: PDFResource;
    variant?: 'default' | 'compact' | 'horizontal';
    onDownload?: (resource: PDFResource) => void;
    onBookmark?: (resource: PDFResource) => void;
    isBookmarked?: boolean;
    className?: string;
}

function PDFResourceCard({
    resource,
    variant = 'default',
    onDownload,
    onBookmark,
    isBookmarked = false,
    className,
}: PDFResourceCardProps) {
    const categoryInfo = pdfCategoryConfig[resource.category];

    // Render rating stars
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={cn(
                        'h-3 w-3',
                        i <= Math.round(rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                    )}
                />
            );
        }
        return stars;
    };

    // Horizontal variant
    if (variant === 'horizontal') {
        return (
            <Card className={cn('hover:shadow-md transition-all', className)}>
                <CardBody className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${categoryInfo.color}20` }}
                    >
                        <span className="text-2xl">{categoryInfo.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {resource.titleBn}
                            </h3>
                            {resource.isPremium && (
                                <Crown className="h-4 w-4 text-yellow-500" />
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{formatFileSize(resource.fileSize)}</span>
                            <span>•</span>
                            <span>{resource.pageCount} pages</span>
                            <span>•</span>
                            <span>{formatDownloads(resource.downloads)} downloads</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Link href={`/resources/view/${resource.id}`}>
                            <Button variant="outline" size="sm" leftIcon={<Eye className="h-4 w-4" />}>
                                View
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            onClick={() => onDownload?.(resource)}
                            leftIcon={<Download className="h-4 w-4" />}
                        >
                            Download
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    }

    // Compact variant
    if (variant === 'compact') {
        return (
            <Link href={`/resources/view/${resource.id}`}>
                <Card className={cn('hover:shadow-md transition-all cursor-pointer', className)}>
                    <CardBody className="p-4">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${categoryInfo.color}20` }}
                            >
                                <span className="text-lg">{categoryInfo.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">
                                    {resource.titleBn}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>{formatFileSize(resource.fileSize)}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-0.5">
                                        {renderStars(resource.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Default variant
    return (
        <Card className={cn('overflow-hidden hover:shadow-lg transition-all', className)}>
            {/* Header */}
            <div
                className="p-4 relative"
                style={{ backgroundColor: `${categoryInfo.color}10` }}
            >
                {/* Badges */}
                <div className="flex items-start justify-between mb-3">
                    <Badge
                        style={{ backgroundColor: categoryInfo.color, color: 'white' }}
                    >
                        {categoryInfo.icon} {categoryInfo.labelBn}
                    </Badge>
                    <div className="flex items-center gap-1">
                        {resource.isNew && (
                            <Badge variant="success" size="sm">NEW</Badge>
                        )}
                        {resource.isPremium && (
                            <Badge variant="warning" size="sm" className="flex items-center gap-1">
                                <Crown className="h-3 w-3" />
                                Premium
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-3">
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${categoryInfo.color}20` }}
                    >
                        <FileText className="h-8 w-8" style={{ color: categoryInfo.color }} />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center line-clamp-2">
                    {resource.titleBn}
                </h3>
                {resource.descriptionBn && (
                    <p className="text-sm text-gray-500 text-center mt-1 line-clamp-2">
                        {resource.descriptionBn}
                    </p>
                )}

                {/* Bookmark Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onBookmark?.(resource);
                    }}
                    className={cn(
                        'absolute top-3 right-3 p-2 rounded-lg transition-colors',
                        isBookmarked
                            ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
                            : 'text-gray-400 hover:text-yellow-500 bg-white dark:bg-gray-800 hover:bg-gray-100'
                    )}
                >
                    <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                </button>
            </div>

            <CardBody>
                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                        {renderStars(resource.rating)}
                        <span className="text-sm text-gray-500 ml-1">
                            ({resource.ratingCount})
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Download className="h-4 w-4" />
                        {formatDownloads(resource.downloads)}
                    </div>
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{formatFileSize(resource.fileSize)}</span>
                    {resource.pageCount && (
                        <span>{resource.pageCount} pages</span>
                    )}
                    <span className="uppercase">{resource.format}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link href={`/resources/view/${resource.id}`} className="flex-1">
                        <Button variant="outline" className="w-full" leftIcon={<Eye className="h-4 w-4" />}>
                            View
                        </Button>
                    </Link>
                    <Button
                        className="flex-1"
                        onClick={() => onDownload?.(resource)}
                        leftIcon={<Download className="h-4 w-4" />}
                    >
                        {resource.isPremium && !resource.isFree ? 'Get' : 'Download'}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default PDFResourceCard;
