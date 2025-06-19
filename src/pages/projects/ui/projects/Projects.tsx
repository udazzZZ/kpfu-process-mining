import { useAppSelector } from "shared/hooks/useAppSelector";
import { selectProjects } from "../../model/selectors";
import { useEffect } from "react";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { getProjectsAsync } from "../../model/asyncThunks/getProjectsAsync";

import styles from "./Projects.module.css";
import { CreateProjectForm } from "../createProjectForm/CreateProjectForm";
import { ProjectItem } from "../projectItem";

const Projects = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjectsAsync());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <CreateProjectForm />
            <div className="">
                {projects &&
                    projects.map((project) => (
                        <ProjectItem {...project} key={project.name} />
                    ))}
            </div>
        </div>
    );
};

export default Projects;
