import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import { createModel, type CreateModelBody } from "shared/api/endpoints/models";

export const createModelAsync = createAsyncThunk<
    Promise<void>,
    CreateModelBody
>(getActionPrefix("createModelAsync"), async (body) => {
    const data = await createModel({
        name: body.name,
        description: body.description,
    });
    return data;
});
