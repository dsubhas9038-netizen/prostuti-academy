'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    ZoomIn,
    ZoomOut,
    RotateCw,
    Maximize,
    Minimize,
    Download,
    ChevronLeft,
    ChevronRight,
    FileText,
    ExternalLink,
    Loader2
} from 'lucide-react';
import { PDFResource } from '@/types';
import { Card, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PDFViewerProps {
    resource: PDFResource;
    showToolbar?: boolean;
    showSidebar?: boolean;
    initialPage?: number;
    onDownload?: (resource: PDFResource) => void;
    onClose?: () => void;
    className?: string;
}

function PDFViewer({
    resource,
    showToolbar = true,
    showSidebar = false,
    initialPage = 1,
    onDownload,
    onClose,
    className,
}: PDFViewerProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(resource.pageCount || 1);
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Handle zoom
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
    const handleZoomReset = () => setZoom(100);

    // Handle rotation
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    // Handle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement && containerRef.current) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Handle page navigation
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [resource.id]);

    // Open in external viewer (Google Drive)
    const openExternal = () => {
        window.open(resource.fileUrl, '_blank');
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'flex flex-col bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden',
                isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]',
                className
            )}
        >
            {/* Toolbar */}
            {showToolbar && (
                <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    {/* Left: Title */}
                    <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[200px]">
                                {resource.titleBn}
                            </h3>
                            <p className="text-xs text-gray-500">
                                Page {currentPage} of {totalPages}
                            </p>
                        </div>
                    </div>

                    {/* Center: Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                                min={1}
                                max={totalPages}
                                className="w-12 text-center text-sm py-1 border border-gray-300 dark:border-gray-600 rounded"
                            />
                            <span className="text-sm text-gray-500">/ {totalPages}</span>
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Right: Tools */}
                    <div className="flex items-center gap-1">
                        {/* Zoom Controls */}
                        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-2">
                            <button
                                onClick={handleZoomOut}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Zoom Out"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleZoomReset}
                                className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {zoom}%
                            </button>
                            <button
                                onClick={handleZoomIn}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Zoom In"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Rotate */}
                        <button
                            onClick={handleRotate}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Rotate"
                        >
                            <RotateCw className="h-4 w-4" />
                        </button>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        >
                            {isFullscreen ? (
                                <Minimize className="h-4 w-4" />
                            ) : (
                                <Maximize className="h-4 w-4" />
                            )}
                        </button>

                        {/* Open External */}
                        <button
                            onClick={openExternal}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Open in New Tab"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </button>

                        {/* Download */}
                        <Button
                            size="sm"
                            onClick={() => onDownload?.(resource)}
                            leftIcon={<Download className="h-4 w-4" />}
                        >
                            Download
                        </Button>
                    </div>
                </div>
            )}

            {/* PDF Content Area */}
            <div className="flex-1 overflow-auto p-4">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
                        <p className="text-gray-500">Loading PDF...</p>
                    </div>
                ) : error ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <FileText className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            Could not load PDF
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{error}</p>
                        <Button variant="outline" onClick={openExternal}>
                            Open in Browser
                        </Button>
                    </div>
                ) : (
                    <div
                        className="flex justify-center"
                        style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
                    >
                        {/* PDF Placeholder - In real implementation, use PDF.js or iframe */}
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
                            <div className="text-center space-y-4">
                                <FileText className="h-20 w-20 text-blue-500 mx-auto" />
                                <h2 className="text-xl font-bold text-gray-900">
                                    {resource.titleBn}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {resource.descriptionBn || resource.description}
                                </p>
                                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                    <Badge variant="secondary">{resource.pageCount} pages</Badge>
                                    <Badge variant="secondary">{resource.format.toUpperCase()}</Badge>
                                </div>
                                <div className="pt-4">
                                    <Button onClick={openExternal} leftIcon={<ExternalLink className="h-4 w-4" />}>
                                        Open PDF in Google Drive
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PDFViewer;
