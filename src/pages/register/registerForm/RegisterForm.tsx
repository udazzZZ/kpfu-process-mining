import { type FC } from 'react';
import { TextField } from 'shared/ui/fields';

import styles from './RegisterForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { ROUTES } from 'shared/constants';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { userModel } from 'entities/user';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

type RegisterFormType = {
    username: string;
    email: string;
    password: string;
};

export const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormType>({
        mode: 'onChange',
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        try {
            await dispatch(userModel.thunks.registerUserAsync(data)).unwrap();

            navigate(`${ROUTES.PROJECTS_PATH}`);
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formInputs}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                isError={!!errors.username}
                                label="Ваше имя"
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                isError={!!errors.email}
                                label="Email"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                isError={!!errors.password}
                                label="Пароль"
                            />
                        )}
                    />
                </div>
                <BasicButton type="submit" size="l">
                    Регистрация
                </BasicButton>
            </form>

            <div className={styles.links}>
                <Link to={`/${ROUTES.AUTH_PATH}/${ROUTES.LOGIN_PATH}`}>
                    Нужна помощь?
                </Link>
                <Link
                    to={`/${ROUTES.AUTH_PATH}/${ROUTES.LOGIN_PATH}`}
                    className={styles.linkBlue}
                >
                    Войти
                </Link>
            </div>
        </>
    );
};
