import FadeInBlock from "@/components/FadeInBlock";

const VideoSection = () => {
  return (
    <div className="container px-2 mx-auto pb-10 md:pb-20">
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8`}
      >
        Swayam 2025
      </h2>
      <video
        autoPlay
        muted
        loop
        preload="none"
        className="mx-auto max-w-5xl w-full rounded-sm"
      >
        <source src="/assets/swayam2024.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </video>
    </div>
  );
};

export default VideoSection;
