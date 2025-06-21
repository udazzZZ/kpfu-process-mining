import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';

import styles from './BasicButton.module.css';
import { stylesBySizes } from './BasicButton.constants';
import type { Size } from './BasicButton.types';

type BasicButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    PropsWithChildren & {
        size?: Size;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        className?: string;
    };

export const BasicButton: FC<BasicButtonProps> = ({
    children,
    onClick,
    className,
    size,
    ...props
}) => {
    return (
        <button
            className={clsx(styles.button, className)}
            style={size && stylesBySizes[size]}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
