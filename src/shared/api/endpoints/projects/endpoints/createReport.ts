import { apiPost } from 'shared/api/methods';
import type { DataReport } from '../types';

export type CreateReportBody = Omit<
    DataReport,
    'id' | 'created_at' | 'updated'
>;

export type CreateReportResponse = DataReport;

export const createReport = async (body: CreateReportBody) => {
    const { data } = await apiPost<CreateReportResponse, CreateReportBody>(
        'api/v1/data/reports/',
        body
    );
    return data;
};
