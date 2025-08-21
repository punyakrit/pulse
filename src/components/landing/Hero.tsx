import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

function Hero() {
  return (
    <div>
      <div className=" relative">
        <div className="absolute top-0 h-[90vh] w-full bg-gradient-to-b from-purple-600/60 via-purple-600/20 to-transparent blur-3xl -mt-80 -z-10 rounded-b-full"></div>
        <div className="container mx-auto ">
          <div className="flex flex-col items-center justify-center  lg:mt-28 gap-4 mt-20">
            <div>
                
            </div>
            <h1 className="text-5xl text-center md:text-7xl lg:text-8xl font-bold max-w-5xl">
              Never miss a website outage again
            </h1>
            <p className="text-md text-center text-white/70 lg:text-lg lg:max-w-3xl">
              Monitor your websites 24/7 from multiple global locations. Get
              instant alerts when downtime occurs and keep your business running
              smoothly with detailed analytics.
            </p>
            <Button className="bg-lime-400 text-black rounded-full text-xl font-bold px-12 py-6 flex items-center gap-2 hover:bg-lime-500 cursor-pointer mt-5">
              Get Started
              <ArrowRight className="w-6 h-6 text-black text-xl font-bold" />
            </Button>
            <div className="flex items-center justify-center gap-2 mb-20 mt-10">
              <CheckCircle className="w-10 h-10 text-lime-400" />
              <p className="text-white/70">
                Trusted by 10,000+ websites worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
