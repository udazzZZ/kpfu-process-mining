import React, { useEffect, useState, type ChangeEventHandler } from 'react';
import styles from './Models.module.css';
import { ModelCard } from '../modelCard/ModelCard';
import { CreateModelButton } from '../createModelButton/CreateModelButton';
import { Modal } from 'shared/ui/basics/Modal';
import { useOpen } from 'shared/hooks/useOpen';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { dataModelsModel } from 'entities/dataModels';

interface ModelsProps {
    isLoading: boolean;
}

export const Models: React.FC<ModelsProps> = ({ isLoading }) => {
    const [modelName, setModelName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useAppDispatch();

    const models = useAppSelector(dataModelsModel.selectors.selectModels);

    useEffect(() => {
        dispatch(dataModelsModel.thunks.getModelsAsync());
    }, [dispatch]);

    const { open, close, isOpen } = useOpen();

    const onCreateModelClick = () => {
        open();
    };

    const onSubmitModelForm = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        await dispatch(
            dataModelsModel.thunks.createModelAsync({
                name: modelName,
                description: description,
            })
        ).unwrap();

        close();

        setModelName('');
        setDescription('');
    };

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
        setModelName(event.target.value);
    };

    const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        setDescription(event.target.value);
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка моделей…</div>;
    }

    return (
        <div className={styles.grid}>
            <CreateModelButton onClick={onCreateModelClick} />
            <Modal isOpen={isOpen} onClose={close} width={386}>
                <form className={styles.modal} onSubmit={onSubmitModelForm}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Название модели</label>
                        <input
                            type="text"
                            placeholder="Новая модель"
                            className={styles.input}
                            onChange={onChangeName}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Описание модели</label>
                        <textarea
                            placeholder="Описание"
                            className={styles.textarea}
                            onChange={onChangeDescription}
                        />
                    </div>

                    <button className={styles.button}>Создать</button>
                </form>
            </Modal>

            {models.map((item) => (
                <ModelCard key={item.id} model={item} />
            ))}
        </div>
    );
};
