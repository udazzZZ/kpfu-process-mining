import type { AxiosInstance } from 'axios';
import { getAccessToken } from '../instance.tokens';

export const accessTokenInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
};
