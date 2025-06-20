import { useState, type ChangeEventHandler, type FC } from "react";
import { projectsEndpoints } from "shared/api";
import { BasicButton } from "shared/ui/buttons";
import { TextField } from "shared/ui/fields";

import styles from "./CreateProjectForm.module.css";

export const CreateProjectForm: FC = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const onClick: React.MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        event.preventDefault();

        setProjectName("");
        setDescription("");

        await projectsEndpoints.createProject({
            name: projectName,
            description: description,
        });
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
