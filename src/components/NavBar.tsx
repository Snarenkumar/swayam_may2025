"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Home, Calendar, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Playfair_Display } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NavBar = () => {
  // Use null as initial state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useSession();
  const pathname = usePathname();

  // Only run on client-side to prevent hydration issues
  useEffect(() => {
    // Set mounted state to true
    setIsMounted(true);

    // Check authentication status
    // Example: fetch('/api/auth/status').then(res => res.json()).then(data => setIsLoggedIn(data.isAuthenticated))

    // For now, always set to false as default
  }, []);

  const handleLogin = () => {
    signIn("google", {
      callbackUrl: pathname,
    });
  };

  const AuthButton = () => {
    if (!isMounted) return null;
    const user = data?.user;

    return user?.image && user?.name ? (
      <Link href={"/profile"}>
        <Avatar className="w-12 h-12 hover:cursor-pointer">
          <AvatarImage
            src={user.image}
            alt={user.name}
            height={100}
            width={100}
          />
          <AvatarFallback className="bg-foreground text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </Link>
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
    const user = data?.user;

    return user?.image && user?.name ? (
      <Avatar className="mr-3">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback className="bg-white">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ) : (
      <Button onClick={handleLogin} className="mr-3 bg-foreground">
        Login
      </Button>
    );
  };

  return (
    <nav className="sticky top-0 z-40 w-full lg:top-4">
      {/* Desktop Navigation */}
      <div className="hidden md:block backdrop-blur-sm bg-[#5F4A37]/10 border border-[#5F4A37]/30 shadow-lg lg:rounded-xl max-w-5xl mx-auto">
        <div
          className={`flex justify-around items-center p-3 relative ${playfairDisplay.className}`}
        >
          <Link href={"/"}>
            <Image
              src="/assets/mvjLogo.png"
              alt="MVJLogo"
              width={120}
              height={120}
            />
          </Link>
          <ul className="flex gap-10 items-center cursor-pointer">
            <li className="py-2">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="py-2">
              <Link href={"/events"}>Events</Link>
            </li>
            <li className="py-2">
              <Link href={"/schedule"}>Schedule</Link>
            </li>
            <li className="py-2">
              <a
                href="https://drive.google.com/file/d/1BdcuJs5ZfkqpHIhpKKT1-JNsXI38ljUJ/view?usp=drivesdk"
                target="_blank"
              >
                Brochure
              </a>
            </li>
            <li className="flex items-center justify-center h-9"></li>
          </ul>

          {/* Client-side only auth button */}
          <AuthButton />
        </div>
      </div>

      {/* Mobile Navigation - Only profile and hamburger */}
      <div className="md:hidden backdrop-blur-sm bg-[#5F4A37]/10 border-b border-[#5F4A37]/30 shadow-lg">
        <div
          className={`flex items-center justify-between px-4 py-2 ${playfairDisplay.className}`}
        >
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
            {/* Hamburger Menu */}
            <div className="flex items-center justify-center">
              <MobileAuthButton />

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
