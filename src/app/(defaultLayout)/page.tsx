import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <About />
      <Gallery />
      <Sponsors />
      <Contact />
    </>
  );
}
