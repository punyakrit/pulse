import { createSlice } from "@reduxjs/toolkit";
import { PerformanceMetric, UptimeLog } from "@prisma/client";

const initialState = {
    performanceMetrics: {} as Record<string, PerformanceMetric[]>,
    uptimeLogs: {} as Record<string, UptimeLog[]>,
    loading: false,
    error: null,
}

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        setUptimeLogs: (state, action) => {
            state.uptimeLogs = action.payload;
        },
        setWebsiteUptimeLogs: (state, action) => {
            const { websiteId, logs } = action.payload;
            state.uptimeLogs[websiteId] = logs;
        },
        addUptimeLog: (state, action) => {
            const { websiteId, log } = action.payload;
            if (!state.uptimeLogs[websiteId]) {
                state.uptimeLogs[websiteId] = [];
            }
            state.uptimeLogs[websiteId].push(log);
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
    setUptimeLogs,
    setWebsiteUptimeLogs,
    addUptimeLog,
    setLoading, 
    setError 
} = analyticsSlice.actions;

export default analyticsSlice.reducer;


