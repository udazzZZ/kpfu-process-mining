import type { FC } from "react";
import type { Direction } from "./ButtonWithArrow.types";
import styles from "./ButtonWithArrow.module.css";
import leftArrow from "../../../../../public/left-arrow.svg";
import rightArrow from "../../../../../public/right-arrow.svg";
import clsx from "clsx";

type ButtonWithArrowProps = {
    onClick: () => void;
    direction: Direction;
};

export const ButtonWithArrow: FC<ButtonWithArrowProps> = ({
    onClick,
    direction,
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                direction === "left" ? styles.buttonBack : styles.buttonForward
            )}
            onClick={onClick}
        >
            {direction === "left" ? (
                <p>Назад</p>
            ) : (
                <p className={styles.text}>Вперед</p>
            )}
            <img
                src={direction === "left" ? leftArrow : rightArrow}
                alt="arrow"
            />
        </button>
    );
};
