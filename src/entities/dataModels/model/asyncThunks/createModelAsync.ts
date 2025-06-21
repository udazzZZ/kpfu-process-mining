import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { modelsEndpoints } from 'shared/api';

export const createModelAsync = createAsyncThunk<
    modelsEndpoints.CreateModelResponse,
    modelsEndpoints.CreateModelBody
>(getActionPrefix('createModelAsync'), async (body) => {
    const data = await modelsEndpoints.createModel(body);

    return data;
});
