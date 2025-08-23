"use client"
import { getProjectQuery, getWebsitesQuery } from '@/lib/actions/query'
import { setWebsites, setLoading } from '@/lib/reducers/Website'
import { RootState } from '@/lib/store/store'
import { Website } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function WebisteInitial({userId}: {userId: string}) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchWebsites = async () => {
            if(userId){
                try {
                    const projects = await getProjectQuery(userId);
                    let websites: Website[] = [];
                    if(projects.length > 0){
                        for(const project of projects){
                            const website = await getWebsitesQuery(project.id);
                            websites.push(...website);
                        }
                    }
                    dispatch(setWebsites(websites));
                } catch (error) {
                    console.error('Error fetching websites:', error);
                    dispatch(setWebsites([]));
                }
            }
        }
        fetchWebsites();
    }, [userId, dispatch]);
  return (
    null
  )
}

export default WebisteInitial