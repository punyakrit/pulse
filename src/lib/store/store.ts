import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/User";
import projectReducer from "../reducers/Project";
import websiteReducer from "../reducers/Website";
import settingsReducer from "../reducers/Settings";
import checkReducer from "../reducers/Check";
import alertsReducer from "../reducers/alerts";
import analyticsReducer from "../reducers/analytics";

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
        website: websiteReducer,
        settings: settingsReducer,
        check: checkReducer,
        alerts: alertsReducer,
        analytics: analyticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch