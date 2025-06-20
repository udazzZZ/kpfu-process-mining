import { createModelAsync } from './model/asyncThunks/createModelAsync';
import { getModelsAsync } from './model/asyncThunks/getModelsAsync';
import { selectModels } from './model/selectors';

type DataModelsModel = {
    thunks: {
        createModelAsync: typeof createModelAsync;
        getModelsAsync: typeof getModelsAsync;
    };

    selectors: {
        selectModels: typeof selectModels;
    };
};

export const dataModelsModel: DataModelsModel = {
    thunks: {
        createModelAsync,
        getModelsAsync,
    },

    selectors: {
        selectModels,
    },
};
