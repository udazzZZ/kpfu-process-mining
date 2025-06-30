import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import {
    type UpdateFileConfigRequest,
    type UpdateFileConfigResponse,
} from "shared/api/endpoints/file/types";
import { updateFileConfig } from "shared/api/endpoints/file";

type UpdateFileConfigAsyncProps = {
    fileId: number;
    data: UpdateFileConfigRequest;
};

export const updateFileConfigAsync = createAsyncThunk<
    UpdateFileConfigResponse,
    UpdateFileConfigAsyncProps
>(
    getActionPrefix("updateFileConfigAsync"),
    async ({ fileId, data }: UpdateFileConfigAsyncProps) => {
        const response = await updateFileConfig(fileId, data);
        return response;
    }
);
