import { useState, type ChangeEventHandler, type FC } from 'react';
// import { useForm } from 'react-hook-form';
import { TextField } from 'shared/ui/fields';

import styles from './RegisterForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { ROUTES } from 'shared/constants';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { userModel } from 'entities/user';

export const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        try {
            dispatch(
                userModel.thunks.registerUserAsync({
                    username,
                    email,
                    password,
                })
            );

            navigate(ROUTES.PROJECTS_PATH);
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    };

    const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            <form className={styles.form}>
                <div className={styles.formInputs}>
                    <TextField
                        label="Ваше имя"
                        placeholder="Введите ваше имя"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <TextField
                        label="Email"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <TextField
                        label="Пароль"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <BasicButton onClick={onClick} size="l">
                    Регистрация
                </BasicButton>
            </form>

            <div className={styles.links}>
                <Link to={`${ROUTES.AUTH_PATH}/${ROUTES.LOGIN_PATH}`}>
                    Нужна помощь?
                </Link>
                <Link
                    to={`${ROUTES.AUTH_PATH}/${ROUTES.LOGIN_PATH}`}
                    className={styles.linkBlue}
                >
                    Войти
                </Link>
            </div>
        </>
    );
};
