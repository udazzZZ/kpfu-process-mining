import type { RootState } from 'app/store';

const selectState = (state: RootState) => state.projectsReducer;

export const selectProjects = (state: RootState) => selectState(state).projects;

export const selectCurrentProjectId = (state: RootState) =>
    selectState(state).currentProjectId;

export const selectProjectsById = (state: RootState) =>
    selectState(state).projectsById;

export const selectProjectById = (id: number) => (state: RootState) =>
    selectState(state).projectsById[id];

export const selectDataReports = (state: RootState) =>
    selectState(state).reports;
