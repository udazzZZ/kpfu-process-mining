export type Project = {
    name: string;
    description: string;
    id: number;
};

export type DataReport = {
    id: number;
    project: number;
    model_data: number;
    name: string;
    description: string;
    created_at: string;
    updated: string;
};
