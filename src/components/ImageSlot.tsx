export interface ImageSlotProps {
  /** Leave undefined to render a placeholder until the real image is ready. */
  src?: string;
  alt: string;
  width?: number;
}

/**
 * Renders an image with the site's hard shadow, or a clearly marked
 * placeholder box when `src` is missing.
 */
export default function ImageSlot({ src, alt, width = 592 }: ImageSlotProps) {
  if (src) {
    return <img src={src} alt={alt} width={width} class="shadow-glb-hard" />;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      class="shadow-glb-hard bg-glb-gray-100 border-glb-gray-400 flex aspect-4/3 w-full flex-col items-center justify-center gap-2 border-2 border-dashed p-6 text-center"
      style={{ "max-width": `${width}px` }}
    >
      <span class="text-2xl font-bold">Bild kommer</span>
      <span class="text-glb-gray-500 text-lg">{alt}</span>
    </div>
  );
}
