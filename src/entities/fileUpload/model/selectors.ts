import type { RootState } from "app/store";

export const selectFile = (state: RootState) => state.fileReducer.currentFile;

export const selectFileId = (state: RootState) => state.fileReducer.id;

export const selectColumnsConfig = (state: RootState) =>
    state.fileReducer.columnsConfig;

export const selectFileStatus = (state: RootState) => state.fileReducer.status;

export const selectIsConfigSaving = (state: RootState) =>
    state.fileReducer.isConfigSaving;

export const selectConfigSaveError = (state: RootState) =>
    state.fileReducer.configSaveError;
