import { useEffect, useState } from 'react';

export const useAnimationIn = (isOpen: boolean) => {
    const [animationIn, setAnimationIn] = useState(false);

    useEffect(() => {
        setAnimationIn(isOpen);
    }, [isOpen]);

    return { animationIn };
};
