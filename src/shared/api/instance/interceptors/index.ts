import type { AxiosInstance } from 'axios';
import { accessTokenInterceptor } from './accessTokenInterceptor';
import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import { errorInterceptor } from './errorInterceptor';

export const interceptors = (instance: AxiosInstance) => {
    accessTokenInterceptor(instance);
    refreshTokenInterceptor(instance);
    errorInterceptor(instance);
};
