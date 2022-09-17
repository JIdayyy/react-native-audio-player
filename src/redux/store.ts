import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { songApi } from "./services/songs";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import rootReducer, { RootState } from "./reducers";

export const store = configureStore({
    reducer: {
        rootReducer,
        [songApi.reducerPath]: songApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(songApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
