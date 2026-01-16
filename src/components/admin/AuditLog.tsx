'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    RefreshCw,
    FileText,
    TestTube,
    FileDown,
    Users,
    Settings,
    ChevronDown
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { AuditLogEntry } from '@/types/analytics';
import { sampleAuditLog } from '@/data/sampleAnalyticsData';
import { cn } from '@/lib/utils';

interface AuditLogProps {
    logs?: AuditLogEntry[];
    className?: string;
}

// Action colors
const actionColors = {
    Created: '#22C55E',
    Updated: '#3B82F6',
    Deleted: '#EF4444',
    Published: '#8B5CF6',
    Suspended: '#F59E0B',
};

// Target icons
const targetIcons = {
    question: FileText,
    test: TestTube,
    resource: FileDown,
    user: Users,
    settings: Settings,
};

function AuditLog({ logs = sampleAuditLog, className }: AuditLogProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAction, setFilterAction] = useState<string>('all');
    const [filterTarget, setFilterTarget] = useState<string>('all');

    // Filter logs
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.targetTitle?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAction = filterAction === 'all' || log.action === filterAction;
        const matchesTarget = filterTarget === 'all' || log.targetType === filterTarget;
        return matchesSearch && matchesAction && matchesTarget;
    });

    // Format time
    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Audit Log
                    </h2>
                    <p className="text-sm text-gray-500 font-bengali">অডিট লগ</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Export
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardBody>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by user or content..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                />
                            </div>
                        </div>

                        {/* Action Filter */}
                        <select
                            value={filterAction}
                            onChange={(e) => setFilterAction(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        >
                            <option value="all">All Actions</option>
                            <option value="Created">Created</option>
                            <option value="Updated">Updated</option>
                            <option value="Deleted">Deleted</option>
                            <option value="Published">Published</option>
                            <option value="Suspended">Suspended</option>
                        </select>

                        {/* Target Filter */}
                        <select
                            value={filterTarget}
                            onChange={(e) => setFilterTarget(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        >
                            <option value="all">All Types</option>
                            <option value="question">Questions</option>
                            <option value="test">Tests</option>
                            <option value="resource">Resources</option>
                            <option value="user">Users</option>
                            <option value="settings">Settings</option>
                        </select>
                    </div>
                </CardBody>
            </Card>

            {/* Log Table */}
            <Card>
                <CardBody className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                    <th className="p-4 text-left text-sm font-medium text-gray-500">Action</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-500">User</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-500">Target</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-500">Details</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-500">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => {
                                    const actionColor = actionColors[log.action as keyof typeof actionColors] || '#6B7280';
                                    const TargetIcon = targetIcons[log.targetType] || FileText;

                                    return (
                                        <tr
                                            key={log.id}
                                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            <td className="p-4">
                                                <Badge
                                                    size="sm"
                                                    style={{ backgroundColor: `${actionColor}20`, color: actionColor }}
                                                >
                                                    {log.action}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{log.userName}</p>
                                                    <p className="text-xs text-gray-500">{log.userRole}</p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <TargetIcon className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                        {log.targetType}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm text-gray-900 dark:text-white">{log.targetTitle}</p>
                                                {log.targetId && (
                                                    <p className="text-xs text-gray-400">ID: {log.targetId}</p>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {formatTime(log.timestamp)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredLogs.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No logs found</p>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {filteredLogs.length} of {logs.length} entries
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                </div>
            </div>
        </div>
    );
}

export default AuditLog;
