import type { FC } from 'react';
import leftArrow from 'public/left-arrow.svg';

import styles from './BackIconButton.module.css';

type BackIconButtonProps = {
    onClick: () => void;
};

export const BackIconButton: FC<BackIconButtonProps> = ({ onClick }) => {
    const onClickHandle: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();

        onClick();
    };

    return (
        <button className={styles.button} onClick={onClickHandle}>
            <img src={leftArrow} alt="" />
        </button>
    );
};
