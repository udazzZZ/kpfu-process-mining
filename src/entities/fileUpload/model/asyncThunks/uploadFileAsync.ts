import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPrefix } from "../../lib/utils";
import {
    type UploadFileRequest,
    type UploadFileResponse,
} from "shared/api/endpoints/file/types";
import { uploadFile } from "shared/api/endpoints/file";

export const uploadFileAsync = createAsyncThunk<
    UploadFileResponse,
    UploadFileRequest
>(getActionPrefix("uploadFileAsync"), async (body: UploadFileRequest) => {
    const data = await uploadFile(body);
    return data;
});
