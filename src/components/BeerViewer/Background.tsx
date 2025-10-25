export default function Background() {
  return (
    <video
      class="absolute h-full w-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/videos/tbana_infinity.mp4" />
      <track kind="captions" />
    </video>
  );
}
