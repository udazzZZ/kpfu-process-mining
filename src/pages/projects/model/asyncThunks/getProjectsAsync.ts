import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { projectsEndpoints } from 'shared/api';

export const getProjectsAsync = createAsyncThunk<projectsEndpoints.Project[]>(
    getActionPrefix('getProjectsAsync'),
    async () => {
        const data = await projectsEndpoints.getProjects();
        return data;
    }
);
