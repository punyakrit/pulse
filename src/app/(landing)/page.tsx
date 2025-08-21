import React from 'react'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import StartToday from '@/components/landing/StartToday'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <StartToday />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default page