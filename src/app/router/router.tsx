import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "shared/constants";

const AuthPage = lazy(async () => await import("pages/authorization"));
const Login = lazy(async () => await import("pages/login"));
const Register = lazy(async () => await import("pages/register"));
const ImportPage = lazy(async () => await import("pages/import"));
const JournalPage = lazy(async () => await import("pages/journal"));
const SettingsPage = lazy(async () => await import("pages/file-settings"));
const MarksPage = lazy(async () => await import("pages/marks"));
const FinalPage = lazy(async () => await import("pages/final"));
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
        </Suspence>
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
    {
        path: ROUTES.IMPORT_PATH,
        element: routerElements[ROUTES.IMPORT_PATH],
        children: [
            {
                path: ROUTES.JOURNAL_PATH,
                element: routerElements[ROUTES.JOURNAL_PATH],
            },
            {
                path: ROUTES.FILE_SETTINGS_PATH,
                element: routerElements[ROUTES.FILE_SETTINGS_PATH],
            },
            {
                path: ROUTES.MARKS_PATH,
                element: routerElements[ROUTES.MARKS_PATH],
            },
            {
                path: ROUTES.FINAL_PATH,
                element: routerElements[ROUTES.FINAL_PATH],
            },
        ],
    },
]);
