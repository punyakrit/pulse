import React from 'react'

interface layoutProps {
    children: React.ReactNode
}

function layout({children}: layoutProps) {
  return (
    <div>
        {children}
    </div>
  )
}

export default layout