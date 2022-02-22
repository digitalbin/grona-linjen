<script>
	import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
    import { onMount } from 'svelte';

	let container;
	let positions;
	const getRandomBetween = (max) => Math.floor(Math.random() * max);

	const setPositions = (els) => (positions = [...els].map((el) => {
        const { x, width, y, height } = el.getBoundingClientRect();
        return {
            x: x + width / 2,
            y: y + height / 2,
        }
    }));

	const createSvg = () => {
		positions.forEach((pos, i) => {
			const [startPos, endPos] = [pos, positions[i + 1]];
			if (!endPos) return;
            const flipX = startPos.x > endPos.x;
            const flipY = startPos.y > endPos.y;
			const [width, height] = [Math.abs(endPos.x - startPos.x), Math.abs(endPos.y - startPos.y)];
			const left = Math.min(startPos.x, endPos.x);
			const top = Math.min(startPos.y, endPos.y);
			const draw = SVG()
				.css({ position: 'absolute', 'z-index': '-1', left, top, transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` })
				.addTo('main')
				.size(width, height);

            const points = Array(5).fill().map(() => [getRandomBetween(width), getRandomBetween(height)]);
            const start = [0, 0];
            const end = [width, height];
            const lines = [start, ...points, end];
            draw.polyline(lines).stroke({ width: 5, color: '#00F249' }).fill('none');
            // lines.forEach((s, i) => {
            //     const e = lines[i + 1];
            //     if (e) {
            //         draw.line(s.x, s.y, e.x, e.y).stroke({ width: 5, color: '#00F249' })
            //     }
            // })
			// draw.rect(width, height).attr({ fill: 'rgba(255,255,255,0.05)' });

		});
	};

    onMount(() => {
        const poss = document.querySelectorAll('[data-connect]');
        setPositions(poss);
    })

	$: if (positions) createSvg();
</script>

<!-- <div bind:this={container}> -->
	<slot />
<!-- </div> -->

<!-- <style>
    div {
        position: relative;
        height: 100%;
    }
</style> -->
