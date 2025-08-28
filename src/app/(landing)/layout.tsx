import React from 'react'
import NavBar from '@/components/global/NavBar'
import { getUser } from '@/lib/actions/User'
import { redirect } from 'next/navigation'

interface layoutProps {
    children: React.ReactNode
}

async function layout({children}: layoutProps) {
  const user = await getUser()
  console.log(user)
  if(user) {
    redirect('/dashboard')
  }
  return (
    <div className='min-h-screen bg-black'>
        <NavBar />
        <main className='pt-0'>
            {children}
        </main>
    </div>
  )
}

export default layout