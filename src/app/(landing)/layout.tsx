import React from 'react'
import NavBar from '@/components/global/NavBar'

interface layoutProps {
    children: React.ReactNode
}

function layout({children}: layoutProps) {
  return (
    <div className='flex flex-col '>
        <NavBar />
        {children}
    </div>
  )
}

export default layout