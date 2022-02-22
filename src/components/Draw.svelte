<script>
	import { SVG, extend as SVGextend, Element as SVGElement, PathArray } from '@svgdotjs/svg.js';
	import { onMount } from 'svelte';
    import throttle from 'just-throttle';
	let progress;
	let path;
	let anim;

	const createSvg = () => SVG().addTo('main').size('100%', '100%').addClass('drawing');
	const getRandomBetween = (min, max) => Math.random() * (max - min) + min;

	onMount(() => {
		const draw = createSvg();
		const size = draw.node.getBoundingClientRect();
		const start = [size.width / 2, 0];
		const end = [draw.node.getBoundingClientRect().width / 2, size.height];

		const grp = () => [getRandomBetween(10, size.width - 10), getRandomBetween(100, size.height)];

		const middlePoints = Array(Math.floor(size.height / 100))
			.fill()
			.map(grp)
			.sort((a, b) => (a[1] > b[1] ? 1 : -1));

		const pathArray = new PathArray([
			['M', ...start],
			// ['V', 100],
			...middlePoints.map((mp, i) => {
				const h = i % 2 !== 0;
				if (h) return ['H', mp[0]];
				else return ['V', mp[1]];
				// ['L', ...mp]
			}),
			['V', end[1]]
		]);

		path = draw.path(pathArray);
		path
            .addClass('stroke')
			.stroke({
                color: 'currentColor',
				width: 8,
				linejoin: 'round',
				linecap: 'round',
				dasharray: `${path.length()}`,
				dashoffset: path.length()
			})
			.fill('none');
		// anim = path.animate().stroke({ dashoffset: 0 });
		// anim.timeline().stop();
	});

	const handleScroll = throttle(() => {
		const h = document.documentElement;
		const b = document.body;
		const st = 'scrollTop';
		const sh = 'scrollHeight';
		const progress = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
		const amt = path.length() * progress;
		// path.stroke({ dashoffset: path.length() - amt });
		// console.log(progress);
		// anim.timeline().seek(progress);
        path.animate(100).stroke({ dashoffset: path.length() - amt });
	}, 100);
</script>

<svelte:window on:scroll={handleScroll} />

<style>
	:global(.drawing) {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
    :global(.stroke) {
        color: var(--green);
    }
</style>
