import React from "react";
import Link from "next/link";
import { Activity, Github, Twitter, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <Activity className="w-8 h-8" />
              <span className="text-2xl font-bold">Pulse</span>
            </Link>
            <p className="text-white/70  max-w-md">
              Monitor your websites 24/7 from multiple global locations. Get
              instant alerts when downtime occurs and keep your business running
              smoothly.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2025 Pulse. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <span>Made with ❤️ for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
