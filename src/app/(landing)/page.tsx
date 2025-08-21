import React from 'react'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'

function page() {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section>
        <Features />
      </section>
    </div>
  )
}

export default page