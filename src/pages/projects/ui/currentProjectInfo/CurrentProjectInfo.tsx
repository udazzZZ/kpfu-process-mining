import styles from './CurrentProjectInfo.module.css';
import type { FC } from 'react';
import { CreateProjectButton } from '../createProjectButton/CreateProjectButton';

type CurrentProjectInfoProps = {
    currentProjectId: number;
};

export const CurrentProjectInfo: FC<CurrentProjectInfoProps> = ({
    currentProjectId,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Проекты</p>
                <CreateProjectButton currentProjectId={currentProjectId} />
            </div>
        </div>
    );
};
