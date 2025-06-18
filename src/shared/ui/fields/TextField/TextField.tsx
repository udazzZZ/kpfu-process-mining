import type { ChangeEventHandler, FC } from 'react';

import styles from './TextField.module.css';

type TextFieldProps = {
    className?: string;
    label?: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value?: string;
};

export const TextField: FC<TextFieldProps> = ({
    placeholder,
    label,
    onChange,
    value,
}) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label>{label}</label>}
            <input
                onChange={onChange}
                className={styles.input}
                type="text"
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
};
