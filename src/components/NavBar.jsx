"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Playfair_Display } from "next/font/google";
import { signIn } from "next-auth/react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const NavBar = () => {
  return (
    <div>
      <div
        className={`flex md:justify-evenly items-center p-3 relative ${playfairDisplay.className}`}
      >
        <div>
          <Image
            src="/assets/mvjLogo.png"
            alt="MVJLogo"
            width={120}
            height={120}
          />
        </div>
        <ul className="hidden md:flex gap-10 items-center cursor-pointer">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/events"}>Events</Link>
          </li>
          <li>
            <Link href={"/registrations"}>Registrations</Link>
          </li>
          <li>Brochure</li>
        </ul>
        <button
          onClick={() => signIn("google")}
          className="hidden md:block cursor-pointer bg-[#5F4A37] text-[#f9efd1] h-10 max-w-xl px-12 font-extrabold tracking-widest rounded-full"
        >
          Login
        </button>
        <div className={`md:hidden ml-auto mr-5`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className="h-6 w-6 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-40 bg-[#f9efd1] text-[#5F4A37] mr-5 ${playfairDisplay.className}`}
            >
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/events">Events</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/registrations">Registrations</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Brochure</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signIn("google")}>
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
