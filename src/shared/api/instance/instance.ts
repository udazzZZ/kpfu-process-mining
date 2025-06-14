import axios from "axios";
import { interceptors } from "./instance.utils";

const createInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        // paramsSerializer,
    });
    interceptors(instance);
    return instance;
};

const BASE_URL = "";

export const instance = createInstance(BASE_URL);
