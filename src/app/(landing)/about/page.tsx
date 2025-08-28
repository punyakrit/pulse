import React from 'react'
import { Button } from '@/components/ui/button'
import { Users, Target, Award, Heart } from 'lucide-react'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Reliability First",
      description: "We believe that website monitoring should be as reliable as the services we monitor. Our platform is built with redundancy and fail-safes at every level."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Every feature we build is designed with our customers in mind. We listen, we iterate, and we deliver solutions that actually solve real problems."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our code quality to our customer support. Good enough is never good enough."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "We believe in being open and honest with our customers. Clear pricing, honest communication, and transparent operations."
    }
  ]

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former DevOps engineer with 10+ years experience in infrastructure and monitoring."
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Full-stack developer passionate about building scalable, reliable systems."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      bio: "Product leader focused on creating intuitive user experiences that solve real problems."
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About
            <br />
            <span className="text-white">
              Pulse
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're on a mission to make website monitoring simple, reliable, and accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Pulse was born from frustration. As developers, we were tired of complex, expensive monitoring solutions 
                that were difficult to set up and maintain. We wanted something simple, reliable, and affordable.
              </p>
              <p>
                In 2023, we set out to build the website monitoring platform we always wanted. One that was easy to use, 
                provided instant alerts, and didn't break the bank. Today, Pulse monitors over 10,000 websites worldwide 
                and helps thousands of developers and businesses keep their applications online.
              </p>
              <p>
                We're still a small, passionate team focused on building the best monitoring experience possible. 
                Every feature we add, every improvement we make, is driven by our customers' needs and feedback.
              </p>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">By the Numbers</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Websites Monitored</span>
                <span className="text-3xl font-bold text-white">10,000+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Uptime Checks</span>
                <span className="text-3xl font-bold text-white">50M+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Countries</span>
                <span className="text-3xl font-bold text-white">20+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Customer Satisfaction</span>
                <span className="text-3xl font-bold text-white">99%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-white/70 mb-4">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join us on our mission
            </h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Ready to experience simple, reliable website monitoring? Start your free trial today and see why thousands of developers choose Pulse.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
                <RegisterLink className="flex items-center gap-2">
                  Start Free Trial
                </RegisterLink>
              </Button>
              <Button variant="outline" className="border-white/20 text-white rounded-lg text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300">
                <Link href="/contact" className="flex items-center gap-2">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
