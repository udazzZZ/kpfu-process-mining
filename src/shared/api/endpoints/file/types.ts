export interface UploadFileRequest {
    file: File;
    modelId: string;
}

export type UploadFileResponse = {
    id: number;
    original_file_name: string;
    file_type: string;
    file_size: number;
    model_data: number;
    status?: string;
};

export type PreviewRequestBody = {
    rows: number;
};

export interface FilePreviewDataResponse {
    data: Array<
        Array<string | number> | Record<string, string | number | null>
    >;
    columns: string[];
    file_info: {
        id: number;
    };
    rows_count: number;
}

// Enum для типов колонок
export enum ColumnDataType {
    STRING = "string",
    DATETIME = "datetime",
    NUMBER = "number",
    BOOLEAN = "boolean",
}

// Enum для ролей колонок
export enum ColumnRole {
    CASE_ID = "case_id",
    TIMESTAMP = "timestamp",
    ACTIVITY = "activity",
    CASE_ATTRIBUTE = "case_attribute",
    EVENT_ATTRIBUTE = "event_attribute",
}

// Интерфейс для конфигурации одной колонки
export interface ColumnConfig {
    type: ColumnDataType;
    role?: ColumnRole;
    format?: string; // только для типа DATETIME
}

// Запрос на обновление конфигурации файла
export interface UpdateFileConfigRequest {
    columns_config: Record<string, ColumnConfig>;
}

// Ответ на обновление конфигурации файла
export interface UpdateFileConfigResponse {
    id: number;
    status: string;
    columns_config: Record<string, ColumnConfig>;
}
