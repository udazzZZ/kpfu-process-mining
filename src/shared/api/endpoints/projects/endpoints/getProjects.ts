import { apiGet } from 'shared/api/methods';
import type { Project } from '../types';

export const getProjects = async () => {
    const { data } = await apiGet<Project[]>('api/v1/data/projects/');
    return data;
};
