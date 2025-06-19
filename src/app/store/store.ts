import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../entities/user/model/slice';
import { projectsReducer } from 'pages/projects/model/slice';

export const store = configureStore({
    reducer: {
        userReducer,
        projectsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
