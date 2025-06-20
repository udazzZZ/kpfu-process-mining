import { createSlice } from '@reduxjs/toolkit';
import type { modelsEndpoints } from 'shared/api';
import { SLICE_NAME } from '../lib/config';
import { getModelsAsync } from './asyncThunks/getModelsAsync';
import { createModelAsync } from './asyncThunks/createModelAsync';

type State = {
    models: modelsEndpoints.Model[];
    modelsById: Record<number, modelsEndpoints.Model>;
};

const initialState: State = {
    models: [],
    modelsById: {},
};

export const modelsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getModelsAsync.fulfilled, (state, { payload }) => {
            state.models = payload;
            state.modelsById = payload.reduce((prev, current) => {
                return { ...prev, [current.id]: current };
            }, {});
        });

        addCase(createModelAsync.fulfilled, (state, { payload }) => {
            state.models = [...state.models, payload];
            state.modelsById = {
                ...state.modelsById,
                [payload.id]: payload,
            };
        });
    },
});

export const modelsReducer = modelsSlice.reducer;
