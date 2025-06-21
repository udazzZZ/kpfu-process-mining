import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import {
    ColumnDataType,
    ColumnRole,
    type UpdateFileConfigRequest,
    type UpdateFileConfigResponse,
} from "shared/api/endpoints/file/types";
import { updateFileConfig } from "shared/api/endpoints/file";
import { store } from "app/store/store";

type SaveFileConfigAsyncProps = {
    fileId: number;
};

export const saveFileConfigAsync = createAsyncThunk<
    UpdateFileConfigResponse,
    SaveFileConfigAsyncProps
>(
    getActionPrefix("saveFileConfigAsync"),
    async ({ fileId }: SaveFileConfigAsyncProps, { rejectWithValue }) => {
        try {
            // Get the current state from Redux
            const state = store.getState();
            const columnsConfig = state.fileReducer.columnsConfig;
            const file = state.fileReducer.currentFile;

            // Проверяем наличие обязательных ролей
            const hasCaseId = Object.values(columnsConfig).some(
                (config) => config.role === ColumnRole.CASE_ID
            );
            const hasActivity = Object.values(columnsConfig).some(
                (config) => config.role === ColumnRole.ACTIVITY
            );
            const hasTimestamp = Object.values(columnsConfig).some(
                (config) => config.role === ColumnRole.TIMESTAMP
            );

            if (!hasCaseId || !hasActivity || !hasTimestamp) {
                return rejectWithValue(
                    "Необходимо указать как минимум идентификатор экземпляра (case_id), имя события (activity) и временную метку (timestamp)."
                );
            }

            // Create payload for API request
            const requestData: UpdateFileConfigRequest = {
                columns_config: {},
            };

            // Convert our state structure to the API format
            for (const columnName in columnsConfig) {
                if (columnsConfig[columnName]) {
                    requestData.columns_config[columnName] = {
                        type: columnsConfig[columnName].type,
                    };

                    // Add role if exists
                    if (columnsConfig[columnName].role) {
                        requestData.columns_config[columnName].role =
                            columnsConfig[columnName].role;
                    } else {
                        // Если роль не указана, устанавливаем по умолчанию EVENT_ATTRIBUTE
                        requestData.columns_config[columnName].role =
                            ColumnRole.EVENT_ATTRIBUTE;
                    }

                    // Add format if exists and type is DATETIME
                    if (
                        columnsConfig[columnName].type ===
                            ColumnDataType.DATETIME &&
                        columnsConfig[columnName].format
                    ) {
                        requestData.columns_config[columnName].format =
                            columnsConfig[columnName].format;
                    } else if (
                        columnsConfig[columnName].type ===
                        ColumnDataType.DATETIME
                    ) {
                        // Если формат не указан для даты, устанавливаем по умолчанию
                        requestData.columns_config[columnName].format =
                            "%Y-%m-%d %H:%M:%S";
                    }
                }
            }

            // Send the request
            const response = await updateFileConfig(fileId, requestData);
            return response;
        } catch (error) {
            console.error("Error saving file config:", error);
            return rejectWithValue(
                error instanceof Error ? error.message : "Неизвестная ошибка"
            );
        }
    }
);
