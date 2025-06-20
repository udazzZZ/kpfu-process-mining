import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../lib/config";
import { getModelsAsync } from "./asyncThunks/getModelsAsync";
import { createModelAsync } from "./asyncThunks/createModelAsync";
import type { ModelResponse } from "shared/api/endpoints/models/endpoints/getModels";

type State = {
    models: ModelResponse[];
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
            console.log(payload);
            state.models = payload;
        });

        addCase(createModelAsync.fulfilled, (state, { payload }) => {
            console.log(payload);
        });
    },
});

export const modelsReducer = modelsSlice.reducer;
