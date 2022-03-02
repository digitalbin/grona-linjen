import { cubicInOut } from 'svelte/easing';

export function draw(node, { delay = 0, duration = 800 } = {}) {
	const len = node.getTotalLength();
	node.setAttribute('stroke-dasharray', len);
	return {
		delay,
		duration,
		easing: cubicInOut,
		css: (_, u) => `stroke-dashoffset: ${len * u}`
	};
}
