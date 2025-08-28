import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, Star, Zap } from 'lucide-react'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal projects and small websites',
      features: [
        '5 website monitors',
        '1-minute check intervals',
        'Email notifications',
        'Basic analytics',
        '30-day uptime history',
        'Community support'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Ideal for growing businesses and developers',
      features: [
        '25 website monitors',
        '30-second check intervals',
        'SMS & Slack notifications',
        'Advanced analytics',
        '1-year uptime history',
        'Priority support',
        'Custom domains',
        'API access'
      ],
      popular: true,
      cta: 'Start Pro Trial'
    },
    {
      name: 'Business',
      price: '$49',
      period: 'per month',
      description: 'For teams and larger organizations',
      features: [
        '100 website monitors',
        '15-second check intervals',
        'All notification channels',
        'Advanced analytics & reports',
        'Unlimited uptime history',
        '24/7 phone support',
        'Custom integrations',
        'Team collaboration',
        'SSO authentication'
      ],
      popular: false,
      cta: 'Start Business Trial'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/80 text-sm">Simple, transparent pricing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Choose the right plan
            <br />
            <span className="text-white">
              for your needs
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core monitoring features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-white/30 bg-white/10' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>
                <p className="text-white/70 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full rounded-lg font-semibold py-3 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <RegisterLink className="flex items-center justify-center gap-2">
                  {plan.cta}
                  <Zap className="w-4 h-4" />
                </RegisterLink>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a custom plan?
            </h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              We offer custom enterprise plans for large organizations with specific requirements. 
              Contact our sales team to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" className="border-white/20 text-white rounded-lg text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Sales
                </Link>
              </Button>
              <Button className="bg-white text-black rounded-lg text-lg font-semibold px-8 py-4 hover:bg-gray-100 transition-all duration-300">
                <RegisterLink className="flex items-center gap-2">
                  Start Free Trial
                </RegisterLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
