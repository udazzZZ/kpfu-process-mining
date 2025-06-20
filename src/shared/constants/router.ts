export const ROUTES = {
    AUTH_PATH: "/auth",
    LOGIN_PATH: `login`,
    REGISTER_PATH: "register",
    MODELS_PATH: "/models",
    IMPORT_PATH: "/import",
    JOURNAL_PATH: "journal",
    FILE_SETTINGS_PATH: "file-settings",
    MARKS_PATH: "marks",
    FINAL_PATH: "final",
    PROJECTS_PATH: "/projects",
    PROCESSMAP_PATH: "/processmap",
} as const;

export type RoutesTypes = keyof typeof ROUTES;
