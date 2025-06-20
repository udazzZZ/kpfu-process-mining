import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { ROUTES } from "shared/constants";

const AuthPage = lazy(async () => await import("pages/authorization"));
const Login = lazy(async () => await import("pages/login"));
const Register = lazy(async () => await import("pages/register"));
const Models = lazy(async () => await import("pages/dataModels"));
const ImportPage = lazy(async () => await import("pages/import"));
const JournalPage = lazy(async () => await import("pages/journal"));
const SettingsPage = lazy(async () => await import("pages/fileSettings"));
const MarksPage = lazy(async () => await import("pages/marks"));
const FinalPage = lazy(async () => await import("pages/final"));
const Projects = lazy(async () => await import("pages/projects"));
const Model = lazy(async () => await import("pages/model"));

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

    [ROUTES.IMPORT_PATH]: (
        <Suspense>
            <ImportPage />
        </Suspense>
    ),

    [ROUTES.JOURNAL_PATH]: (
        <Suspense>
            <JournalPage />
        </Suspense>
    ),

    [ROUTES.FILE_SETTINGS_PATH]: (
        <Suspense>
            <SettingsPage />
        </Suspense>
    ),

    [ROUTES.MARKS_PATH]: (
        <Suspense>
            <MarksPage />
        </Suspense>
    ),

    [ROUTES.FINAL_PATH]: (
        <Suspense>
            <FinalPage />
        </Suspense>
    ),

    [ROUTES.PROJECTS_PATH]: (
        <Suspense>
            <Projects />
        </Suspense>
    ),

    [ROUTES.MODEL_PATH]: (
        <Suspense>
            <Model />
        </Suspense>
    ),
};

export const router = createBrowserRouter([
    {
        path: "/",
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

    {
        path: ROUTES.MODELS_PATH,
        element: routerElements[ROUTES.MODELS_PATH],
        // children: [
        //     {
        //         path: ROUTES.MODEL_PATH,
        //         element: routerElements[ROUTES.MODEL_PATH],
        //         children: [
        //             {
        //                 path: ROUTES.IMPORT_PATH,
        //                 element: routerElements[ROUTES.IMPORT_PATH],
        //                 children: [
        //                     {
        //                         path: ROUTES.JOURNAL_PATH,
        //                         element: routerElements[ROUTES.JOURNAL_PATH],
        //                     },
        //                     {
        //                         path: ROUTES.FILE_SETTINGS_PATH,
        //                         element:
        //                             routerElements[ROUTES.FILE_SETTINGS_PATH],
        //                     },
        //                     {
        //                         path: ROUTES.MARKS_PATH,
        //                         element: routerElements[ROUTES.MARKS_PATH],
        //                     },
        //                     {
        //                         path: ROUTES.FINAL_PATH,
        //                         element: routerElements[ROUTES.FINAL_PATH],
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // ],
    },
]);
