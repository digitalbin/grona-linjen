<script>
	import { onMount } from 'svelte';
	import addRGBprops from '../lib/coloring';
	import Nav from '../components/Nav/Nav.svelte';

	onMount(async () => {
		const module = await import('smooth-scroll');
		const SmoothScroll = module.default;
		const scroll = new SmoothScroll('a[href*="#"]', {
			speed: 1500,
			easing: 'easeInOutQuart',
		});

		addRGBprops();

	});

</script>

<style>
	/* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	} */
</style>

<Nav />

<main>
	<slot></slot>
</main>