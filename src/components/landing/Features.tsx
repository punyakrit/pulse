import React from 'react'
import { Bell, Globe, BarChart3, Code, Zap, Shield, Clock, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

function Features() {
  const features = [
    {
      icon: Bell,
      title: "Instant Downtime Alerts",
      description: "Get notified in seconds via email, SMS, or Slack when your website goes down."
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Monitor from multiple worldwide locations to avoid false alarms and ensure accurate uptime tracking."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive insights into uptime percentage, response times, and historical performance data."
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Easy API integration and webhooks for seamless integration with your existing development stack."
    },
    {
      icon: Shield,
      title: "SSL Certificate Monitoring",
      description: "Automatic SSL certificate expiration monitoring to prevent security issues and maintain trust."
    },
    {
      icon: Zap,
      title: "Performance Monitoring",
      description: "Track page load times and performance metrics to optimize user experience and Core Web Vitals."
    },
    {
      icon: Clock,
      title: "Uptime History",
      description: "Complete historical data of your website's uptime and downtime incidents for better decision making."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members, set roles, and collaborate on monitoring your critical websites effectively."
    }
  ]

  return (
    <section className="py-32 relative bg-black">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-white/80 text-sm">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Everything you need to
            <br />
            <span className="text-white">
              monitor effectively
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Comprehensive monitoring tools that keep your applications running smoothly 
            and your team informed in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Join thousands of developers and businesses who trust Pulse to keep their websites online.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
                <RegisterLink className="flex items-center gap-2">
                  Start Free Trial
                  <Zap className="w-5 h-5" />
                </RegisterLink>
              </Button>
              <Button variant="outline" className="border-white/20 text-white rounded-lg text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300">
                <Link href="/features" className="flex items-center gap-2">
                  View All Features
                </Link>
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features