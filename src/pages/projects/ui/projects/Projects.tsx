import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectProjects } from '../../model/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getProjectsAsync } from '../../model/asyncThunks/getProjectsAsync';

import styles from './Projects.module.css';
import { CreateProjectForm } from '../createProjectForm/CreateProjectForm';
import { ProjectItem } from '../projectItem/ProjectItem';
import Header from 'shared/ui/header/Header';

const Projects = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjectsAsync());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.contentContainer}>
                <CreateProjectForm />
                <div className={styles.container}>
                    {projects &&
                        projects.map((project) => (
                            <ProjectItem {...project} key={project.id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
