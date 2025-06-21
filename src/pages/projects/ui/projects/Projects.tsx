import styles from './Projects.module.css';
import { ProjectsPanel } from '../projectsPanel/ProjectsPanel';
import { Reports } from '../reports/reports/Reports';

const Projects = () => {
    return (
        <div className={styles.wrapper}>
            <ProjectsPanel />
            <Reports />
        </div>
    );
};

export default Projects;
