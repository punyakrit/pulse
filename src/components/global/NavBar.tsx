"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Activity, Menu, X } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center container mx-auto max-w-4xl z-50">
      <div className="flex justify-between items-center border border-white/15 w-full max-w-6xl my-4 rounded-full px-6 py-2 relative">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="flex items-center gap-2 text-lime-400">
              <Activity className="w-6 h-6 text-white" />
              <span className="">Pulse</span>
            </Link>
          </h1>
        </div>
        
        <nav className="hidden md:flex justify-center items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center text-sm gap-2 text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="outline" className="text-sm rounded-full">
              <LoginLink>
                Login
              </LoginLink>
            </Button>
            <Button className="text-sm rounded-full">
              <RegisterLink>
                Sign Up
              </RegisterLink>
            </Button>
          </div>
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-lime-400 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`md:hidden absolute z-20 backdrop-blur-2xl  top-full left-0 right-0 mt-2 bg-black/95 border border-white/30 rounded-lg py-4 px-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center text-sm gap-2 text-white/60 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/15">
              <Button variant="outline" className="text-sm rounded-full w-full">
                <LoginLink>

                Login
                </LoginLink>
              </Button>
              <Button className="text-sm rounded-full w-full">
                <RegisterLink>
                  Sign Up
                  </RegisterLink>
                  </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
