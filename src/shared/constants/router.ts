export const ROUTES = {
    AUTH_PATH: '/auth',
    LOGIN_PATH: `login`,
    REGISTER_PATH: 'register',
} as const;

export type RoutesTypes = keyof typeof ROUTES;
