import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { userEndpoints } from 'shared/api';

export const loginUserAsync = createAsyncThunk<
    userEndpoints.LoginResponse,
    userEndpoints.LoginBody
>(getActionPrefix('loginUserAsync'), async (body, { rejectWithValue }) => {
    try {
        const data = await userEndpoints.login(body);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Произошла неизвестная ошибка');
    }
});
