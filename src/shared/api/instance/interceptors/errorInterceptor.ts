import type { AxiosInstance } from 'axios';

export const errorInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            let responseError =
                error.response?.data?.error || error.response?.data;

            if (!responseError) {
                responseError = {
                    message: 'Произошла ошибка в системе',
                };
            }

            return await Promise.reject(responseError);
        }
    );
};
