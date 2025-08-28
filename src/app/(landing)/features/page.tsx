import React from 'react'
import { Bell, Globe, BarChart3, Code, Shield, Zap, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

function FeaturesPage() {
  const features = [
    {
      icon: Bell,
      title: "Instant Downtime Alerts",
      description: "Get notified in seconds via email, SMS, or Slack when your website goes down.",
      details: "Configure multiple notification channels and set custom alert thresholds for different types of issues."
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Monitor from multiple worldwide locations to avoid false alarms and ensure accurate uptime tracking.",
      details: "Choose from 20+ global monitoring locations to test your website's performance from different regions."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive insights into uptime percentage, response times, and historical performance data.",
      details: "View detailed charts, export reports, and track performance trends over time with our advanced analytics dashboard."
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Easy API integration and webhooks for seamless integration with your existing development stack.",
      details: "RESTful API, webhooks, and SDKs for popular programming languages to integrate monitoring into your workflow."
    },
    {
      icon: Shield,
      title: "SSL Certificate Monitoring",
      description: "Automatic SSL certificate expiration monitoring to prevent security issues and maintain trust.",
      details: "Get alerts before your SSL certificates expire and ensure your website remains secure and trusted."
    },
    {
      icon: Zap,
      title: "Performance Monitoring",
      description: "Track page load times and performance metrics to optimize user experience and Core Web Vitals.",
      details: "Monitor Core Web Vitals, page speed, and performance bottlenecks to keep your website fast and responsive."
    },
    {
      icon: Clock,
      title: "Uptime History",
      description: "Complete historical data of your website's uptime and downtime incidents for better decision making.",
      details: "Access detailed logs of all incidents, maintenance windows, and performance trends for better decision making."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members, set roles, and collaborate on monitoring your critical websites effectively.",
      details: "Role-based access control, team notifications, and shared dashboards for effective team collaboration."
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to monitor your websites effectively and keep your business running smoothly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.details}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Join thousands of developers and businesses who trust Pulse to keep their websites online.
            </p>
            <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
              <RegisterLink className="flex items-center gap-2">
                Start Free Trial
              </RegisterLink>
            </Button>
            <p className="text-white/50 text-sm mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage
