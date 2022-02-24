<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import texts from '../../static/beer_ipsum.json';
	import Draw from '../components/Draw.svelte';
	import Block from '../components/Block.svelte';
	import InteractiveLogo from '../components/InteractiveLogo/Start.svelte';

	const images = [
		'kall_bira.jpg',
		'tapp.jpg',
		'plywood.jpg',
		'bagis_belma.jpg',
		'gullmars.jpg',
		'medis.jpg',
	];
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

<InteractiveLogo />
<!-- <Draw /> -->

<div>
	{#each texts as text, i}
		<Block>
			<h2>{text.title}</h2>
			<p>{text.text}</p>
		</Block>
		<img src={images[i % images.length]} />
	{/each}
	<div class="h-72" />
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

	p {
		@apply mb-2 font-medium;
	}
</style>
