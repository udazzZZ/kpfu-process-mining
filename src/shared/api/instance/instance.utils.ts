import type { AxiosInstance } from "axios";
import { getAccessToken } from "./instance.tokens";

const accessTokenInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
};

export const interceptors = (instance: AxiosInstance) => {
    accessTokenInterceptor(instance);
};
