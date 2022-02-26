<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import blocks from '../assets/beer_ipsum.json';
	import Draw from '../components/Draw.svelte';
	import Block from '../components/Block.svelte';
	import InteractiveLogo from '../components/InteractiveLogo/Start.svelte';

	import kall_bira from '../assets/kall_bira.jpg';
	import tapp from '../assets/tapp.jpg';
	import plywood from '../assets/plywood.jpg';
	import bagis_belma from '../assets/bagis_belma.jpg';

	const images = [
		kall_bira,
		tapp,
		plywood,
		bagis_belma,
	];
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

<InteractiveLogo />
<!-- <Draw /> -->

<div>
	{#each blocks as block, i}
		<Block id={block.id}>
			<h2>
				{block.title}
				{#if block.subtitle}
					<span>{block.subtitle}</span>
				{/if}
			</h2>
			<p>{block.text}</p>
		</Block>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img src={images[i % images.length]} />
	{/each}
</div>

<style>
	/* div {
		padding: 1rem 0.5rem;
		color: var(--white);
		height: 800px;
		max-width: 1290px;
		margin: 0 auto;
		color: var(--black);
	} */

	h2 {
		@apply font-bold text-4xl mb-4;
	}

	span {
		@apply text-xl block mt-3;
	}

	p {
		@apply mb-2 font-medium;
	}

	img {
		@apply max-w-2xl w-full;
	}
</style>
