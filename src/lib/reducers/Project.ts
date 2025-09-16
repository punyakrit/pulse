import { createSlice } from "@reduxjs/toolkit";
import { Project } from "@prisma/client";
import { setStoredProjectId, removeStoredProjectId } from "../utils/localStorage";

const initialState = {
    projects: [] as Project[],
    selectedProject: null as Project | null,
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
            if (action.payload?.id) {
                setStoredProjectId(action.payload.id)
            } else {
                removeStoredProjectId()
            }
        }
    }
})

export const { setProjects, setSelectedProject } = projectSlice.actions

export default projectSlice.reducer