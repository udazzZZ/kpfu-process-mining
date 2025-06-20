import {
    setAccessToken,
    setRefreshToken,
} from 'shared/api/instance/instance.tokens';
import { createJwt } from '../../jwt';
import { apiGet } from 'shared/api/methods';
import { setUserInfo } from 'shared/utils/userUtils';

export type LoginBody = {
    username: string;
    password: string;
};

export type LoginResponse = {
    id: number;
} & LoginBody;

export const login = async (body: LoginBody) => {
    const {
        data: { access, refresh },
    } = await createJwt(body);

    setAccessToken(access);
    setRefreshToken(refresh);

    const { data } = await apiGet<LoginResponse>('/auth/users/me');

    setUserInfo(data);

    return data;
};
