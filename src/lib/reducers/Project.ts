import { createSlice } from "@reduxjs/toolkit";
import { Project } from "@prisma/client";

const initialState = {
    projects: [] as Project[],
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        }
    }
})

export const { setProjects } = projectSlice.actions

export default projectSlice.reducer