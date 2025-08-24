import { createSlice } from "@reduxjs/toolkit";
import { Setting } from "@prisma/client";

const initialState = {
    settings: null as Setting | null,
    loading: false,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateSettings: (state, action) => {
            state.settings = action.payload;
        },
    }
})

export const { setSettings, setLoading, updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
