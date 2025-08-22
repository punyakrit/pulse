import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/User";
import projectReducer from "../reducers/Project";

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch