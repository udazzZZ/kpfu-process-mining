import { createSlice } from '@reduxjs/toolkit';
import type { modelsEndpoints } from 'shared/api';
import { SLICE_NAME } from '../lib/config';
import { getModelsAsync } from './asyncThunks/getModelsAsync';
import { createModelAsync } from './asyncThunks/createModelAsync';

type State = {
    models: modelsEndpoints.Model[];
};

const initialState: State = {
    models: [],
};

export const modelsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getModelsAsync.fulfilled, (state, { payload }) => {
            state.models = payload;
        });

        addCase(createModelAsync.fulfilled, (state, { payload }) => {
            state.models = [...state.models, payload];
        });
    },
});

export const modelsReducer = modelsSlice.reducer;
