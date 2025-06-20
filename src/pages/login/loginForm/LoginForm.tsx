import { type FC } from 'react';
// import { useForm } from 'react-hook-form';
import { TextField } from 'shared/ui/fields';

import styles from './LoginForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from 'shared/constants';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { userModel } from 'entities/user';

type LoginFormType = {
    username: string;
    password: string;
};

export const LoginForm: FC = () => {
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        mode: 'onChange',
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormType> = async ({
        username,
        password,
    }) => {
        try {
            await dispatch(
                userModel.thunks.loginUserAsync({ username, password })
            ).unwrap();

            navigate(ROUTES.PROJECTS_PATH);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Ошибка входа:', error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
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
                    Войти
                </BasicButton>
            </form>

            <div className={styles.links}>
                <Link to={`/${ROUTES.AUTH_PATH}/${ROUTES.REGISTER_PATH}`}>
                    Нужна помощь?
                </Link>
                <Link
                    to={`/${ROUTES.AUTH_PATH}/${ROUTES.REGISTER_PATH}`}
                    className={styles.linkBlue}
                >
                    Регистрация
                </Link>
            </div>
        </>
    );
};
