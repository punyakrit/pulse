import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/User";
import projectReducer from "../reducers/Project";
import websiteReducer from "../reducers/Website";

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
        website: websiteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch