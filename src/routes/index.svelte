<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import blocks from '../assets/beer_ipsum.json';
	import Block from '../components/Block.svelte';
	import Button from '../components/Button.svelte';

	import kall_bira from '../assets/kall_bira.jpg';
	import tapp from '../assets/tapp.jpg';
	import plywood from '../assets/plywood.jpg';
	import bagis_belma from '../assets/bagis_belma.jpg';

	const images = [
		kall_bira,
		plywood,
		tapp,
		bagis_belma,
	];
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

{#each blocks as block, i}
	<Block id={block.id} flip={i % 2 === 0}>
		<div slot="text">
			<h2>
				{block.title}
				{#if block.subtitle}
					<span>{block.subtitle}</span>
				{/if}
			</h2>
			<p>{block.text}</p>
			{#if block.id === 'contact'}
				<div class="flex justify-center gap-8 md:justify-start mt-4">
					<Button>Beställ</Button>
					<Button secondary>Läs mer</Button>
				</div>
			{/if}
		</div>
		<img slot="image" src={images[i % images.length]} alt="GLB" />
	</Block>
	<!-- svelte-ignore a11y-missing-attribute -->
{/each}

<style>
	h2 {
		@apply font-bold text-4xl mb-4;
	}

	span {
		@apply text-xl block mt-3;
	}

	p {
		/* @apply font-medium; */
	}

	img {
		@apply w-full object-cover rounded-sm;
		/* @apply border-black border-2; */
		@apply shadow;
	}
</style>
