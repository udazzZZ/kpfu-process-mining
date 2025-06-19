import { registerUserAsync } from './model/asyncThunks/registerUserAsync';

export type UserModel = {
    thunks: {
        registerUserAsync: typeof registerUserAsync;
    };
};

export const userModel: UserModel = {
    thunks: {
        registerUserAsync,
    },
};
