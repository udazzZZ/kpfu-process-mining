import { apiGet } from 'shared/api/methods';
import type { DataReport } from '../types';

export type FetchReportsPayload = {
    projectId: number;
};

export const fetchReports = async ({ projectId }: FetchReportsPayload) => {
    const { data } = await apiGet<DataReport[]>(
        `api/v1/data/reports/?project_id=${projectId}`
    );

    return data;
};
