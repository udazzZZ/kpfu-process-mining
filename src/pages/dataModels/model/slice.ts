import { createSlice } from "@reduxjs/toolkit";
import type { dataModelEndpoints } from "shared/api";
import { SLICE_NAME } from "./lib/config";
import { getDataModelsAsync } from "./asyncThunks/getDataModelsAsyns";

type State = {
    dataModels: dataModelEndpoints.DataModel[];
};

const initialState: State = {
    dataModels: [],
};

export const dataModelsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getDataModelsAsync.fulfilled, (state, { payload }) => {
            state.dataModels = payload;
        });
    },
});

export const dataModelsReducer = dataModelsSlice.reducer;
