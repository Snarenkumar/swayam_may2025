import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const HeroSection = () => {
  return (
    <main className="h-[75vh] lg:h-[85vh] flex flex-col justify-center items-center overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Image
          src="/assets/mvjLogo.webp"
          alt="SwayamLogo"
          width={500}
          height={300}
          className="mx-auto h-28 w-auto mb-5 md:mb-0 lg:mr-2"
          priority
        />
        <X className="w-16 md:w-24 md:mt-2" />
        <Image
          src="/assets/SwayamLogo.png"
          alt="SwayamLogo"
          width={500}
          height={300}
          className="mx-auto max-w-sm w-9/10"
          priority
        />
      </div>
      <h1
        className={`text-center sm:mt-8 mt-5 text-6xl sm:text-6xl md:text-[6rem] font-extrabold`}
      >
        VIRASAT
      </h1>
      <p className="my-5 text-xl">On 23rd & 24th may</p>

      <button
        className={`cursor-pointer mx-auto block border border-[#5F4A37] bg-[#f9efd1] text-[#5F4A37] px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg text-sm sm:text-base`}
      >
        <Link href={"/events"}>Explore Events</Link>
      </button>
    </main>
  );
};

export default HeroSection;
