import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { projectsEndpoints } from 'shared/api';

export const createReportAsync = createAsyncThunk<
    projectsEndpoints.CreateReportResponse,
    projectsEndpoints.CreateReportBody
>(getActionPrefix('createReportAsync'), async (body) => {
    const data = await projectsEndpoints.createReport(body);
    return data;
});
