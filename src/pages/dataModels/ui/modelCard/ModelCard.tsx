import React from "react";
import styles from "./ModelCard.module.css";
import type { ModelResponse } from "shared/api/endpoints/models/endpoints/getModels";
import { useNavigate } from "react-router";

interface ModelCardProps {
    model: ModelResponse;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
    const navigate = useNavigate();

    const onCardClick = (id: string) => {
        navigate(`/models/${id}`);
    };

    return (
        <div
            className={styles.card}
            onClick={() => onCardClick(model.id)}
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
