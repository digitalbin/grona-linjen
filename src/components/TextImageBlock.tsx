import { JSX } from "solid-js";
import Gutter from "./Gutter";
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
    <Gutter>
      <section
        class="grid w-full grid-cols-1 gap-16 bg-white md:grid-cols-2"
        {...props}
      >
        <div
          class={clsx("relative z-10 col-span-1", imageLeft && "md:order-1")}
        >
          <h2 class="mb-4 text-4xl font-bold md:text-5xl md:leading-14">
            {title}
          </h2>
          <p class="text-xl leading-7">{children}</p>
        </div>
        <figure ref={doodle} class="flex items-start justify-center">
          <img src={image.src} alt={image.alt} class="shadow-glb-hard" />
        </figure>
      </section>
    </Gutter>
  );
}
