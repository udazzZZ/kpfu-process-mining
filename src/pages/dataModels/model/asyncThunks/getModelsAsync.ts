import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import { getModels, type ModelResponse } from "shared/api/endpoints/models/endpoints/getModels";

export const getModelsAsync = createAsyncThunk<ModelResponse[]>(
    getActionPrefix("getModelsAsync"),
    async () => {
        const data = await getModels();
        return data;
    }
);
