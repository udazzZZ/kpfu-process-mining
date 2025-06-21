import React from "react";
import styles from "./ModelCard.module.css";
import type { Model } from "shared/api/endpoints/models";
import { useNavigate } from "react-router";

interface ModelCardProps {
    model: Model;
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
                <p className={styles.dateText}>{model.created_at}</p>
            </div>
            <div className={styles.name}>{model.name}</div>
        </div>
    );
};
