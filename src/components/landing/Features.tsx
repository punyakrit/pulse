import React from 'react'
import { Bell, Globe, BarChart3, Code } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: Bell,
      title: "Instant Downtime Alerts",
      description: "Get notified in seconds via email, SMS, or Slack."
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Checks from multiple worldwide locations to avoid false alarms."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "See uptime %, response times, and historical performance."
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Easy API + integrations for your stack."
    }
  ]

  return (
    <section className="py-20 mb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Why Choose Pulse?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Comprehensive monitoring that keeps your applications running smoothly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-transparent rounded-2xl p-8 shadow-sm border border-white/15 "
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features