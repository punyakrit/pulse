"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle, Play, Star, Zap, Shield } from "lucide-react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { VideoModal } from "../ui/video-modal";
import Link from "next/link";

function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <motion.div 
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-4 mt-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/80 text-sm">Trusted by 10,000+ websites worldwide</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-6xl leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Never miss a
            </motion.span>
            <br />
            <motion.span 
              className="text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              website outage
            </motion.span>
            <br />
            <motion.span 
              className="text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              again
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-4xl leading-relaxed px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Monitor your websites 24/7 from multiple global locations. Get instant alerts when downtime occurs 
            and keep your business running smoothly with detailed analytics and performance insights.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
              <Button 
                variant="outline" 
                className="border-white/20 text-white rounded-lg text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white/70">No credit card required</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Zap className="w-5 h-5 text-white" />
              <span className="text-white/70">Setup in 2 minutes</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Shield className="w-5 h-5 text-white" />
              <span className="text-white/70">99.9% uptime guarantee</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl px-4 sm:px-0"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.div 
              className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/70">Average Uptime</div>
            </motion.div>
            <motion.div 
              className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2">&lt;30s</div>
              <div className="text-white/70">Alert Response Time</div>
            </motion.div>
            <motion.div 
              className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-white/70">Global Locations</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="https://nooskjgrslpgyitgkovi.supabase.co/storage/v1/object/public/video-upload/pulse%20(1).mp4"
      />
    </div>
  );
}



export default Hero;
