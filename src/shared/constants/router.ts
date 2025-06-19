export const ROUTES = {
    AUTH_PATH: '/auth',
    LOGIN_PATH: `login`,
    REGISTER_PATH: 'register',
    MODELS_PATH: '/models'
} as const;

export type RoutesTypes = keyof typeof ROUTES;
