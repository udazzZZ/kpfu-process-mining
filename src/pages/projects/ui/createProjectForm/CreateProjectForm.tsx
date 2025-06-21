import { useState, type ChangeEventHandler, type FC } from 'react';
import { BasicButton } from 'shared/ui/buttons';
import { TextField } from 'shared/ui/fields';

import styles from './CreateProjectForm.module.css';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { createProjectAsync } from '../../model/asyncThunks/createProjectAsync';

type CreateProjectFormProps = {
    onCreate?: () => void;
};

export const CreateProjectForm: FC<CreateProjectFormProps> = ({ onCreate }) => {
    const dispatch = useAppDispatch();

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const onClick: React.MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        event.preventDefault();

        await dispatch(
            createProjectAsync({
                name: projectName,
                description: description,
            })
        ).unwrap();

        setProjectName('');
        setDescription('');

        onCreate?.();
    };

    const onChangeProjectName: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setProjectName(event.target.value);
    };

    const onChangeDescription: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setDescription(event.target.value);
    };

    return (
        <form className={styles.form}>
            <div className={styles.formInputs}>
                <TextField
                    label="Название проекта"
                    placeholder="Введите название проекта"
                    onChange={onChangeProjectName}
                    value={projectName}
                />
                <TextField
                    label="Описание"
                    placeholder="Введите описание"
                    onChange={onChangeDescription}
                    value={description}
                />
            </div>
            <BasicButton onClick={onClick} size="l">
                Создать
            </BasicButton>
        </form>
    );
};
