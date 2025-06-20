import { useEffect } from 'react';
import styles from './ProjectsPanel.module.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import {
    selectCurrentProjectId,
    selectProjects,
} from 'pages/projects/model/selectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getProjectsAsync } from 'pages/projects/model/asyncThunks/getProjectsAsync';
import { Tab } from 'shared/ui/basics';
import Header from 'shared/ui/header/Header';
import { setCurrentProjectId } from 'pages/projects/model/actions';
import { CurrentProjectInfo } from '../currentProjectInfo/CurrentProjectInfo';

export const ProjectsPanel = () => {
    const dispatch = useAppDispatch();
    const currentProjectId = useAppSelector(selectCurrentProjectId);
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjectsAsync());
    }, []);

    const selectProjectHandle = (id: number) => () => {
        dispatch(setCurrentProjectId(id));
    };

    return (
        <div className={styles.container}>
            <Header containerClassName={styles.headerContainer} />

            <CurrentProjectInfo currentProjectId={currentProjectId} />

            <div>
                {projects.map((project) => (
                    <Tab
                        title={project.name}
                        key={project.id}
                        isActive={project.id === currentProjectId}
                        onClick={selectProjectHandle(project.id)}
                    />
                ))}
            </div>
        </div>
    );
};
