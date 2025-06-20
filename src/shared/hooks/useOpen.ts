import { useCallback, useState } from 'react';

export const useOpen = (initialState: boolean = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        close,
        open,
    };
};
