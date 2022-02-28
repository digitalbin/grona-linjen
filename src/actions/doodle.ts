import { SVG } from '@svgdotjs/svg.js';
import PathCreator from '../utils/PathCreator';

const createSvg = ({ width, height }) => {
	const svg = SVG()
		.size(width, height)
		.css({ position: 'absolute', top: '0', left: '0' })
        .addClass('doodle');
	// const pathCreator = new PathCreator({ width, height });
	// const b = pathCreator.getBox();
	// svg.rect(b[2], b[3]).x(b[0]).y(b[1]).fill('none').stroke('black')

	return svg;
}

const createPath = (draw, size) => {
	const { width, height } = size;

	const pathCreator = new PathCreator({ width, height });
	// const path = draw.path([
	// 	['M', width / 2, 0],
	// 	['v', 4],
	// 	['L', 10, height / 2],
	// 	['L', width - 10, height / 2],
	// 	['L', width / 2, height - 8],
	// 	['V', height]
	// ]);
	const path = draw.path(
        pathCreator.getSinePath(4)
    );

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
}

export default async function doodle(node: HTMLBaseElement) {
	node.style.position = 'relative';
	let svg;
	let path;
	let height = node.clientHeight;
	let offset;

	const ob = new ResizeObserver(() => {
		
		const newHeight = node.clientHeight;
		if (height === newHeight && svg) return;
		height = newHeight;
		const size = node.getBoundingClientRect();
		const _svg = createSvg(size);
		path = createPath(_svg, size);
		svg = svg ? svg.replace(_svg) : _svg;
		svg.addTo(node);
		offset = window.innerHeight * 0.66;
	})


	const handleScroll = () => {
		const { top } = node.getBoundingClientRect();
		const progress = (top + height - offset) / height;
		const percent = Math.min(1, Math.max(0, progress));
		path?.stroke({
			dashoffset: path.length() * percent
		});
	}

	ob.observe(node)
	window.addEventListener('scroll', handleScroll);

	return {
		destroy() {
			ob.disconnect();
			window.removeEventListener('scroll', handleScroll)
		}
	}
}
