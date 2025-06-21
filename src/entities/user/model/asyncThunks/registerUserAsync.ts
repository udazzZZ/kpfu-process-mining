import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { userEndpoints } from '../../../../shared/api';

export const registerUserAsync = createAsyncThunk<
    userEndpoints.RegisterResponse,
    userEndpoints.RegisterBody
>(getActionPrefix('registerUserAsync'), async (body, { rejectWithValue }) => {
    try {
        const data = await userEndpoints.register(body);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Произошла неизвестная ошибка');
    }
});
