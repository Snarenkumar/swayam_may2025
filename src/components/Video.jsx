export function Video() {
  return (
    <video width="1000" height="600" autoPlay muted loop preload="none" className="rounded-xl">
      <source src="/assets/swayam2024.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
    </video>
  );
}
