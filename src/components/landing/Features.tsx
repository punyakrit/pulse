"use client"
import React from 'react'
import { motion } from 'framer-motion'
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
        <motion.div 
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap className="w-4 h-4 text-white" />
            <span className="text-white/80 text-sm">Powerful Features</span>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to
            <br />
            <motion.span 
              className="text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              monitor effectively
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Comprehensive monitoring tools that keep your applications running smoothly 
            and your team informed in real-time
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 px-4 sm:px-0"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-white/20 transition-colors duration-300"
                whileHover={{ rotate: 5 }}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div 
            className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 mx-4 sm:mx-0"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Ready to get started?
            </motion.h3>
            <motion.p 
              className="text-white/70 mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              Join thousands of developers and businesses who trust Pulse to keep their websites online.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-black rounded-lg text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto">
                  <RegisterLink className="flex items-center gap-2">
                    Start Free Trial
                    <Zap className="w-5 h-5" />
                  </RegisterLink>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-white/20 text-white rounded-lg text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                  <Link href="/features" className="flex items-center gap-2">
                    View All Features
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-white/50 text-sm mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features