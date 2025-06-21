import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { projectsEndpoints } from 'shared/api';

export const fetchReportsAsync = createAsyncThunk<
    projectsEndpoints.DataReport[],
    projectsEndpoints.FetchReportsPayload
>(getActionPrefix('fetchReportsAsync'), async ({ projectId }) => {
    const data = await projectsEndpoints.fetchReports({ projectId });
    return data;
});
