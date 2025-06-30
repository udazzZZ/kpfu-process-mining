import { apiPatch } from "shared/api/methods";
import type {
    UpdateFileConfigRequest,
    UpdateFileConfigResponse,
} from "../types";

export const updateFileConfig = async (
    fileId: number,
    data: UpdateFileConfigRequest
): Promise<UpdateFileConfigResponse> => {
    const response = await apiPatch<UpdateFileConfigResponse>(
        `api/v1/data/filemetadata/${fileId}/`,
        data
    );

    return response.data;
};
