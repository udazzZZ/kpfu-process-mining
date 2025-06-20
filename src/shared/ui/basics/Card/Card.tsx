import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    onClick: () => void;
    title: string;
    subtitle: string;
}

export const Card: React.FC<CardProps> = ({ onClick, title, subtitle }) => {
    return (
        <div
            className={styles.card}
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className={styles.date}>
                <p className={styles.dateText}>{subtitle}</p>
            </div>
            <div className={styles.name}>{title}</div>
        </div>
    );
};
