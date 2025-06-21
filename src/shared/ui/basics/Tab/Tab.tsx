import clsx from 'clsx';
import styles from './Tab.module.css';
import type { FC } from 'react';
import daw from 'public/daw.svg';

type TabProps = {
    onClick?: () => void;
    title: string;
    subtitle?: string;
    isActive?: boolean;
    isDone?: boolean;
};

export const Tab: FC<TabProps> = ({
    title,
    subtitle,
    isDone,
    isActive,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                styles.container,
                isActive && styles.containerActive,
                isDone && styles.containerDone
            )}
        >
            <div className={styles.containerColumn}>
                <p className={styles.title}>{title}</p>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {isDone && <img src={daw} alt="done" className={styles.daw} />}
        </div>
    );
};
