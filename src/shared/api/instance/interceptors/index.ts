import type { AxiosInstance } from 'axios';
import { accessTokenInterceptor } from './accessTokenInterceptor';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';

export const interceptors = (instance: AxiosInstance) => {
    accessTokenInterceptor(instance);
    refreshTokenInterceptor(instance);
};
