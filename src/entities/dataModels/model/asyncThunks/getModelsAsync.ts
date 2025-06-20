import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { modelsEndpoints } from 'shared/api';

export const getModelsAsync = createAsyncThunk<modelsEndpoints.Model[]>(
    getActionPrefix('getModelsAsync'),
    async () => {
        const data = await modelsEndpoints.getModels();
        return data;
    }
);
