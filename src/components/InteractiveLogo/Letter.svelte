<script>
	import { onMount } from 'svelte';

	export let d;
	export let id;

	const getTransformOrigin = (el, isLinjen) => {
		const { x, y, width, height } = el.getBBox();
		if (!isLinjen) {
			return `${x + width / 2}px ${y + height / 2}px`;
		}
		return `${x}px ${y + height / 2}px`;
	};

	let element;
	onMount(() => {
		element.style.transformOrigin = getTransformOrigin(element, id === 'LINJEN');
	});
</script>

<path bind:this={element} {d} {id} fill-rule="evenodd" clip-rule="evenodd" fill="white" />

<style>
	path {
		opacity: 0;
	}
</style>
