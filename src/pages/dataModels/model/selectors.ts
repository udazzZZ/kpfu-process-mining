import type { RootState } from 'app/store';

const selectState = (state: RootState) => state.modelsReducer;

export const selectModels = (state: RootState) => selectState(state).models;