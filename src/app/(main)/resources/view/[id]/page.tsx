'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Share2,
    Star,
    Download
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { PDFViewer, PDFDownloadButton, PDFResourceCard } from '@/components/resources';
import { Button, Card, CardBody, Badge, Breadcrumb } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { PDFResource, pdfCategoryConfig, formatFileSize, formatDownloads } from '@/types';
import { getPDFResourceById, getPopularPDFResources } from '@/data';

export default function PDFViewerPage() {
    const params = useParams();
    const router = useRouter();
    const resourceId = params.id as string;

    const [resource, setResource] = useState<PDFResource | null>(null);
    const [relatedResources, setRelatedResources] = useState<PDFResource[]>([]);
    const [loading, setLoading] = useState(true);

    // Load resource
    useEffect(() => {
        setLoading(true);
        const foundResource = getPDFResourceById(resourceId);
        setResource(foundResource || null);

        // Get related resources
        const popular = getPopularPDFResources(4).filter(r => r.id !== resourceId);
        setRelatedResources(popular.slice(0, 3));

        setLoading(false);
    }, [resourceId]);

    // Handle download
    const handleDownload = (res: PDFResource) => {
        window.open(res.fileUrl, '_blank');
    };

    // Handle share
    const handleShare = async () => {
        if (navigator.share && resource) {
            try {
                await navigator.share({
                    title: resource.titleBn,
                    text: resource.descriptionBn || resource.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading resource..." />
            </MainLayout>
        );
    }

    // Not found
    if (!resource) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Resource not found"
                        description="এই রিসোর্স পাওয়া যায়নি।"
                        actionLabel="Back to Resources"
                        onAction={() => router.push('/resources')}
                    />
                </div>
            </MainLayout>
        );
    }

    const categoryInfo = pdfCategoryConfig[resource.category];

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Resources', labelBn: 'রিসোর্স', href: '/resources' },
        { label: categoryInfo.labelBn, href: '/resources' },
        { label: resource.titleBn.slice(0, 30) + '...' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge style={{ backgroundColor: categoryInfo.color, color: 'white' }}>
                                {categoryInfo.icon} {categoryInfo.labelBn}
                            </Badge>
                            {resource.isNew && <Badge variant="success">NEW</Badge>}
                            {resource.isPremium && <Badge variant="warning">Premium</Badge>}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {resource.titleBn}
                        </h1>
                        {resource.descriptionBn && (
                            <p className="text-gray-500 mt-1">{resource.descriptionBn}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            leftIcon={<Share2 className="h-4 w-4" />}
                        >
                            Share
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/resources')}
                            leftIcon={<ArrowLeft className="h-4 w-4" />}
                        >
                            Back
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* PDF Viewer */}
                    <div className="lg:col-span-3">
                        <PDFViewer
                            resource={resource}
                            onDownload={handleDownload}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Resource Info */}
                        <Card>
                            <CardBody>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Resource Details
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">File Size</span>
                                        <span className="font-medium">{formatFileSize(resource.fileSize)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Pages</span>
                                        <span className="font-medium">{resource.pageCount || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Format</span>
                                        <span className="font-medium uppercase">{resource.format}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Downloads</span>
                                        <span className="font-medium flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            {formatDownloads(resource.downloads)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Rating</span>
                                        <span className="font-medium flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                            {resource.rating} ({resource.ratingCount})
                                        </span>
                                    </div>
                                    {resource.author && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Author</span>
                                            <span className="font-medium">{resource.authorBn || resource.author}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <PDFDownloadButton
                                        resource={resource}
                                        onDownload={handleDownload}
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        {/* Related Resources */}
                        {relatedResources.length > 0 && (
                            <Card>
                                <CardBody>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                        Related Resources
                                    </h3>
                                    <div className="space-y-3">
                                        {relatedResources.map((res) => (
                                            <PDFResourceCard
                                                key={res.id}
                                                resource={res}
                                                variant="compact"
                                                onDownload={handleDownload}
                                            />
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
