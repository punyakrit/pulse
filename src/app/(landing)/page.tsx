import React from 'react'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import StartToday from '@/components/landing/StartToday'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <StartToday />
      <Footer />
    </div>
  )
}

export default page