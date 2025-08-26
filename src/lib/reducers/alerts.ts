import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        alerts: [],
    },
    reducers: {
        setAlerts: (state, action) => {
            state.alerts = action.payload;
        },
    },
});

export const { setAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;