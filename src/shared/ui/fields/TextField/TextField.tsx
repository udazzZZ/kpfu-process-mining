import type { FC } from 'react';

import styles from './TextField.module.css';

type TextFieldProps = {
    className?: string;
    label?: string;
    placeholder?: string;
};

export const TextField: FC<TextFieldProps> = ({ placeholder, label }) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label>{label}</label>}
            <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
            />
        </div>
    );
};
