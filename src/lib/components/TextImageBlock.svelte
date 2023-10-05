<script lang="ts">
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

<style lang="postcss">
	section {
		@apply bg-white w-full;
		@apply grid grid-cols-1 md:grid-cols-2;
		@apply gap-16;
	}

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
</style>
