'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const modalSizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-[95vw] h-[90vh]',
};

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: keyof typeof modalSizes;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

function Modal({
    isOpen,
    onClose,
    title,
    description,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    children,
    footer,
    className,
}: ModalProps) {
    // Handle escape key
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeOnEscape) {
                onClose();
            }
        },
        [closeOnEscape, onClose]
    );

    // Add/remove escape listener
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={closeOnOverlayClick ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Modal content */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                aria-describedby={description ? 'modal-description' : undefined}
                className={cn(
                    'relative w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl',
                    'animate-scale-in',
                    'flex flex-col max-h-[90vh]',
                    modalSizes[size],
                    className
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            {title && (
                                <h2
                                    id="modal-title"
                                    className="text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    id="modal-description"
                                    className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                                >
                                    {description}
                                </p>
                            )}
                        </div>

                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

// Confirm Dialog Component
export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false,
}: ConfirmDialogProps) {
    const confirmButtonClasses = {
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        info: 'bg-blue-500 hover:bg-blue-600 text-white',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-gray-600 dark:text-gray-400">{message}</p>

            <div className="flex items-center justify-end gap-2 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50',
                        confirmButtonClasses[variant]
                    )}
                >
                    {isLoading ? 'Loading...' : confirmText}
                </button>
            </div>
        </Modal>
    );
}

export { Modal, ConfirmDialog, modalSizes };
