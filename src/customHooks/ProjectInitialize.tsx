"use client"
import { setProjects } from '@/lib/reducers/Project';
import { RootState } from '@/lib/store/store';
import { Project } from '@prisma/client';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ProjectInitialize({project}: {project: Project[]}) {
    const dispatch = useDispatch();
    useEffect(() => {
        if(project){
            dispatch(setProjects(project));
        }
    }, [project]);
  return (
    null
  )
}

export default ProjectInitialize