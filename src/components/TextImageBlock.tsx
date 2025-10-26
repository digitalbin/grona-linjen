import { JSX } from "solid-js";
import Gutter from "./Gutter";
import clsx from "clsx";
import doodle from "@/utils/doodle";
import { H2, P } from "./Typography";

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
          <H2>{title}</H2>
          <P>{children}</P>
        </div>
        <figure ref={doodle} class="flex items-start justify-center">
          <img src={image.src} alt={image.alt} class="shadow-glb-hard" />
        </figure>
      </section>
    </Gutter>
  );
}
