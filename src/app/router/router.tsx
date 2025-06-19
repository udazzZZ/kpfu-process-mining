import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { ROUTES } from 'shared/constants';

const AuthPage = lazy(async () => await import('pages/authorization'));
const Login = lazy(async () => await import('pages/login'));
const Register = lazy(async () => await import('pages/register'));
const Projects = lazy(async () => await import('pages/projects'));

const routerElements = {
    [ROUTES.AUTH_PATH]: (
        <Suspense>
            <AuthPage />
        </Suspense>
    ),

    [ROUTES.LOGIN_PATH]: (
        <Suspense>
            <Login />
        </Suspense>
    ),

    [ROUTES.REGISTER_PATH]: (
        <Suspense>
            <Register />
        </Suspense>
    ),
    [ROUTES.PROJECTS_PATH]: (
        <Suspense>
            <Projects />
        </Suspense>
    ),
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: ROUTES.AUTH_PATH,
                element: routerElements[ROUTES.AUTH_PATH],
                children: [
                    {
                        path: ROUTES.LOGIN_PATH,
                        element: routerElements[ROUTES.LOGIN_PATH],
                    },
                    {
                        path: ROUTES.REGISTER_PATH,
                        element: routerElements[ROUTES.REGISTER_PATH],
                    },
                ],
            },

            {
                path: ROUTES.PROJECTS_PATH,
                element: routerElements[ROUTES.PROJECTS_PATH],
            },
        ],
    },
]);
