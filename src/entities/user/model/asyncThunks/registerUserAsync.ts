import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionPrefix } from '../../lib/utils';
import { userEndpoints } from '../../../../shared/api';

export const registerUserAsync = createAsyncThunk<
    userEndpoints.RegisterResponse,
    userEndpoints.RegisterBody
>(
    getActionPrefix('registerUserAsync'),
    async ({ email, username, password }) => {
        const data = await userEndpoints.register({
            body: {
                email,
                username,
                password,
            },
        });
        return { ...data };
    }
);
