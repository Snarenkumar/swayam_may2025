"use client";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import FadeInBlock from "./FadeInBlock";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sponsors = [
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
  "/assets/MVJlogo.png",
];

const Sponsors = () => {
  const plugin = useRef(
    Autoplay({
      delay: 2000, // change delay if needed
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <div className="mb-[10rem]">
      <FadeInBlock>
        <p className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 ${playfairDisplay.className}`}>
          Sponsors
        </p>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-[90vw] mx-auto"
        >
          <CarouselContent>
            {sponsors.map((src, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 basis-1/3"
              >
                <div className="p-1">
                  <Image
                    src={src}
                    width={200}
                    height={200}
                    alt="Sponsors"
                  ></Image>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:!hidden" />
          <CarouselNext className="hidden md:!hidden" />
        </Carousel>
      </FadeInBlock>
    </div>
  );
};

export default Sponsors;
