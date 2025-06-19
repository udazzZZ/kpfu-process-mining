import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "shared/constants";

const AuthPage = lazy(async () => await import("pages/authorization"));
const Login = lazy(async () => await import("pages/login"));
const Register = lazy(async () => await import("pages/register"));
const Models = lazy(async () => await import("pages/dataModels"));

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

    [ROUTES.MODELS_PATH]: (
        <Suspense>
            <Models />
        </Suspense>
    ),
};

export const router = createBrowserRouter([
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
        path: ROUTES.MODELS_PATH,
        element: routerElements[ROUTES.MODELS_PATH],
    },
]);
