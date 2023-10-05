<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';
	import getWavePath from '$lib/utils/getWavePath';

	const waveDepth = 50;
	const wavesAmount = 3;
	const complexity = 10;
	const waveDuration = 20000;

	const getPoints = (length = 21): [number, number][] => {
		const arr = Array(length)
			.fill(true)
			.map((_, i) => {
				const isFirst = i === 0;
				const x = isFirst ? waveDepth : anime.random(0, waveDepth);
				return [x, i * (1000 / length)] as [number, number];
			});
		return [...arr, [waveDepth, 1000]];
	};

	const wavePaths = Array(wavesAmount)
		.fill(true)
		.map(() =>
			Array(complexity)
				.fill(true)
				.map(() => getWavePath(getPoints(complexity)))
		);

	onMount(() => {
		wavePaths.map((wp, i) =>
			anime({
				targets: `.waves${i}`,
				d: wp,
				loop: true,
				easing: 'linear',
				direction: 'alternate',
				duration: anime.random(waveDuration / 2, waveDuration)
			})
		);
	});
</script>

<svg viewBox="0 0 {waveDepth} 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
	{#each wavePaths as wavePath, i}
		<path class="waves{i}" d={wavePath[wavePath.length - 1]} opacity={1 - (i / 10) * 2} />
	{/each}
</svg>

<style lang="postcss">
	svg {
		@apply fill-green h-full -mr-px;
	}
</style>
