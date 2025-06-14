/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestWithDataType = <Response = any, Data = any, Params = any>(
    url: string,
    data?: Data,
    config?: Omit<AxiosRequestConfig<Data>, 'params'> & { params?: Params }
) => Promise<AxiosResponse<Response, Data>>;

export type RequestWithoutDataType = <Response = any, Data = any, Params = any>(
    url: string,
    config?: Omit<AxiosRequestConfig<Data>, 'params'> & { params?: Params }
) => Promise<AxiosResponse<Response, Data>>;
