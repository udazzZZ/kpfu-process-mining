import React from "react";
import styles from "./Models.module.css";
import { ModelCard } from "../modelCard/ModelCard";
import { CreateModelButton } from "../createModelButton/CreateModelButton";
import { Modal } from "shared/ui/basics/Modal";
import { useOpen } from "shared/hooks/useOpen";

type Model = {
    name: string;
    id: string;
};

interface ModelsProps {
    models: Model[];
    isLoading: boolean;
    onCardClick: (id: string) => void;
}

export const Models: React.FC<ModelsProps> = ({
    models,
    isLoading,
    onCardClick,
}) => {
    const { open, close, isOpen } = useOpen();

    const onCreateModelClick = () => {
        open();
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка моделей…</div>;
    }

    return (
        <div className={styles.grid}>
            <CreateModelButton onClick={onCreateModelClick} />
            <Modal isOpen={isOpen} onClose={close} width={386}>
                <div className={styles.modal}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Название модели</label>
                        <input
                            type="text"
                            placeholder="Новая модель"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Описание модели</label>
                        <textarea
                            placeholder="Описание"
                            className={styles.textarea}
                        />
                    </div>

                    <button className={styles.button}>Создать</button>
                </div>
            </Modal>

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
