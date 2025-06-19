import typr { RootState } from "app/store"

export const selectState = (state: RootState) => state.dataModelsReducer;

export const selectDataModels = (state: RootState) => selectState(state).dataModels;