import type { FC, PropsWithChildren } from 'react';

import styles from './AuthPanel.module.css';
import logoImg from '../../../../../public/logo.svg';

export const AuthPanel: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.container}>
            <img src={logoImg} />
            {children}
        </div>
    );
};
