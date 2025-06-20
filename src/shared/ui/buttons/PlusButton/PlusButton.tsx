import type { FC } from 'react';

import styles from './PlusButton.module.css';

type PlusButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    onClick: () => void;
};

export const PlusButton: FC<PlusButtonProps> = ({ onClick }) => {
    const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
        onClick();
    };

    return (
        <button className={styles.button} onClick={onClickHandler}>
            +
        </button>
    );
};
