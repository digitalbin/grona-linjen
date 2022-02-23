 <script>
	import { SVG, PathArray } from '@svgdotjs/svg.js';
	import { onMount } from 'svelte';

	export let progress;
	let el;
	let path;

	const createSvg = () => SVG().addTo(el).size('100%', '100%').addClass('drawing');
	const getRandomBetween = (min, max) => Math.random() * (max - min) + min;

	onMount(() => {
		const draw = createSvg();
		const canvasSize = draw.node.getBoundingClientRect();

		const ltr = Math.random() > .5;
		const start = [ltr ? 0 : canvasSize.width, getRandomBetween(0, canvasSize.height)];
		const end = [ltr ? canvasSize.width : 0, getRandomBetween(0, canvasSize.height)];

		const getRandom2DVec = () => [getRandomBetween(0, canvasSize.width), getRandomBetween(0, canvasSize.height)];

		const midPoints = Array(Math.floor(canvasSize.height / 50))
			.fill()
			.map(getRandom2DVec)
			.map(vec => ['L', ...vec]);
		
		const pathArray = new PathArray([
			'M', ...start,
			...midPoints,
			'L', ...end,
		]);

		path = draw.path(pathArray);
		path.fill('none').stroke({
			width: 8,
			color: 'currentColor',
			linecap: 'round',
			linejoin: 'round',
			dasharray: path.length().toString(),
			dashoffset: path.length(),
		});
	});

	$: if (path && typeof progress === 'number') path.stroke({ dashoffset: path.length() * (1 - progress) });
</script>

<div bind:this={el} />

<style>
	div {
		@apply absolute inset-0 touch-none pointer-events-none text-green;
	}
</style>
