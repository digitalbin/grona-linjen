import { SVG } from '@svgdotjs/svg.js';
import PathCreator from '../utils/PathCreator';

export default async function doodle(node: HTMLBaseElement) {
	await document.fonts.ready;
	node.style.position = 'relative';

	const { width, height } = node.getBoundingClientRect();

    const pathCreator = new PathCreator({ width,height });

	const draw = SVG()
		.size(width, height)
		.addTo(node)
		.css({ position: 'absolute', top: '0', left: '0' })
        .addClass('doodle');

	// const path = draw.path([
	// 	['M', width / 2, 0],
	// 	['v', 4],
	// 	['L', 10, height / 2],
	// 	['L', width - 10, height / 2],
	// 	['L', width / 2, height - 8],
	// 	['V', height]
	// ]);
	const path = draw.path(
        pathCreator.getSinePath(3)
    );

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
    
    const screenHeight = window.innerHeight;
    const offset = screenHeight / 3;

    window.addEventListener('scroll', () => {
        const { top } = node.getBoundingClientRect();
        const progress = (top + height - offset) / height;
        const percent = Math.min(1, Math.max(0, progress));
        path?.stroke({
            dashoffset: path.length() * percent
        });
    })
}
