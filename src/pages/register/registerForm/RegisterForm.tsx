import type { FC } from 'react';
// import { useForm } from 'react-hook-form';
import { TextField } from 'shared/ui/fields';

import styles from './RegisterForm.module.css';
import { BasicButton } from 'shared/ui/buttons';
import { ROUTES } from 'shared/constants';
import { Link } from 'react-router';

export const RegisterForm: FC = () => {
    // const { register } = useForm();

    const onClick = () => {};

    return (
        <>
            <form className={styles.form}>
                <div className={styles.formInputs}>
                    <TextField
                        label="Ваше имя"
                        placeholder="Введите ваше имя"
                    />
                    <TextField label="Email" placeholder="Введите ваш email" />
                    <TextField
                        label="Пароль"
                        placeholder="Введите ваш пароль"
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
