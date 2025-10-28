import { JSX } from "solid-js";
import clsx from "clsx";
import doodle from "@/utils/doodle";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  title: string;
  image: { src: string; alt: string };
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
        class="grid w-full grid-cols-1 gap-16 bg-white md:grid-cols-2 gutter"
        {...props}
      >
        <div
          class={clsx("relative z-10 col-span-1", imageLeft && "md:order-1")}
        >
          <h2 class="t-h2">{title}</h2>
          <p class="t-p">{children}</p>
        </div>
        <figure ref={doodle} class="flex items-start justify-center">
          <img
            src={image.src}
            alt={image.alt}
            width="592"
            class="shadow-glb-hard"
          />
        </figure>
      </section>
  );
}
