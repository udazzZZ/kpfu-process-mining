import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../lib/config';
import type { projectsEndpoints } from 'shared/api';
import { getProjectsAsync } from './asyncThunks/getProjectsAsync';
import { createProjectsAsync } from './asyncThunks/createProjectAsync';

type State = {
    projects: projectsEndpoints.Project[];
};

const initialState: State = {
    projects: [],
};

export const projectsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getProjectsAsync.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.projects = payload;
        });

        addCase(createProjectsAsync.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.projects = [...state.projects, payload];
        });
    },
});

export const projectsReducer = projectsSlice.reducer;
