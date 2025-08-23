"use client"
import { getProjectQuery, getWebsitesQuery } from '@/lib/actions/query'
import { setWebsites } from '@/lib/reducers/Website'
import { RootState } from '@/lib/store/store'
import { Website } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function WebisteInitial({userId}: {userId: string}) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchWebsites = async () => {
            if(userId){
                const projects = await getProjectQuery(userId);
                let websites: Website[] = [];
                if(projects.length > 0){
                    for(const project of projects){
                        const website = await getWebsitesQuery(project.id);
                        websites.push(...website);
                    }
                    dispatch(setWebsites(websites));
                }
            }
        }
        fetchWebsites();
    }, [userId]);
  return (
    null
  )
}

export default WebisteInitial