import { createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

const initialState = {
    user: null as User | null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer