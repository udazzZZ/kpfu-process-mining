import { useEffect, useState } from 'react';

type UseMountedForAnimationType = {
    isOpen: boolean;
    animationDuration: number;
    getMounted?: (isMounted: boolean) => void;
};

export const useMountedForAnimation = ({
    isOpen,
    animationDuration,
    getMounted,
}: UseMountedForAnimationType) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen && !isMounted) {
            setIsMounted(true);
        }

        if (!isOpen && isMounted) {
            setTimeout(() => {
                setIsMounted(false);
                getMounted?.(false);
            }, animationDuration);
        }
    }, [isOpen]);

    return {
        isMounted,
    };
};
