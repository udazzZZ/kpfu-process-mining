import type { FC } from "react";
import editIcon from "public/edit-model-icon.svg";
import trashIcon from "public/trash-icon.svg";
import styles from "./ModelInfo.module.css";

export const ModelInfo: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Новая модель</p>
                <img src={editIcon}></img>
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.subtitle}>Количество событий</p>
                <p className={styles.info}>839</p>
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.subtitle}>Количество процессов</p>
                <p className={styles.info}>13600</p>
            </div>
            <button className={styles.button}>
                <img src={trashIcon}></img>
                <p className={styles.buttonText}>Очистить данные</p>
            </button>
        </div>
    );
};
