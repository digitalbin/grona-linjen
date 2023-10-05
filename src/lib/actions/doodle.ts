import { SVG } from '@svgdotjs/svg.js';
import getDoodlePath from '$lib/utils/getDoodlePath';

const createSvg = ({ width, height }) => {
	const svg = SVG()
		.size(width, height)
		.css({ position: 'absolute', top: '0', left: '0' })
		.addClass('doodle');

	return svg;
};

const createPath = (draw, size) => {
	const { width, height } = size;
	const path = draw.path(getDoodlePath({ width, height }));

	path
		.stroke({
			color: 'currentColor',
			width: 16,
			linejoin: 'round',
			linecap: 'round',
			dasharray: `${path.length()}`,
			dashoffset: path.length()
		})
		.fill('none');
	return path;
};

export default function doodle(node: HTMLElement) {
	node.style.position = 'relative';
	let svg;
	let path;
	let height = node.clientHeight;

	const ob = new ResizeObserver(() => {
		const newHeight = node.clientHeight;
		if (height === newHeight && svg) return;
		height = newHeight;
		const size = node.getBoundingClientRect();
		const _svg = createSvg(size);
		path = createPath(_svg, size);
		svg = svg ? svg.replace(_svg) : _svg;
		svg.addTo(node);
	});

	const handleScroll = () => {
		const { top } = node.getBoundingClientRect();
		const offset = 56;
		const progress = (top - offset) / (window.innerHeight - offset);
		const percent = Math.min(1, Math.max(0, progress));

		path?.stroke({
			dashoffset: path.length() * percent
		});
	};

	ob.observe(node);
	window.addEventListener('scroll', handleScroll);

	return {
		destroy() {
			ob.disconnect();
			window.removeEventListener('scroll', handleScroll);
			return;
		}
	};
}
