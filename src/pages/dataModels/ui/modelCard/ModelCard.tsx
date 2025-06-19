import React from "react";
import styles from "./ModelCard.module.css";

type Model = {
    name: string;
    id: string;
};

interface ModelCardProps {
    model: Model;
    onClick: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
    return (
        <div
            className={styles.card}
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className={styles.date}>
                <p className={styles.dateText}>Дата изменения</p>
            </div>
            <div className={styles.name}>{model.name}</div>
        </div>
    );
};
