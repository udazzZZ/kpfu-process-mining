import { apiPost } from "shared/api/methods";
import type { UploadFileRequest } from "../types";

export const uploadFile = async ({
    file,
    modelId,
}: UploadFileRequest): Promise<undefined> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_data", modelId);

    const data  = await apiPost(
        "api/v1/data/filemetadata/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};
