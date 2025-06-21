import type { FC } from 'react';

import styles from './Authorization.module.css';
import { Outlet } from 'react-router';
import { AuthPanel } from '../authPanel/AuthPanel';
import processMiningPattern from '../../../../../public/process-mining-pattern.jpg';

const Authorization: FC = () => {
    return (
        <div className={styles.container}>
            <AuthPanel>
                <Outlet />
            </AuthPanel>
            <img className={styles.background} src={processMiningPattern} />
        </div>
    );
};

export default Authorization;
