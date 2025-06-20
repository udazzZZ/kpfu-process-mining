/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createDiv } from './utils';

export type PortalType = {
    children: ReactNode;
    containerClassName?: string;
};

export const Portal: FC<PortalType> = ({ children, containerClassName }) => {
    const [container] = useState(() => createDiv(containerClassName));

    useEffect(() => {
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return createPortal(children, container);
};
