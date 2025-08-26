import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "@prisma/client";

const initialState = {
    alerts: {} as Record<string, Alert[]>,
    loading: false,
    error: null,
}

const alertsSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        setAlerts: (state, action) => {
            state.alerts = action.payload;
        },
        setWebsiteAlerts: (state, action) => {
            const { websiteId, alerts } = action.payload;
            state.alerts[websiteId] = alerts;
        },
        addAlert: (state, action) => {
            const { websiteId, alert } = action.payload;
            if (!state.alerts[websiteId]) {
                state.alerts[websiteId] = [];
            }
            state.alerts[websiteId].unshift(alert);
        },
        updateAlert: (state, action) => {
            const { websiteId, alertId, updates } = action.payload;
            const websiteAlerts = state.alerts[websiteId];
            if (websiteAlerts) {
                const alertIndex = websiteAlerts.findIndex(alert => alert.id === alertId);
                if (alertIndex !== -1) {
                    state.alerts[websiteId][alertIndex] = { ...websiteAlerts[alertIndex], ...updates };
                }
            }
        },
        removeWebsiteAlerts: (state, action) => {
            const { websiteId } = action.payload;
            delete state.alerts[websiteId];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { 
    setAlerts, 
    setWebsiteAlerts, 
    addAlert, 
    updateAlert, 
    removeWebsiteAlerts, 
    setLoading, 
    setError 
} = alertsSlice.actions;

export default alertsSlice.reducer;