'use client';

import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface PDFViewerProps {
    driveFileId?: string;
    driveLink?: string;
    embedLink?: string;
    title?: string;
    className?: string;
    height?: string;
    showDownload?: boolean;
    showOpenInNew?: boolean;
}

function PDFViewer({
    driveFileId,
    driveLink,
    embedLink,
    title = 'PDF Document',
    className,
    height = '600px',
    showDownload = true,
    showOpenInNew = true,
}: PDFViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Generate embed URL from drive file ID or use provided embedLink
    const getEmbedUrl = () => {
        if (embedLink) return embedLink;
        if (driveFileId) {
            return `https://drive.google.com/file/d/${driveFileId}/preview`;
        }
        if (driveLink) {
            // Extract file ID from drive link
            const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        }
        return null;
    };

    // Get download URL
    const getDownloadUrl = () => {
        const fileId = driveFileId || driveLink?.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
        if (fileId) {
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return null;
    };

    // Get view URL (open in new tab)
    const getViewUrl = () => {
        if (driveLink) return driveLink;
        if (driveFileId) {
            return `https://drive.google.com/file/d/${driveFileId}/view`;
        }
        return null;
    };

    const embedUrl = getEmbedUrl();
    const downloadUrl = getDownloadUrl();
    const viewUrl = getViewUrl();

    if (!embedUrl) {
        return (
            <div className={cn(
                'flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-xl',
                className
            )}>
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                    PDF preview not available
                </p>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col', className)}>
            {/* Header with actions */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                </div>

                <div className="flex items-center gap-2">
                    {showDownload && downloadUrl && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(downloadUrl, '_blank')}
                            leftIcon={<Download className="h-4 w-4" />}
                        >
                            Download
                        </Button>
                    )}
                    {showOpenInNew && viewUrl && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(viewUrl, '_blank')}
                            leftIcon={<ExternalLink className="h-4 w-4" />}
                        >
                            Open
                        </Button>
                    )}
                </div>
            </div>

            {/* PDF Embed */}
            <div
                className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden"
                style={{ height }}
            >
                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <p className="text-sm text-gray-500">Loading PDF...</p>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                        <p className="text-gray-500 mb-4">Failed to load PDF</p>
                        <Button
                            variant="outline"
                            onClick={() => window.open(viewUrl || embedUrl, '_blank')}
                        >
                            Open in Google Drive
                        </Button>
                    </div>
                )}

                {/* Iframe */}
                <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    allow="autoplay"
                    title={title}
                />
            </div>
        </div>
    );
}

export default PDFViewer;
