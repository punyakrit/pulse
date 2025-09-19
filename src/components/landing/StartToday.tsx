"use client"
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { CheckCircle, ArrowRight, Star, Zap, Shield } from "lucide-react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

function StartToday() {
  const benefits = [
    { icon: CheckCircle, text: "No credit card required" },
    { icon: CheckCircle, text: "5 monitors included" },
    { icon: CheckCircle, text: "Cancel anytime" },
    { icon: CheckCircle, text: "24/7 support" },
    { icon: CheckCircle, text: "99.9% uptime guarantee" },
    { icon: CheckCircle, text: "Setup in 2 minutes" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content: "Pulse has been a game-changer for our monitoring needs. The instant alerts have saved us countless hours.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "DevOps Engineer",
      content: "Easy to set up and the analytics are incredibly detailed. Highly recommend for any team.",
      rating: 5
    }
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/80 text-sm">Join 10,000+ satisfied customers</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start monitoring
              <br />
              <motion.span 
                className="text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                your websites today
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join thousands of developers and businesses who trust Pulse to keep their websites online. 
              Start with our free plan and scale as you grow.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <benefit.icon className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white/80 text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-black rounded-lg text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto">
                  <RegisterLink className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </RegisterLink>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-white/20 text-white rounded-lg text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact Sales
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-white/50 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Free plan includes 5 monitors • 1-minute check intervals • Email alerts
            </motion.p>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div 
              className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="flex items-center justify-between mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white">Free Plan</h3>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-white">$0</div>
                  <div className="text-white/60 text-sm">forever</div>
                </div>
              </motion.div>
              
              <motion.ul 
                className="space-y-3 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {[
                  "5 website monitors",
                  "1-minute check intervals", 
                  "Email notifications",
                  "Basic analytics",
                  "30-day uptime history"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-white text-black rounded-lg font-semibold py-3 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base">
                  <RegisterLink className="flex items-center justify-center gap-2">
                    Start Free Trial
                    <Zap className="w-4 h-4" />
                  </RegisterLink>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="flex items-center gap-1 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </motion.div>
                  <p className="text-white/80 text-sm mb-3 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-white/60 text-xs">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StartToday;
