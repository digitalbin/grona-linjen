<script>
    import { afterUpdate } from 'svelte';
	import { SVG } from '@svgdotjs/svg.js';

	let el;
	let innerHeight;
	let path;
    let h;

    const makeSvg = () => {
        const draw = SVG(el);
        // draw = draw ? draw.replace(_draw) : _draw;

        const size = draw.node.getBoundingClientRect();
		path = draw.path([
			['M', size.width / 2, 0],
			['L', 10, size.height / 2],
			['L', size.width - 10, size.height / 2],
			['L', size.width / 2, size.height],
		]);
		path
			.stroke({
				color: 'currentColor',
				width: 8,
				linejoin: 'round',
				linecap: 'round',
				dasharray: `${path.length()}`,
				dashoffset: path.length()
			})
			.fill('none');
    }

    afterUpdate(makeSvg);

    const onScroll = () => {
        const { top, height } = el.getBoundingClientRect();
        const offset = innerHeight / 2;
        const progress = (top + height - offset) / height;
        const percent = Math.min(1, Math.max(0, progress));
        path?.stroke({
            dashoffset: path.length() * percent
        });
    }
    
</script>

<svelte:window bind:innerHeight on:scroll={onScroll} />

<svg width="100%" height="100%" bind:this={el} bind:clientHeight={h} />

<style>
    svg {
        @apply absolute inset-0 text-green overflow-visible;
    }
</style>