import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectProjects } from '../../model/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getProjectsAsync } from '../../model/asyncThunks/getProjectsAsync';

import styles from './Projects.module.css';
import { CreateProjectForm } from '../createProjectForm/CreateProjectForm';
import { ProjectItem } from '../projectItem';
import Header from '../header';

const Projects = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjectsAsync());
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <CreateProjectForm />
                <div className={styles.container}>
                    {projects &&
                        projects.map((project) => (
                            <ProjectItem {...project} key={project.id} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default Projects;
