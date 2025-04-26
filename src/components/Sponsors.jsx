import Image from "next/image";
import FadeInBlock from "./FadeInBlock";

const Sponsors = () => {
  return (
    <section className="py-8 md:py-16">
      <FadeInBlock>
        <h2
          className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8`}
        >
          Sponsors
        </h2>
        <Image
          src={"/assets/mvjLogo.png"}
          width={200}
          height={200}
          className="mx-auto my-12"
          alt="Sponsors"
        ></Image>
      </FadeInBlock>
    </section>
  );
};

export default Sponsors;
