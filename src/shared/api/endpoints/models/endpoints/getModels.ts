import { apiGet } from 'shared/api/methods';
import type { Model } from '../types';

export const getModels = async () => {
    const { data } = await apiGet<Model[]>('api/v1/data/datamodels/');
    return data;
};
