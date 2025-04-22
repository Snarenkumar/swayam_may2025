"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import FadeInBlock from "@/components/FadeInBlock";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const images = [
  "/assets/gallery/IMG_4815.jpg",
  "/assets/gallery/IMG_4352.png",
  "/assets/gallery/IMG_8838.jpg",
  "/assets/gallery/IMG_8839.png",
  "/assets/gallery/IMG_8840.png",
  "/assets/gallery/IMG_8842.png",
  "/assets/gallery/IMG_8844.png",
  "/assets/gallery/IMG_8845.png",
  // "/assets/gallery/IMG_.png",
];
// const reversedImages = [...images].reverse();

const imageSet2 = [
  "/assets/gallery/aakriti01.jpg",
  "/assets/gallery/aakriti02.jpg",
  "/assets/gallery/aakriti03.jpg",
  "/assets/gallery/aakriti04.jpg",
  "/assets/gallery/aakriti01.jpg",
  "/assets/gallery/aakriti02.jpg",
  "/assets/gallery/aakriti03.jpg",
  "/assets/gallery/aakriti04.jpg",
];

const Gallery = () => {
  const plugin1 = useRef(
    Autoplay({
      delay: 2000, // change delay if needed
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );
  const plugin2 = useRef(
    Autoplay({
      delay: 3000, // change delay if needed
      stopOnInteraction: false,
      stopOnMouseEnter: false,
  
    })
  );
  const plugin3 = useRef(
    Autoplay({
      delay: 2000, // change delay if needed
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <div className="py-8 md:py-16">
      <FadeInBlock>
        <p className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-12 ${playfairDisplay.className}`}>
          Gallery
        </p>
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin1.current]}
          className="w-full max-w-[90vw] mx-auto mb-4 md:mb-8"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="relative w-full h-60 sm:h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    fill
                    className="object-cover"
                    alt={`Gallery Image ${index + 1}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </FadeInBlock>

      <FadeInBlock>
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin2.current]}
          className="w-full max-w-[90vw] mx-auto mb-4 md:mb-8"
        >
          <CarouselContent>
            {imageSet2.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="relative w-full h-60 sm:h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    fill
                    className="object-cover"
                    alt={`Gallery Image ${index + 1}`}
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </FadeInBlock>

      <FadeInBlock>
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin3.current]}
          className="w-full max-w-[90vw] mx-auto mb-4 md:mb-8"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="relative w-full h-60 sm:h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    fill
                    className="object-cover"
                    alt={`Gallery Image ${index + 1}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </FadeInBlock>
    </div>
  );
};

export default Gallery;
