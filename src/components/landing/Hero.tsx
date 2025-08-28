"use client";
import React, { useState } from "react";
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
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-4 mt-16">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/80 text-sm">Trusted by 10,000+ websites worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-6xl leading-tight">
            <span className="text-white">
              Never miss a
            </span>
            <br />
            <span className="text-white">
              website outage
            </span>
            <br />
            <span className="text-white">
              again
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-4xl leading-relaxed">
            Monitor your websites 24/7 from multiple global locations. Get instant alerts when downtime occurs 
            and keep your business running smoothly with detailed analytics and performance insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
              <RegisterLink className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </RegisterLink>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/20 text-white rounded-lg text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white/70">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-white/70">Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-white/70">99.9% uptime guarantee</span>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/70">Average Uptime</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">&lt;30s</div>
              <div className="text-white/70">Alert Response Time</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-white/70">Global Locations</div>
            </div>
          </div>
        </div>
      </div>
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/pulse.mp4"
      />
    </div>
  );
}

export default Hero;
