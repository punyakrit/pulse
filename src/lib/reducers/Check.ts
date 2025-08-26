import { createSlice } from "@reduxjs/toolkit";
import { Check } from "@prisma/client";

const initialState = {
    loading: false,
    error: null,
    checks: {} as Record<string, Check[]>,
}

const checkSlice = createSlice({
    name: "check",
    initialState,
    reducers: {
        setChecks: (state, action) => {
            state.checks = action.payload;
        },
        setWebsiteChecks: (state, action) => {
            const { websiteId, checks } = action.payload;
            state.checks[websiteId] = checks;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
       
    }
})

export const { setChecks, setWebsiteChecks, setLoading } = checkSlice.actions;
export default checkSlice.reducer;