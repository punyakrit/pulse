"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Github, Twitter, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center gap-2 text-white mb-4">
                <Activity className="w-8 h-8" />
                <span className="text-2xl font-bold">Pulse</span>
              </Link>
            </motion.div>
            <motion.p 
              className="text-white/70  max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Monitor your websites 24/7 from multiple global locations. Get
              instant alerts when downtime occurs and keep your business running
              smoothly.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-white/10 pt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div 
              className="text-white/60 text-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              © 2025 Pulse. All rights reserved.
            </motion.div>
            <motion.div 
              className="flex items-center gap-6 text-sm text-white/60"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span>Made with ❤️ for developers</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
