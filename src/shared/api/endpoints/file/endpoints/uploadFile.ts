import { apiPost } from "shared/api/methods";
import type { UploadFileRequest, UploadFileResponse } from "../types";

export const uploadFile = async ({
    file,
    modelId,
}: UploadFileRequest): Promise<UploadFileResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_data", modelId);

    const response = await apiPost<UploadFileResponse>(
        "api/v1/data/filemetadata/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
