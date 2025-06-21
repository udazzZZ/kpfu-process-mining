import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../lib/config';
import { registerUserAsync } from './asyncThunks/registerUserAsync';
import { loginUserAsync } from './asyncThunks/loginUserAsync';

type State = {
    userId: number;
    username: string;
    email: string | undefined;
};

const initialState: State = {
    userId: -1,
    username: '',
    email: '',
};

export const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(registerUserAsync.fulfilled, (state, { payload }) => {
            state.username = payload.username;
            state.email = payload.email;
            state.userId = payload.id;
        });

        addCase(loginUserAsync.fulfilled, (state, { payload }) => {
            state.username = payload.username;
            state.userId = payload.id;
        });
    },
});

export const userReducer = userSlice.reducer;
