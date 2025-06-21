import { apiPost } from 'shared/api/methods';

type CreateJwtBody = {
    username: string;
    password: string;
};

type CreateJwtResponse = {
    access: string;
    refresh: string;
};

export const createJwt = async (body: CreateJwtBody) =>
    await apiPost<CreateJwtResponse, CreateJwtBody>('/auth/jwt/create/', body);
