<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';

	const bubbleAmount = 20;

	const bubbles = Array(bubbleAmount)
		.fill(true)
		.map((b, i) => ({
			r: anime.random(3, 5),
			cx: anime.random(15, 90) + '%'
		}));

	onMount(() => {
		anime({
			targets: '.bubble',
			autoplay: true,
			translateX: {
				value: [0, '20%', 0],
				easing: 'easeOutQuad',
				duration: 3000
			},
			translateY: ['10%', '-100%'],
			delay: (e, i) => i * 1000,
			loop: true,
			duration: () => anime.random(3000, 5000),
			easing: 'easeInQuad'
		});
	});
</script>

<svg xmlns="http://www.w3.org/2000/svg" class="bubbles">
	{#each bubbles as bubble}
		<circle class="bubble" cx={bubble.cx} cy="95%" r={bubble.r} stroke="none" />
	{/each}
</svg>

<style>
	svg.bubbles {
		@apply absolute inset-0 h-full pointer-events-none fill-white opacity-65;
	}
</style>
