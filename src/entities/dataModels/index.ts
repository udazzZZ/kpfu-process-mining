import { createModelAsync } from './model/asyncThunks/createModelAsync';
import { getModelsAsync } from './model/asyncThunks/getModelsAsync';
import {
    selectModelById,
    selectModels,
    selectModelsById,
} from './model/selectors';

type DataModelsModel = {
    thunks: {
        createModelAsync: typeof createModelAsync;
        getModelsAsync: typeof getModelsAsync;
    };

    selectors: {
        selectModels: typeof selectModels;
        selectModelsById: typeof selectModelsById;
        selectModelById: typeof selectModelById;
    };
};

export const dataModelsModel: DataModelsModel = {
    thunks: {
        createModelAsync,
        getModelsAsync,
    },

    selectors: {
        selectModels,
        selectModelById,
        selectModelsById,
    },
};
