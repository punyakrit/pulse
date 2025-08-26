import { createSlice } from "@reduxjs/toolkit";
import { Website } from "@prisma/client";

const initialState = {
    websites: [] as Website[],
    loading: true,
}

const websitesSlice = createSlice({
    name: "websites",
    initialState,
    reducers: {
        setWebsites: (state, action) => {
            state.websites = action.payload;
            state.loading = false;
        },
        addWebsite: (state, action) => {
            state.websites.push(action.payload);
        },
        removeWebsite: (state, action) => {
            state.websites = state.websites.filter(website => website.id !== action.payload.websiteId);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
})

export const { setWebsites, addWebsite, removeWebsite, setLoading } = websitesSlice.actions;
export default websitesSlice.reducer;