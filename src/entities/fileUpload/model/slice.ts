import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../lib/config";
import type {
    ColumnConfig,
    ColumnDataType,
    ColumnRole,
    FilePreviewDataResponse,
    UpdateFileConfigResponse,
    UploadFileResponse,
} from "shared/api/endpoints/file/types";
import { getFilePreviewAsync } from "./asyncThunks/getFilePreviewAsync";
import { uploadFileAsync } from "./asyncThunks/uploadFileAsync";
import { updateFileConfigAsync } from "./asyncThunks/updateFileConfigAsync";
import { saveFileConfigAsync } from "./asyncThunks/saveFileConfigAsync";

type State = {
    id: number | null;
    currentFile: FilePreviewDataResponse;
    columnsConfig: Record<string, ColumnConfig>;
    status: string | null;
    isConfigSaving: boolean;
    configSaveError: string | null;
};

const initialState: State = {
    id: null,
    currentFile: {
        data: [],
        columns: [],
        file_info: {
            id: -1,
        },
        rows_count: -1,
    },
    columnsConfig: {},
    status: null,
    isConfigSaving: false,
    configSaveError: null,
};

export const fileSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        setColumnType: (
            state,
            {
                payload,
            }: { payload: { columnName: string; type: ColumnDataType } }
        ) => {
            const { columnName, type } = payload;
            state.columnsConfig[columnName] = {
                ...(state.columnsConfig[columnName] || {}),
                type,
            } as ColumnConfig;
        },
        setColumnRole: (
            state,
            { payload }: { payload: { columnName: string; role: ColumnRole } }
        ) => {
            const { columnName, role } = payload;
            state.columnsConfig[columnName] = {
                ...(state.columnsConfig[columnName] || {}),
                role,
            } as ColumnConfig;
        },
        setColumnFormat: (
            state,
            { payload }: { payload: { columnName: string; format: string } }
        ) => {
            const { columnName, format } = payload;
            state.columnsConfig[columnName] = {
                ...(state.columnsConfig[columnName] || {}),
                format,
            } as ColumnConfig;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(getFilePreviewAsync.fulfilled, (state, { payload }) => {
            state.currentFile = payload;
        });

        addCase(uploadFileAsync.fulfilled, (state, { payload }) => {
            state.id = payload?.id;
            state.status = payload?.status || "UPLOADED";
        });

        addCase(updateFileConfigAsync.pending, (state) => {
            state.isConfigSaving = true;
            state.configSaveError = null;
        });

        addCase(updateFileConfigAsync.fulfilled, (state, { payload }) => {
            state.isConfigSaving = false;
            state.status = payload.status;
        });

        addCase(updateFileConfigAsync.rejected, (state, action) => {
            state.isConfigSaving = false;
            state.configSaveError =
                action.error.message || "Failed to save configuration";
        });

        addCase(saveFileConfigAsync.pending, (state) => {
            state.isConfigSaving = true;
            state.configSaveError = null;
        });

        addCase(saveFileConfigAsync.fulfilled, (state, { payload }) => {
            state.isConfigSaving = false;
            state.status = payload.status;
        });

        addCase(saveFileConfigAsync.rejected, (state, action) => {
            state.isConfigSaving = false;
            state.configSaveError =
                action.error.message || "Failed to save configuration";
        });
    },
});

export const { setColumnType, setColumnRole, setColumnFormat } =
    fileSlice.actions;
export const fileReducer = fileSlice.reducer;
