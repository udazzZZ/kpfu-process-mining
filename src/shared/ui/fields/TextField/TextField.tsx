import type { FC } from 'react';

import styles from './TextField.module.css';
import clsx from 'clsx';

type TextFieldProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label?: string;
    isError?: boolean;
};

export const TextField: FC<TextFieldProps> = ({
    label,
    onChange,
    isError,
    ...props
}) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label>{label}</label>}
            <input
                onChange={onChange}
                className={clsx(styles.input, {
                    [styles.isError]: isError,
                })}
                type="text"
                {...props}
            />
        </div>
    );
};
