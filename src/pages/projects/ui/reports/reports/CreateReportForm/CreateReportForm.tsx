import type { FC } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { TextField } from 'shared/ui/fields';
import { BasicButton } from 'shared/ui/buttons';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { dataModelsModel } from 'entities/dataModels';
import { selectCurrentProjectId } from '../../../../model/selectors';

import styles from './CreateReportForm.module.css';
import { createReportAsync } from 'pages/projects/model/asyncThunks/createReportAsync';

type CreateReportFormProps = {
    onCreate?: () => void;
};

type ReportFormType = {
    name: string;
    description: string;
    modelId: number;
};

export const CreateReportForm: FC<CreateReportFormProps> = ({ onCreate }) => {
    const models = useAppSelector(dataModelsModel.selectors.selectModels);
    const currentProjectId = useAppSelector(selectCurrentProjectId);

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<ReportFormType>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<ReportFormType> = async ({
        name,
        description,
        modelId,
    }) => {
        try {
            await dispatch(
                createReportAsync({
                    name,
                    description,
                    project: currentProjectId,
                    model_data: modelId,
                })
            ).unwrap();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Ошибка входа:', error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
        }

        onCreate?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        isError={!!errors.name}
                        label="Название отчета"
                        placeholder="Введите название отчета"
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        isError={!!errors.description}
                        label="Описание отчета"
                        placeholder="Введите описание отчета"
                    />
                )}
            />

            <select className={styles.select} {...register('modelId')}>
                <option value="">Выберите модель...</option>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                ))}
            </select>

            <BasicButton type="submit" size="l">
                Создать
            </BasicButton>
        </form>
    );
};
