import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../entities/user/model/slice";
import { dataModelsReducer } from "pages/dataModels/model/slice";

export const store = configureStore({
    reducer: {
        userReducer,
        dataModelsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
