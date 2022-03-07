export default function transformOriginCenter(node: SVGPathElement) {
	const b = node.getBBox();
	const x = b.x + b.width / 2;
	const y = b.y + b.height / 2;
	node.setAttribute('transform-origin', `${x} ${y}`);
}
