import React from "react";
import styles from "./Models.module.css";
import { ModelCard } from "./ModelCard";
import { CreateModelButton } from "./CreateModelButton";

type Model = {
    name: string;
    id: string;
};

interface ModelsProps {
    models: Model[];
    isLoading: boolean;
    onCardClick: (id: string) => void;
    onCreateClick: () => void;
}

export const Models: React.FC<ModelsProps> = ({
    models,
    isLoading,
    onCardClick,
    onCreateClick,
}) => {
    if (isLoading) {
        return <div className={styles.loading}>Загрузка моделей…</div>;
    }

    return (
        <div className={styles.grid}>
            <CreateModelButton onClick={onCreateClick} />
            {models.map((item) => (
                <ModelCard
                    key={item.id}
                    model={item}
                    onClick={() => onCardClick(item.id)}
                />
            ))}
        </div>
    );
};
