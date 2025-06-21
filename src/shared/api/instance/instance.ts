import axios from 'axios';
import { interceptors } from './interceptors';

const getApiUrl = () => {
    return import.meta.env.VITE_API_URL;
};

const getHeaders = () => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    return headers;
};

const createInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        responseType: 'json',
        headers: getHeaders(),
        // paramsSerializer,
    });

    interceptors(instance);
    return instance;
};

export const instance = createInstance(getApiUrl());
