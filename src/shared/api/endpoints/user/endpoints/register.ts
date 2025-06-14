import { apiPost } from "../../../methods";

export type RegisterBody = {
    email?: string;
    username: string;
    password: string;
};

export type RegisterResponse = {
    id: number;
} & RegisterBody;

export type RegisterPayload = {
    body: RegisterBody;
};

export const register = async ({ body }: RegisterPayload) =>
    await apiPost<RegisterResponse, RegisterBody>("/users", body);
