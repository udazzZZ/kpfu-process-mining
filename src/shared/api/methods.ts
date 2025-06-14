import type { RequestWithDataType, RequestWithoutDataType } from "./api.types";
import { instance } from "./instance/instance";

export const apiPost: RequestWithDataType = instance.post;

export const apiGet: RequestWithoutDataType = instance.get;

export const apiPatch: RequestWithDataType = instance.patch;

export const apiPut: RequestWithDataType = instance.put;

export const apiDelete: RequestWithoutDataType = instance.delete;
