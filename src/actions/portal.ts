export default function portal(node, querySelector) {
	const target = document.querySelector(querySelector);
	target.appendChild(node);
}
