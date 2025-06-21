import { loginUserAsync } from './model/asyncThunks/loginUserAsync';
import { registerUserAsync } from './model/asyncThunks/registerUserAsync';

export type UserModel = {
    thunks: {
        registerUserAsync: typeof registerUserAsync;
        loginUserAsync: typeof loginUserAsync;
    };
};

export const userModel: UserModel = {
    thunks: {
        registerUserAsync,
        loginUserAsync,
    },
};
