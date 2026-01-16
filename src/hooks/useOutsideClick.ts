'use client';

import { RefObject, useEffect } from 'react';

export function useOutsideClick(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void,
    enabled: boolean = true
): void {
    useEffect(() => {
        if (!enabled) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, enabled]);
}

export default useOutsideClick;
