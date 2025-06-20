import { type FC, type MouseEventHandler, useRef } from 'react';
import type { ModalType } from '../Modal';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

import styles from './Layout.module.scss';
import { ANIMATION_DURATION } from '../constants';
import { useAnimationIn } from 'shared/hooks/useAnimationIn';

export const Layout: FC<ModalType> = ({
    children,
    isOpen,
    onClose,
    width,
    fallbackClassName,
    className,
    zIndexContentInPortal,
}) => {
    const { animationIn } = useAnimationIn(isOpen);

    const nodeRef = useRef(null);

    const stopPropagation: MouseEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation();
    };

    return (
        <div
            style={{ zIndex: zIndexContentInPortal }}
            className={styles.container}
        >
            <CSSTransition
                onClick={stopPropagation}
                in={animationIn}
                timeout={ANIMATION_DURATION}
                nodeRef={nodeRef}
                classNames={{
                    enterActive: styles.modal__enter,
                    enterDone: styles.modal__enter_done,
                    exitActive: styles.modal__exit,
                }}
                unmountOnExit
            >
                <div ref={nodeRef} className={styles.modal}>
                    <div
                        className={clsx(styles.content, className)}
                        style={{ width }}
                    >
                        {children}
                    </div>
                    <div
                        className={clsx(styles.fallback, fallbackClassName)}
                        onClick={onClose}
                    />
                </div>
            </CSSTransition>
        </div>
    );
};
