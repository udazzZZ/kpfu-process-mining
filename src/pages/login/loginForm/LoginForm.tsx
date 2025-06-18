import { useState, type ChangeEventHandler, type FC } from 'react';
// import { useForm } from 'react-hook-form';
import { TextField } from 'shared/ui/fields';

import styles from './LoginForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { Link } from 'react-router';
import { ROUTES } from 'shared/constants';

export const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const onClick = () => {};

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    };

    const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };

    return (
        <>
            <form className={styles.form}>
                <div className={styles.formInputs}>
                    <TextField
                        label="Email"
                        placeholder="Введите ваш email"
                        onChange={onChangeEmail}
                        value={email}
                    />
                    <TextField
                        label="Пароль"
                        placeholder="Введите ваш пароль"
                        onChange={onChangeUsername}
                        value={username}
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
