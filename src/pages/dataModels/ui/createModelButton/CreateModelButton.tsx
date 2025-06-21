import React from 'react';
import styles from './CreateModelButton.module.css';

interface CreateModelButtonProps {
    onClick: () => void;
}

export const CreateModelButton: React.FC<CreateModelButtonProps> = ({
    onClick,
}) => (
    <button
        type="button"
        aria-label="Создать новую модель"
        className={styles.button}
        onClick={onClick}
    >
        +
    </button>
);
