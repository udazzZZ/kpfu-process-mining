import {
    setAccessToken,
    setRefreshToken,
} from 'shared/api/instance/instance.tokens';
import { apiPost } from '../../../methods';
import { createJwt } from '../../jwt/endpoints/createJwt';

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

export const register = async ({ body }: RegisterPayload) => {
    const {
        data,
        data: { username, password },
    } = await apiPost<RegisterResponse, RegisterBody>('auth/users/', body);

    const {
        data: { access, refresh },
    } = await createJwt({ username, password });

    setAccessToken(access);
    setRefreshToken(refresh);

    return data;
};
