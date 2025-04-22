import Navbar from "@/components/NavBar";

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const page = () => {
  return (
    <div
      className={`min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] ${playfairDisplay.className} scroll-smooth`}
    >
      <Navbar />
      <p className="text-center mt-5">Events will be Live Soon</p>
    </div>
  );
};

export default page;
