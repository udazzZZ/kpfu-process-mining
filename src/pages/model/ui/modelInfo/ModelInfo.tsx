import type { FC } from "react";
import editIcon from "public/edit-model-icon.svg";
import trashIcon from "public/trash-icon.svg";
import styles from "./ModelInfo.module.css";
import { useParams } from "react-router";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { selectModelById } from "entities/dataModels/model/selectors";

export const ModelInfo: FC = () => {
    const params = useParams();
    const model = useAppSelector(selectModelById(Number(params.model)));

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{model.name}</p>
                <img src={editIcon}></img>
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.subtitle}>Количество событий</p>
                <p className={styles.info}>0</p>
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.subtitle}>Количество процессов</p>
                <p className={styles.info}>0</p>
            </div>
            <button className={styles.button}>
                <img src={trashIcon}></img>
                <p className={styles.buttonText}>Очистить данные</p>
            </button>
        </div>
    );
};
