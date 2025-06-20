import type { FC } from "react";
import type { projectsEndpoints } from "shared/api";
import styles from "./ProjectItem.module.css";

type ProjectItemProps = projectsEndpoints.Project;

export const ProjectItem: FC<ProjectItemProps> = ({ name, description }) => {
    return (
        <div
            className={styles.card}
            role="button"
            tabIndex={0}
        >
            <div className={styles.date}>
                <p className={styles.dateText}>Дата изменения</p>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.description}>{description}</div>
        </div>
    );
};
