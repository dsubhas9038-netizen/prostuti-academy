'use client';

import React, { useState } from 'react';
import {
    Download,
    Check,
    Loader2,
    Crown,
    Lock
} from 'lucide-react';
import { PDFResource, formatFileSize } from '@/types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PDFDownloadButtonProps {
    resource: PDFResource;
    variant?: 'default' | 'compact' | 'icon';
    onDownload?: (resource: PDFResource) => Promise<void> | void;
    className?: string;
}

function PDFDownloadButton({
    resource,
    variant = 'default',
    onDownload,
    className,
}: PDFDownloadButtonProps) {
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const isPremiumLocked = resource.isPremium && !resource.isFree;

    // Handle download
    const handleDownload = async () => {
        if (downloading || isPremiumLocked) return;

        setDownloading(true);
        try {
            // Call custom handler if provided
            if (onDownload) {
                await onDownload(resource);
            } else {
                // Default: open in new tab
                window.open(resource.fileUrl, '_blank');
            }
            setDownloaded(true);

            // Reset downloaded state after 3 seconds
            setTimeout(() => setDownloaded(false), 3000);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setDownloading(false);
        }
    };

    // Get button content
    const getButtonContent = () => {
        if (downloading) {
            return (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {variant !== 'icon' && <span>Downloading...</span>}
                </>
            );
        }

        if (downloaded) {
            return (
                <>
                    <Check className="h-4 w-4" />
                    {variant !== 'icon' && <span>Downloaded!</span>}
                </>
            );
        }

        if (isPremiumLocked) {
            return (
                <>
                    <Lock className="h-4 w-4" />
                    {variant !== 'icon' && (
                        <span className="flex items-center gap-1">
                            <Crown className="h-3 w-3" />
                            Premium
                        </span>
                    )}
                </>
            );
        }

        return (
            <>
                <Download className="h-4 w-4" />
                {variant === 'default' && (
                    <span>Download ({formatFileSize(resource.fileSize)})</span>
                )}
                {variant === 'compact' && <span>Download</span>}
            </>
        );
    };

    // Get button variant style
    const getButtonVariant = () => {
        if (downloaded) return 'success';
        if (isPremiumLocked) return 'warning';
        return 'primary';
    };

    // Icon-only variant
    if (variant === 'icon') {
        return (
            <button
                onClick={handleDownload}
                disabled={downloading || isPremiumLocked}
                className={cn(
                    'p-2 rounded-lg transition-all',
                    downloading && 'cursor-wait',
                    isPremiumLocked && 'cursor-not-allowed opacity-75',
                    downloaded
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600',
                    className
                )}
                title={isPremiumLocked ? 'Premium Content' : 'Download'}
            >
                {getButtonContent()}
            </button>
        );
    }

    // Button variants
    return (
        <Button
            onClick={handleDownload}
            disabled={downloading}
            variant={downloaded ? 'outline' : 'primary'}
            size={variant === 'compact' ? 'sm' : 'md'}
            className={cn(
                'gap-2',
                downloaded && 'text-green-600 border-green-600',
                isPremiumLocked && 'bg-yellow-500 hover:bg-yellow-600',
                className
            )}
        >
            {getButtonContent()}
        </Button>
    );
}

export default PDFDownloadButton;
