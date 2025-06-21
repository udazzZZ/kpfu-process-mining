import type { FC } from 'react';
import styles from './CreateCardButton.module.css';

type CreateCardButtonProps = {
    onClick: () => void;
};

export const CreateCardButton: FC<CreateCardButtonProps> = ({ onClick }) => (
    <button
        type="button"
        aria-label="Создать новую модель"
        className={styles.button}
        onClick={onClick}
    >
        +
    </button>
);
