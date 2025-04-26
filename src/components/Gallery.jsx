import FadeInBlock from "@/components/FadeInBlock";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const imageSet1 = [
  "/assets/gallery/img1.jpg",
  "/assets/gallery/img2.jpg",
  "/assets/gallery/img3.jpg",
  "/assets/gallery/img4.jpg",
  "/assets/gallery/img5.jpg",
  "/assets/gallery/img6.jpg",
];

const imageSet2 = [
  "/assets/gallery/img8.jpg",
  "/assets/gallery/img7.jpg",
  "/assets/gallery/img9.jpg",
  "/assets/gallery/img10.jpg",
  "/assets/gallery/img11.jpg",
  "/assets/gallery/img12.jpg",
];

const Gallery = () => {
  return (
    <div className="py-8 md:py-16 container mx-auto">
      <FadeInBlock>
        <h2
          className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12`}
        >
          Gallery
        </h2>

        <InfiniteMovingCards
          images={imageSet1}
          direction="right"
          speed="normal"
        />
      </FadeInBlock>

      <FadeInBlock>
        <InfiniteMovingCards
          images={imageSet2}
          direction="left"
          speed="normal"
        />
      </FadeInBlock>
    </div>
  );
};

export default Gallery;
