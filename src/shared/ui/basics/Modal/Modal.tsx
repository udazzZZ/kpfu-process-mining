import type { FC, ReactNode } from 'react';
import { DEFAULT_Z_INDEX_CONTENT_IN_PORTAL } from '../Portal/constants';
import { ANIMATION_DURATION } from './constants';
import { Portal } from '../Portal';
import { Layout } from './layout/Layout';
import { useMountedForAnimation } from 'shared/hooks/useMountedForAnimation';

export type ModalType = {
    className?: string;
    fallbackClassName?: string;
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean;
    width?: string | number;
    zIndexContentInPortal?: number;
    isShowCloseButton?: boolean;
};

export const Modal: FC<ModalType> = ({
    isOpen,
    className,
    fallbackClassName,
    onClose,
    width = '440px',
    children,
    zIndexContentInPortal = DEFAULT_Z_INDEX_CONTENT_IN_PORTAL,
    isShowCloseButton,
}) => {
    const { isMounted } = useMountedForAnimation({
        isOpen,
        animationDuration: ANIMATION_DURATION,
    });

    if (!isMounted) {
        return null;
    }

    return (
        <Portal>
            <Layout
                onClose={onClose}
                isOpen={isOpen}
                className={className}
                fallbackClassName={fallbackClassName}
                width={width}
                zIndexContentInPortal={zIndexContentInPortal}
                isShowCloseButton={isShowCloseButton}
            >
                {children}
            </Layout>
        </Portal>
    );
};
