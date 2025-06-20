import { type AxiosInstance } from 'axios';
import {
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken,
} from '../instance.tokens';

const BAD_UNAUTHORIZED_STATUS = 401;

type RefreshResponse = {
    access: string;
    refresh: string;
};

let isRefreshing = false;

let failedRequests: {
    reject: (error: unknown) => void;
    resolve: (token: string) => void;
}[] = [];

export const refreshTokenInterceptor = (instance: AxiosInstance) => {
    const refreshToken = async () => {
        try {
            const {
                data: { access: newAccessToken, refresh: newRefreshToken },
            } = await instance.post<RefreshResponse>('auth/jwt/refresh/', {
                refresh: getRefreshToken(),
            });

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            return { newAccessToken, newRefreshToken };
        } catch (e) {
            console.error('Unable to refresh token:', e);

            removeAccessToken();
            removeRefreshToken();
        }
    };
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response.status === BAD_UNAUTHORIZED_STATUS &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return await new Promise((resolve, reject) => {
                        failedRequests.push({ resolve, reject });
                    })
                        .then(async (newAccessToken) => {
                            originalRequest.headers.Authorization = `Bearer ${
                                newAccessToken as string
                            }`;
                            return await instance(originalRequest);
                        })
                        .catch(async (err) => {
                            return await Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshResponse = await refreshToken();
                    if (refreshResponse) {
                        const { newAccessToken } = refreshResponse;
                        isRefreshing = false;

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        const retryResponse = await instance(originalRequest);

                        failedRequests.forEach((request) => {
                            request.resolve(newAccessToken);
                        });
                        failedRequests = [];

                        return retryResponse;
                    }
                } catch (refreshError) {
                    failedRequests.forEach((request) => {
                        request.reject(refreshError);
                    });
                    failedRequests = [];
                    isRefreshing = false;
                    return await Promise.reject(refreshError);
                }
            }

            return await Promise.reject(error);
        }
    );
};
