<script>
	import { onMount } from 'svelte';
	import { useViewportScroll, useTransform } from 'svelte-motion';
	import Doodle from './Doodle.svelte';

	export let id = '';
	export let right = false;
	const pathTypes = ['saw', 'sine', 'square'];
	// let type = pathTypes[Math.floor(Math.random() * (2 + 1))];
	let type = pathTypes[1];

	const { scrollY } = useViewportScroll();

	let el;
	let innerHeight;
	let scrollProgress;
	let min;
	let max;

	onMount(() => {
		const { height } = el.getBoundingClientRect();
		const offsetTop = el.offsetTop;
		min = offsetTop - innerHeight + height / 2;
		max = offsetTop;
	});

	scrollY.subscribe((scroll) => {
		const percent = (scroll - min) / (max - min);
		scrollProgress = Math.min(1, Math.max(0, percent));
	});
</script>

<svelte:window bind:innerHeight />
<div bind:this={el} class:right {id}>
	<Doodle progress={scrollProgress} pathType={type} />
	<section>
		<slot />
	</section>
</div>

<style>
	div {
		@apply relative my-12 px-4;
	}
	div.right {
		@apply text-right;
	}
	section {
		/* @apply backdrop-filter backdrop-blur-sm; */
	}
</style>
