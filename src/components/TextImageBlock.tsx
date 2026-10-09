import { JSX } from "solid-js";
import clsx from "clsx";
import doodle from "@/utils/doodle";
import ImageSlot, { ImageSlotProps } from "./ImageSlot";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  title: string;
  image: ImageSlotProps;
  imageLeft?: boolean;
  children: JSX.Element;
}

export default function TextImageBlock({
  title,
  image,
  imageLeft = false,
  children,
  ...props
}: Props) {
  return (
    <section
      class="gutter grid w-full grid-cols-1 gap-16 bg-white md:grid-cols-2"
      {...props}
    >
      <div class={clsx("relative z-10 col-span-1", imageLeft && "md:order-1")}>
        <h2 class="t-h2">{title}</h2>
        <p class="t-p">{children}</p>
      </div>
      <figure ref={doodle} class="flex items-start justify-center">
        <ImageSlot {...image} />
      </figure>
    </section>
  );
}
