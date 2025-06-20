import { apiPost } from 'shared/api/methods';
import type { Model } from '../types';

export type CreateModelBody = Omit<Model, 'id' | 'created_at' | 'processed_at'>;
export type CreateModelResponse = Model;

export const createModel = async (body: CreateModelBody) => {
    const { data } = await apiPost<CreateModelResponse, CreateModelBody>(
        'api/v1/data/datamodels/',
        body
    );

    return data;
};
