import type { RootState } from 'app/store';

const selectState = (state: RootState) => state.modelsReducer;

export const selectModels = (state: RootState) => selectState(state).models;

export const selectModelsById = (state: RootState) =>
    selectState(state).modelsById;

export const selectModelById = (id: number) => (state: RootState) =>
    selectModelsById(state)[id];
