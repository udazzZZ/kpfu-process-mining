import styles from './CurrentProjectInfo.module.css';
import type { FC } from 'react';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectProjectById } from 'pages/projects/model/selectors';
import { CreateProjectButton } from '../createProjectButton/CreateProjectButton';

type CurrentProjectInfoProps = {
    currentProjectId: number;
};

export const CurrentProjectInfo: FC<CurrentProjectInfoProps> = ({
    currentProjectId,
}) => {
    const currentProject = useAppSelector(selectProjectById(currentProjectId));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>{currentProject?.name}</p>
                <CreateProjectButton currentProjectId={currentProjectId} />
            </div>
        </div>
    );
};
