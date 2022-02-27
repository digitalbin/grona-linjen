<script>
	import { SVG } from '@svgdotjs/svg.js';
	import { afterUpdate } from 'svelte';
	let draw;
	let innerWidth;
	let innerHeight;

	afterUpdate(() => {
		const _draw = SVG().addTo('body').size('100%', '100%').addClass('drawing');
		draw = draw ? draw.replace(_draw) : _draw;
		const size = { width: innerWidth, height: innerHeight };
		const path = draw.path([
			['M', size.width / 2, 0],
			['L', size.width / 2, size.height / 3],
		]);

		path
            .addClass('stroke')
			.stroke({
                color: 'currentColor',
				width: 8,
				linejoin: 'round',
				linecap: 'round',
			})
			.fill('none');
	});
</script>
<svelte:window bind:innerHeight bind:innerWidth />
<style>
	:global(.drawing) {
		@apply fixed inset-0 pointer-events-none text-green -z-10;
	}
</style>
