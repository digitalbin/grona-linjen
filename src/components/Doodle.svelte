<script lang="ts">
	import { SVG, PathArray } from '@svgdotjs/svg.js';
	import type { PathArrayAlias } from '@svgdotjs/svg.js';
	import { onMount } from 'svelte';
	import PathCreator from '../utils/PathCreator';

	export let progress;
	// let progress = 1;
	export let pathType;
	// let pathType = 'saw';
	let el;
	let path;

	const createSvg = () =>
		SVG()
			.addTo(el)
			.size('100%', '100%')
			.addClass('doodle');

	onMount(() => {
		const draw = createSvg();
		const canvasSize = draw.node.getBoundingClientRect();

		const pc = new PathCreator(canvasSize);

		let _path;

		const complexion = 3;

		if (pathType === 'saw') _path = pc.getSawPath(complexion) as PathArrayAlias;
		if (pathType === 'square') _path = pc.getSquarePath(complexion) as PathArrayAlias;
		if (pathType === 'sine') _path = pc.getSinePath(Math.round(complexion / 2)) as PathArrayAlias;

		const pathArr = new PathArray(_path);

		path = draw.path(pathArr);
		path.fill('none').stroke({
			width: 10,
			color: 'currentColor',
			linecap: 'round',
			linejoin: 'round',
			dasharray: path.length().toString(),
			dashoffset: path.length()
		});
	});

	$: if (path && typeof progress === 'number')
		path.stroke({ dashoffset: path.length() * (1 - progress) });
</script>

<div bind:this={el} />

<style>
	div {
		@apply absolute inset-0 touch-none pointer-events-none text-green;
		/* @apply w-1/2 left-auto; */
	}

	:global(svg.doodle) {
		@apply overflow-visible relative;
		z-index: -1;
	}
</style>
