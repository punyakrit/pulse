
import { getUser } from '@/lib/actions/User'
import { redirect } from 'next/navigation'
import React from 'react'
import { prisma } from '@/lib/prisma/db'
import UserInitializer from '@/customHooks/UserInitializer'

interface layoutProps {
    children: React.ReactNode
}

async function layout({children}: layoutProps) {
  const user = await getUser()
  if(!user) {
    redirect('/')
  }

  const userExists = await prisma.user.findFirst({
    where:{
      id: user.id
    }
  })

  if(!userExists) {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email as string,
        name: user.given_name,
      }
    })
  }

  return (
    <div>
      <UserInitializer user={userExists!} />
        {children}
    </div>
  )
}

export default layout