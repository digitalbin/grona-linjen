import { cubicInOut } from 'svelte/easing';

export function draw(node: SVGPathElement, { delay = 0, duration = 800 } = {}) {
	const len = node.getTotalLength();
	node.setAttribute('stroke-dasharray', len.toString());
	return {
		delay,
		duration,
		easing: cubicInOut,
		css: (_: unknown, u: number) => `stroke-dashoffset: ${len * u}`
	};
}
