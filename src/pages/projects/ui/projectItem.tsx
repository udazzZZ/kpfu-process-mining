import type { FC } from 'react';
import type { projectsEndpoints } from 'shared/api';

type ProjectItemProps = projectsEndpoints.Project;

export const ProjectItem: FC<ProjectItemProps> = ({ name, description }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
};
