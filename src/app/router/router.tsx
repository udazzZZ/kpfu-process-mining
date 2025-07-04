import Model from "pages/model";
import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";
import { ROUTES } from "shared/constants";

const AuthPage = lazy(async () => await import("pages/authorization"));
const Login = lazy(async () => await import("pages/login"));
const Register = lazy(async () => await import("pages/register"));
const Models = lazy(async () => await import("pages/dataModels"));
const ImportPage = lazy(async () => await import("pages/journalImport/import"));
const JournalPage = lazy(
    async () => await import("pages/journalImport/journal")
);
const SettingsPage = lazy(
    async () => await import("pages/journalImport/fileSettings")
);
const MarksPage = lazy(async () => await import('pages/journalImport/marks'));
const FinalPage = lazy(async () => await import('pages/journalImport/final'));
const Projects = lazy(async () => await import('pages/projects'));
const ProcessMap = lazy(async () => await import("pages/processMap"));

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
        <Suspense fallback="Загрузка...">
            <JournalPage />
        </Suspense>
    ),

    [ROUTES.FILE_SETTINGS_PATH]: (
        <Suspense fallback="Загрузка...">
            <SettingsPage />
        </Suspense>
    ),

    [ROUTES.MARKS_PATH]: (
        <Suspense fallback="Загрузка...">
            <MarksPage />
        </Suspense>
    ),

    [ROUTES.FINAL_PATH]: (
        <Suspense fallback="Загрузка...">
            <FinalPage />
        </Suspense>
    ),

    [ROUTES.PROJECTS_PATH]: (
        <Suspense>
            <Projects />
        </Suspense>
    ),

    [ROUTES.PROCESSMAP_PATH]: (
        <Suspense>
            <ProcessMap />
        </Suspense>
    ),

    [ROUTES.MODEL_PATH]: (
        <Suspense>
            <Model />
        </Suspense>
    ),
};

export const createMainRouter = (isAuthenticated: boolean) =>
    createBrowserRouter([
        {
            path: "/",
            loader: () =>
                redirect(
                    isAuthenticated
                        ? ROUTES.PROJECTS_PATH
                        : `/${ROUTES.AUTH_PATH}/${ROUTES.LOGIN_PATH}`
                ),
        },

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

        {
            path: ROUTES.MODELS_PATH,
            element: routerElements[ROUTES.MODELS_PATH],
        },

        {
            path: `${ROUTES.MODELS_PATH}/${ROUTES.MODEL_PATH}`,
            element: routerElements[ROUTES.MODEL_PATH],
        },

        {
            path: `${ROUTES.MODELS_PATH}/${ROUTES.MODEL_PATH}/${ROUTES.IMPORT_PATH}`,
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
        {
            path: ROUTES.MODELS_PATH,
            element: routerElements[ROUTES.MODELS_PATH],
        },
        {
            path: ROUTES.PROCESSMAP_PATH,
            element: routerElements[ROUTES.PROCESSMAP_PATH],
        },
    ]);
