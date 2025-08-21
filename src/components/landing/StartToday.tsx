import React from "react";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";

function StartToday() {
  return (
    <div className="relative">
      <div className="absolute top-0 h-[90vh] w-full bg-gradient-to-b from-green-600/60 via-green-600/20 to-transparent blur-3xl -mt-80 -z-10 rounded-t-full"></div>

      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col my-20">
          <div className="flex flex-col items-center justify-center bg-white/20 rounded-2xl p-2 py-4 md:p-8 shadow-sm border border-white backdrop-blur-3xl">
            <h2 className="md:text-5xl text-3xl text-center font-bold text-white mb-4">
              Start Monitoring Today – Free
            </h2>
            <p className="text-white/70 mb-4 text-center">
              Join thousands of developers and businesses who trust UptimeRadar
              to keep their websites online. Start with our free plan – no
              credit card required.
            </p>
            <Button className="bg-white text-black rounded-full mb-4 cursor-pointer">
              Get Started
            </Button>
            <div className="flex items-center justify-center gap-2 text-white/70 mt-4">
              <CheckCircle className="w-6 h-6 text-lime-400" />
              <p>No credit card required</p>
              <CheckCircle className="w-6 h-6 text-lime-400" />
              <p>5 monitors included</p>
              <CheckCircle className="w-6 h-6 text-lime-400" />
              <p>Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartToday;
