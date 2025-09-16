"use client"
import { setProjects, setSelectedProject } from '@/lib/reducers/Project';
import { RootState } from '@/lib/store/store';
import { Project } from '@prisma/client';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStoredProjectId } from '@/lib/utils/localStorage';

function ProjectInitialize({project}: {project: Project[]}) {
    const dispatch = useDispatch();
    const { selectedProject } = useSelector((state: RootState) => state.project);
    
    useEffect(() => {
        if(project){
            dispatch(setProjects(project));
            
            if (!selectedProject) {
                const storedProjectId = getStoredProjectId();
                if (storedProjectId) {
                    const projectToSelect = project.find(p => p.id === storedProjectId);
                    if (projectToSelect) {
                        dispatch(setSelectedProject(projectToSelect));
                    }
                } else if (project.length > 0) {
                    dispatch(setSelectedProject(project[0]));
                }
            }
        }
    }, [project, selectedProject, dispatch]);
  return (
    null
  )
}

export default ProjectInitialize