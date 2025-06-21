import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../entities/user/model/slice';
import { projectsReducer } from 'pages/projects/model/slice';
import { modelsReducer } from 'entities/dataModels/model/slice';

export const store = configureStore({
    reducer: {
        userReducer,
        projectsReducer,
        modelsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
