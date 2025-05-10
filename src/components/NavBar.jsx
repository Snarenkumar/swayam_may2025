"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, User, Home, Calendar, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Playfair_Display } from "next/font/google";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NavBar = () => {
  // Use null as initial state to prevent hydration mismatch
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run on client-side to prevent hydration issues
  useEffect(() => {
    // Set mounted state to true
    setIsMounted(true);
    
    // Check authentication status
    // Example: fetch('/api/auth/status').then(res => res.json()).then(data => setIsLoggedIn(data.isAuthenticated))
    
    // For now, always set to false as default
    setIsLoggedIn(false);
  }, []);

  const handleLogin = () => {
    signIn("google");
  };

  const handleLogout = () => {
    // Backend integration: Handle logout here
    // Example: fetch('/api/auth/logout', { method: 'POST' }).then(() => setIsLoggedIn(false))
  };

  // This ensures the button only renders on client side
  const AuthButton = () => {
    if (!isMounted) return null;
    
    return isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="hidden md:block cursor-pointer bg-[#5F4A37] text-[#f9efd1] h-10 max-w-xl px-12 font-extrabold tracking-widest rounded-full"
      >
        Logout
      </button>
    ) : (
      <button
        onClick={handleLogin}
        className="hidden md:block cursor-pointer bg-[#5F4A37] text-[#f9efd1] h-10 max-w-xl px-12 font-extrabold tracking-widest rounded-full"
      >
        Login
      </button>
    );
  };

  // For mobile menu auth button
  const MobileAuthButton = () => {
    if (!isMounted) return null;
    
    return isLoggedIn ? (
      <DropdownMenuItem onClick={handleLogout}>
        Logout
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem onClick={handleLogin}>
        Login
      </DropdownMenuItem>
    );
  };

  return (
    <nav className="sticky top-0 z-40 w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:block lg:top-4 backdrop-blur-sm bg-[#5F4A37]/10 border border-[#5F4A37]/30 shadow-lg lg:rounded-xl max-w-5xl mx-auto">
        <div
          className={`flex justify-evenly items-center p-3 relative ${playfairDisplay.className}`}
        >
          <div>
            <Image
              src="/assets/mvjLogo.png"
              alt="MVJLogo"
              width={120}
              height={120}
            />
          </div>
          <ul className="flex gap-10 items-center cursor-pointer">
            <li className="py-2">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="py-2">
              <Link href={"/events"}>Events</Link>
            </li>
            <li className="py-2">
              <Link href={"/registrations"}>Registrations</Link>
            </li>
            <li className="py-2">Brochure</li>
            <li className="flex items-center justify-center h-9">
              <Link 
                href={"/profile"} 
                className="flex items-center justify-center w-9 h-9 hover:bg-[#5F4A37]/10 rounded-full transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5" />
              </Link>
            </li>
          </ul>
          
          {/* Client-side only auth button */}
          <AuthButton />
        </div>
      </div>
      
      {/* Mobile Navigation - Only profile and hamburger */}
      <div className="md:hidden backdrop-blur-sm bg-[#5F4A37]/10 border-b border-[#5F4A37]/30 shadow-lg">
        <div className={`flex items-center justify-between px-4 py-2 ${playfairDisplay.className}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/mvjLogo.png"
              alt="MVJLogo"
              width={80}
              height={80}
            />
          </div>
          
          {/* Mobile icons - Only profile and hamburger */}
          <div className="flex items-center gap-5">
            {/* Profile Link */}
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-10 h-10 text-[#5F4A37] hover:bg-[#5F4A37]/10 rounded-full transition-colors"
              title="Profile"
            >
              <User className="h-6 w-6" />
            </Link>
            
            {/* Hamburger Menu */}
            <div className="flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Menu className="h-7 w-7 text-[#5F4A37] cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-48 bg-[#f9efd1] text-[#5F4A37] mr-5 ${playfairDisplay.className}`}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/events" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Events</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/registrations">Registrations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="#" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Brochure</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  
                  {/* Client-side only mobile auth button */}
                  <MobileAuthButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
