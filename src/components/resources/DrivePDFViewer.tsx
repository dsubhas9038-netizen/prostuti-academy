// Google Drive PDF Viewer Component
// Embedded PDF viewer using Google Drive

'use client';

import React, { useState } from 'react';
import { Download, ExternalLink, Eye, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import {
    getDriveEmbedUrl,
    getDriveDownloadUrl,
    getDriveViewUrl,
    DriveResource
} from '@/lib/drive/googleDrive';
import { cn } from '@/lib/utils';

interface DrivePDFViewerProps {
    resource: DriveResource;
    height?: string;
    showControls?: boolean;
    className?: string;
}

export function DrivePDFViewer({
    resource,
    height = '600px',
    showControls = true,
    className,
}: DrivePDFViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const embedUrl = getDriveEmbedUrl(resource.fileId);
    const downloadUrl = getDriveDownloadUrl(resource.fileId);
    const viewUrl = getDriveViewUrl(resource.fileId);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={cn('bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden', className)}>
            {/* Header */}
            {showControls && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <FileText className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {resource.titleBn || resource.title}
                                </h3>
                                {resource.description && (
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {resource.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(viewUrl, '_blank')}
                                leftIcon={<Eye className="h-4 w-4" />}
                            >
                                <span className="hidden sm:inline">ফুল স্ক্রীন</span>
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => window.open(downloadUrl, '_blank')}
                                leftIcon={<Download className="h-4 w-4" />}
                            >
                                <span className="hidden sm:inline">ডাউনলোড</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Viewer */}
            <div className="relative" style={{ height }}>
                {/* Loading State */}
                {isLoading && !hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                PDF লোড হচ্ছে...
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <div className="text-center p-6">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                PDF লোড করতে সমস্যা হয়েছে
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                সরাসরি Google Drive এ দেখতে নিচের বাটনে ক্লিক করো
                            </p>
                            <Button
                                onClick={() => window.open(viewUrl, '_blank')}
                                leftIcon={<ExternalLink className="h-4 w-4" />}
                            >
                                Google Drive এ দেখো
                            </Button>
                        </div>
                    </div>
                )}

                {/* Iframe */}
                {!hasError && (
                    <iframe
                        src={embedUrl}
                        className="w-full h-full border-0"
                        onLoad={handleLoad}
                        onError={handleError}
                        allow="autoplay"
                        title={resource.title}
                    />
                )}
            </div>

            {/* Footer with tags */}
            {resource.tags && resource.tags.length > 0 && showControls && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple PDF embed (no controls)
export function DrivePDFEmbed({
    fileId,
    height = '500px',
    className,
}: {
    fileId: string;
    height?: string;
    className?: string;
}) {
    const embedUrl = getDriveEmbedUrl(fileId);

    return (
        <iframe
            src={embedUrl}
            className={cn('w-full border-0 rounded-lg', className)}
            style={{ height }}
            allow="autoplay"
            title="PDF Document"
        />
    );
}

// PDF Card for list view
export function DrivePDFCard({
    resource,
    onClick,
    className,
}: {
    resource: DriveResource;
    onClick?: () => void;
    className?: string;
}) {
    const downloadUrl = getDriveDownloadUrl(resource.fileId);

    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700',
                'hover:shadow-md transition-shadow cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            <div className="flex items-start gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {resource.titleBn || resource.title}
                    </h3>
                    {resource.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {resource.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                        {resource.type === 'pyq' && resource.year && (
                            <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                                {resource.year}
                            </span>
                        )}
                        <span className="text-xs text-gray-400">
                            {resource.type === 'pyq' ? 'PYQ' : resource.type === 'question' ? 'Questions' : resource.type}
                        </span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(downloadUrl, '_blank');
                    }}
                >
                    <Download className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default DrivePDFViewer;
