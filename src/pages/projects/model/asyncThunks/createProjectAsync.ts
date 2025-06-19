import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { projectsEndpoints } from 'shared/api';

export const createProjectsAsync = createAsyncThunk<
    projectsEndpoints.CreateProjectResponse,
    projectsEndpoints.CreateProjectBody
>(getActionPrefix('createProjectAsync'), async (body) => {
    const data = await projectsEndpoints.createProject(body);
    return data;
});
