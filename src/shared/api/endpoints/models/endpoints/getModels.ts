import { apiGet } from "shared/api/methods";
import type { Model } from "../types";

export type ModelResponse = Model & {
    id: string;
    created_at: string;
    processed_at: string;
};

export const getModels = async () => {
    const { data } = await apiGet<ModelResponse[]>("api/v1/data/datamodels/");
    return data;
};
