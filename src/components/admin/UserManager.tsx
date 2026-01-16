'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    UserCheck,
    UserX,
    Shield,
    Mail,
    Calendar
} from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Avatar, Modal } from '@/components/ui';
import { adminRoleConfig, AdminRole } from '@/types/admin';

interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: 'user' | AdminRole;
    status: 'active' | 'suspended' | 'pending';
    questionsAnswered: number;
    testsCompleted: number;
    createdAt: Date;
    lastLoginAt: Date;
}

interface UserManagerProps {
    users?: User[];
    onAdd?: () => void;
    onEdit?: (id: string) => void;
    onSuspend?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

// Sample users
const sampleUsers: User[] = [
    {
        id: 'u1', email: 'rahul@example.com', displayName: 'Rahul Das',
        role: 'user', status: 'active', questionsAnswered: 85, testsCompleted: 5,
        createdAt: new Date('2024-01-15'), lastLoginAt: new Date(Date.now() - 3600000)
    },
    {
        id: 'u2', email: 'priya@example.com', displayName: 'Priya Roy',
        role: 'user', status: 'active', questionsAnswered: 120, testsCompleted: 8,
        createdAt: new Date('2024-01-10'), lastLoginAt: new Date(Date.now() - 86400000)
    },
    {
        id: 'u3', email: 'amit@example.com', displayName: 'Amit Kumar',
        role: 'admin', status: 'active', questionsAnswered: 0, testsCompleted: 0,
        createdAt: new Date('2024-01-01'), lastLoginAt: new Date()
    },
    {
        id: 'u4', email: 'test@example.com', displayName: 'Test User',
        role: 'user', status: 'suspended', questionsAnswered: 10, testsCompleted: 1,
        createdAt: new Date('2024-01-05'), lastLoginAt: new Date(Date.now() - 604800000)
    },
];

const statusConfig = {
    active: { color: '#22C55E', icon: UserCheck, label: 'Active' },
    suspended: { color: '#EF4444', icon: UserX, label: 'Suspended' },
    pending: { color: '#F59E0B', icon: Mail, label: 'Pending' },
};

function UserManager({
    users = sampleUsers,
    onAdd,
    onEdit,
    onSuspend,
    onDelete,
    className
}: UserManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState<'suspend' | 'delete' | null>(null);
    const [actionId, setActionId] = useState<string | null>(null);

    // Filter users
    const filteredUsers = users.filter(u => {
        const matchesSearch = u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || u.role === filterRole;
        const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Format time ago
    const formatTimeAgo = (date: Date) => {
        const diff = Date.now() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const handleAction = (type: 'suspend' | 'delete', id: string) => {
        setActionType(type);
        setActionId(id);
        setShowActionModal(true);
    };

    const confirmAction = () => {
        if (actionId) {
            if (actionType === 'suspend') onSuspend?.(actionId);
            if (actionType === 'delete') onDelete?.(actionId);
        }
        setShowActionModal(false);
        setActionType(null);
        setActionId(null);
    };

    return (
        <Card className={className}>
            <CardHeader
                title="User Manager"
                subtitle="ব্যবহারকারী ব্যবস্থাপনা"
                icon={<span className="text-xl">👥</span>}
                action={
                    <Button onClick={onAdd} leftIcon={<Plus className="h-4 w-4" />}>
                        Add User
                    </Button>
                }
            />
            <CardBody>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                        <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                        <p className="text-xs text-gray-500">Total Users</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                        <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                        <p className="text-xs text-gray-500">Active</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                        <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'suspended').length}</p>
                        <p className="text-xs text-gray-500">Suspended</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                        <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role !== 'user').length}</p>
                        <p className="text-xs text-gray-500">Admins</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="p-3 text-left text-sm font-medium text-gray-500">User</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Role</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Activity</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Last Login</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => {
                                const status = statusConfig[user.status];
                                const StatusIcon = status.icon;
                                const roleConfig = user.role !== 'user' ? adminRoleConfig[user.role as AdminRole] : null;

                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    >
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar fallback={user.displayName[0]} size="sm" />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            {roleConfig ? (
                                                <Badge
                                                    size="sm"
                                                    style={{ backgroundColor: `${roleConfig.color}20`, color: roleConfig.color }}
                                                    className="flex items-center gap-1 w-fit"
                                                >
                                                    <Shield className="h-3 w-3" />
                                                    {roleConfig.label}
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" size="sm">User</Badge>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <Badge
                                                size="sm"
                                                style={{ backgroundColor: `${status.color}20`, color: status.color }}
                                                className="flex items-center gap-1 w-fit"
                                            >
                                                <StatusIcon className="h-3 w-3" />
                                                {status.label}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                                            {user.questionsAnswered} Q / {user.testsCompleted} T
                                        </td>
                                        <td className="p-3 text-sm text-gray-500">{formatTimeAgo(user.lastLoginAt)}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => onEdit?.(user.id)}
                                                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-500"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction('suspend', user.id)}
                                                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-yellow-500"
                                                >
                                                    {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleAction('delete', user.id)}
                                                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl">👥</span>
                        <p className="text-gray-500 mt-2">No users found</p>
                    </div>
                )}
            </CardBody>

            <Modal isOpen={showActionModal} onClose={() => setShowActionModal(false)} title={actionType === 'suspend' ? 'Suspend User' : 'Delete User'} size="sm">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {actionType === 'suspend' ? 'This user will be suspended and unable to access their account.' : 'This user will be permanently deleted.'}
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowActionModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmAction}>{actionType === 'suspend' ? 'Suspend' : 'Delete'}</Button>
                </div>
            </Modal>
        </Card>
    );
}

export default UserManager;
