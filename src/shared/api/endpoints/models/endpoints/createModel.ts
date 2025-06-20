import { apiPost } from "shared/api/methods";
import type { Model } from "../types";

export type CreateModelBody = Model;

export const createModel = async (body: CreateModelBody) => {
    const data = await apiPost<undefined, CreateModelBody>(
        "api/v1/data/datamodels/",
        body
    );
};
