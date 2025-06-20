import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../lib/config';
import type { projectsEndpoints } from 'shared/api';
import { getProjectsAsync } from './asyncThunks/getProjectsAsync';
import { createProjectAsync } from './asyncThunks/createProjectAsync';
import { setCurrentProjectId } from './actions';
import { fetchReportsAsync } from './asyncThunks/fetchReportsAsync';
import { createReportAsync } from './asyncThunks/createReportAsync';

type State = {
    projects: projectsEndpoints.Project[];
    reports: projectsEndpoints.DataReport[];
    currentProjectId: number;
    projectsById: Record<number, projectsEndpoints.Project>;
};

const initialState: State = {
    projects: [],
    reports: [],
    currentProjectId: -1,
    projectsById: {},
};

export const projectsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getProjectsAsync.fulfilled, (state, { payload: projects }) => {
            state.projects = projects;

            state.projectsById = projects.reduce((prev, current) => {
                return { ...prev, [current.id]: current };
            }, {});

            if (projects.length) {
                state.currentProjectId = projects[0].id;
            }
        });

        addCase(createProjectAsync.fulfilled, (state, { payload }) => {
            state.projects.push(payload);
            state.projectsById = {
                ...state.projectsById,
                [payload.id]: payload,
            };
        });

        addCase(setCurrentProjectId, (state, { payload }) => {
            state.currentProjectId = payload;
        });

        addCase(fetchReportsAsync.fulfilled, (state, { payload }) => {
            state.reports = payload;
        });

        addCase(createReportAsync.fulfilled, (state, { payload }) => {
            state.reports.push(payload);
        });
    },
});

export const projectsReducer = projectsSlice.reducer;
