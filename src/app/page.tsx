import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
import ChatWidget from "@/components/ChatWidget"; // Import ChatWidget here

export default function Home() {
  return (
    <main
      // style={{ backgroundImage: "url('/assets/Background.png')" }}
      className={`min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] ${openSans.className} scroll-smooth relative`}
    >
      <div className="sticky top-0 lg:top-4 backdrop-blur-sm bg-[#5F4A37]/10 border border-[#5F4A37]/30 shadow-lg lg:rounded-xl z-40 max-w-5xl mx-auto ">
        <NavBar />
      </div>
      <div className="flex items-center h-[80vh] lg:h-screen lg:pb-28 justify-center ">
        <HeroSection />
      </div>
      <div className="flex flex-col gap-[10rem]">
        {/* <div className="backdrop-blur-sm z-0 bg-[#5F4A37]/10 border border-[#5F4A37]/30 shadow-lg rounded-lg p-8 "> */}
        <VideoSection />
        {/* </div> */}
        {/* <VideoSection /> */}
        <About />
        <Gallery />
        <Sponsors />
        <Contact />
      </div>
      {/* ChatWidget rendered as a fixed-position component */}
      <ChatWidget /> {/* This is where the chatbot will appear */}
    </main>
  );
}

// bg-[url('/assets/Background.png')]
