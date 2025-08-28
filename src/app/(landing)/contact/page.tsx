import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react'

function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Have questions about Pulse? We're here to help you get the most out of your website monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Contact Information
              </h2>
              <p className="text-white/70 mb-8">
                Reach out to our team for support, sales inquiries, or any questions about Pulse.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                  <p className="text-white/70">support@pulse.com</p>
                  <p className="text-white/50 text-sm">We typically respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-white/70">Available 24/7</p>
                  <p className="text-white/50 text-sm">Get instant help from our support team</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Office</h3>
                  <p className="text-white/70">San Francisco, CA</p>
                  <p className="text-white/50 text-sm">United States</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                Need Immediate Help?
              </h3>
              <p className="text-white/70 mb-4">
                Check out our comprehensive documentation and FAQ section for quick answers.
              </p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Send us a Message
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-white/80">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white/80">Message</Label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:border-white focus:outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button className="w-full bg-white text-black rounded-lg font-semibold py-3 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
