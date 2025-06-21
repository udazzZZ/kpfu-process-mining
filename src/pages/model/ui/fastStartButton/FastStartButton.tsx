import type { FC } from "react";
import styles from "./FastStartButton.module.css";
import startButton from "public/start-button.svg";
import { useNavigate, useParams } from "react-router";
import { type MouseEvent } from "react";

export const FastStartButton: FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const onButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/models/${params.model}/import/journal`);
    };

    return (
        <div className={styles.container}>
            <img src={startButton} className={styles.image}></img>
            <div className={styles.text}>
                <p className={styles.title}>Быстрый старт</p>
                <p className={styles.subtitle}>
                    Загрузить логи в формате CSV или XLSX и начать работу
                </p>
            </div>
            <button onClick={onButtonClickHandler} className={styles.button}>
                <p className={styles.buttonText}>Начать</p>
            </button>
        </div>
    );
};
