import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import type { FilePreviewDataResponse } from "shared/api/endpoints/file/types";
import { getFilePreview } from "shared/api/endpoints/file";

type getFileAsyncProps = {
    id: string | number;
    rows?: number;
};

export const getFilePreviewAsync = createAsyncThunk<
    FilePreviewDataResponse,
    getFileAsyncProps
>(getActionPrefix("getFilePreviewAsync"), async (body: getFileAsyncProps) => {
    const data = await getFilePreview(body.id);
    return data;
});
