import React from "react";
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
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/80 text-sm">Join 10,000+ satisfied customers</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Start monitoring
              <br />
              <span className="text-white">
                your websites today
              </span>
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed">
              Join thousands of developers and businesses who trust Pulse to keep their websites online. 
              Start with our free plan and scale as you grow.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <benefit.icon className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white/80 text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
                <RegisterLink className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </RegisterLink>
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white rounded-lg text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Sales
                </Link>
              </Button>
            </div>

            <p className="text-white/50 text-sm">
              Free plan includes 5 monitors • 1-minute check intervals • Email alerts
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Free Plan</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">$0</div>
                  <div className="text-white/60 text-sm">forever</div>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white/80">5 website monitors</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white/80">1-minute check intervals</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white/80">Email notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white/80">Basic analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white/80">30-day uptime history</span>
                </li>
              </ul>

              <Button className="w-full bg-white text-black rounded-lg font-semibold py-3 hover:bg-gray-100 transition-all duration-300">
                <RegisterLink className="flex items-center justify-center gap-2">
                  Start Free Trial
                  <Zap className="w-4 h-4" />
                </RegisterLink>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm mb-3 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-white/60 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartToday;
