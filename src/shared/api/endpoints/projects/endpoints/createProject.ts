import { apiPost } from 'shared/api/methods';
import type { Project } from '../types';

export type CreateProjectResponse = Project;
export type CreateProjectBody = Project;

export const createProject = async (body: CreateProjectBody) => {
    const { data } = await apiPost<CreateProjectResponse, CreateProjectBody>(
        'api/v1/data/projects/',
        body
    );
    return data;
};
