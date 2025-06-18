import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../entities/user/model/slice';

export const store = configureStore({
    reducer: {
        userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
