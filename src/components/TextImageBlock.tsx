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
          <img src={image.src} alt={image.alt} class="rounded-sm shadow" />
        </figure>
      </section>
    </Gutter>
  );
}

{
  /* <script lang="ts">
	import { doodle } from '$lib/actions';
	export let menuItem: string | undefined = undefined;
	export let image: { src: string; alt: string };
	const processedImage = Object.entries(
		import.meta.glob<{ default: string }>(`/src/lib/content/images/*.jpg`, { eager: true })
	).find(([key]) => key.includes(image.src))?.[1].default;
</script>

<section data-menu-item={menuItem} class="gutter">
	<div>
		<slot />
	</div>
	{#if processedImage}
		<figure use:doodle>
			<img src={processedImage} alt={image.alt} class="rounded-sm shadow" />
		</figure>
	{/if}
</section>


	div {
		@apply col-span-1 relative z-10;
	}

	section:nth-of-type(even) figure {
		@apply md:-order-1;
	}

	figure {
		@apply flex justify-center items-start;
	}

	:global(svg.doodle) {
		@apply text-green overflow-visible;
	}
</style> */
}
