import type { RootState } from 'app/store';

const selectState = (state: RootState) => state.projectsReducer;

export const selectProjects = (state: RootState) => selectState(state).projects;
