import { createAsyncThunk } from "@reduxjs/toolkit";
import { dataModelEndpoints} from "../../../../shared/api";
import { getActionPrefix } from "../lib/utils";

export const getDataModelsAsync = 
createAsyncThunk<dataModelEndpoints.GetDataModelsResponse>(
    getActionPrefix("getDataModelsAsync"),
    async () => {
        const { data } = await dataModelEndpoints.getDataModels();
        return data;
    }
);
