import { createSlice } from "@reduxjs/toolkit";
import { Website } from "@prisma/client";

const initialState = {
    websites: [] as Website[],
}

const websitesSlice = createSlice({
    name: "websites",
    initialState,
    reducers: {
        setWebsites: (state, action) => {
            state.websites = action.payload;
        },
    }
})

export const { setWebsites } = websitesSlice.actions;
export default websitesSlice.reducer;