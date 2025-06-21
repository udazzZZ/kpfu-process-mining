import { apiGet } from "shared/api/methods";
import type { PreviewRequestBody } from "../types";
import type { FilePreviewDataResponse } from "../types";

export const getFilePreview = async (id: string | number) => {
    const { data } = await apiGet<FilePreviewDataResponse, PreviewRequestBody>(
        `api/v1/data/filemetadata/${id}/preview-data/`
    );
    return data;
};
