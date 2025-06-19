import {
    setAccessToken,
    setRefreshToken,
} from 'shared/api/instance/instance.tokens';
import { createJwt } from '../../jwt';
import { apiGet } from 'shared/api/methods';

export type LoginBody = {
    username: string;
    password: string;
};

export type LoginResponse = {
    id: number;
} & LoginBody;

export type LoginPayload = {
    body: LoginBody;
};

export const login = async ({ body }: LoginPayload) => {
    const {
        data: { access, refresh },
    } = await createJwt(body);

    setAccessToken(access);
    setRefreshToken(refresh);

    const { data } = await apiGet<LoginResponse>('/auth/users/me');

    return data;
};
