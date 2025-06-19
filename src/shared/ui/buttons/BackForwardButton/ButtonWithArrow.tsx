import type { FC } from "react";
import type { Direction } from "./ButtonWithArrow.types";
import styles from "./ButtonWithArrow.module.css";
import leftArrow from "../../../../../public/left-arrow.svg";
import rightArrow from "../../../../../public/right-arrow.svg";
import clsx from "clsx";

export type ButtonWithArrowProps = {
    onClick: () => void;
    direction: Direction;
    disabled?: boolean;
    loading?: boolean;
};

export const ButtonWithArrow: FC<ButtonWithArrowProps> = ({
    onClick,
    direction,
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                direction === "left" ? styles.buttonBack : styles.buttonForward,
                disabled && styles.buttonDisabled,
                loading && styles.buttonLoading
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {direction === "left" ? (
                <p>Назад</p>
            ) : (
                <p className={styles.text}>
                    {loading ? "Сохранение..." : "Вперед"}
                </p>
            )}
            <img
                src={direction === "left" ? leftArrow : rightArrow}
                alt="arrow"
                className={loading ? styles.hiddenArrow : ""}
            />
            {loading && direction === "right" && (
                <span className={styles.loader}></span>
            )}
        </button>
    );
};
