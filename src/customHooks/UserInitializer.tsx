'use client'
import { setUser } from '@/lib/reducers/User'
import { User } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function UserInitializer({user}: {user: User}) {
    const dispatch = useDispatch()
    

    useEffect(() => {
      if (user) dispatch(setUser(user))
    }, [user, dispatch])
  return (
    null
  )
}

export default UserInitializer