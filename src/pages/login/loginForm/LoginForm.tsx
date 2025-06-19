import { useState, type ChangeEventHandler, type FC } from 'react';
// import { useForm } from 'react-hook-form';
import { TextField } from 'shared/ui/fields';

import styles from './LoginForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from 'shared/constants';
import { userEndpoints } from 'shared/api';

export const LoginForm: FC = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const onClick: React.MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        event.preventDefault();

        try {
            await userEndpoints.login({
                body: {
                    username,
                    password,
                },
            });

            navigate(ROUTES.PROJECTS_PATH);
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };

    const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };

    return (
        <>
            <form className={styles.form}>
                <div className={styles.formInputs}>
                    <TextField
                        label="Ваше имя"
                        placeholder="Введите ваше имя"
                        onChange={onChangeUsername}
                        value={username}
                    />
                    <TextField
                        label="Пароль"
                        placeholder="Введите ваш пароль"
                        onChange={onChangePassword}
                        value={password}
                    />
                </div>
                <BasicButton onClick={onClick} size="l">
                    Войти
                </BasicButton>
            </form>
            <div className={styles.links}>
                <Link to={`${ROUTES.AUTH_PATH}/${ROUTES.REGISTER_PATH}`}>
                    Нужна помощь?
                </Link>
                <Link
                    to={`${ROUTES.AUTH_PATH}/${ROUTES.REGISTER_PATH}`}
                    className={styles.linkBlue}
                >
                    Регистрация
                </Link>
            </div>
        </>
    );
};
