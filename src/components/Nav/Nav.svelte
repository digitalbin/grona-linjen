<script>
	// import { useViewportScroll } from 'svelte-motion';
	import LogoSvg from './LogoSvg.svelte';
	import MenuBtn from './MenuBtn.svelte';
	import Sidebar from './Sidebar.svelte';

	// const { scrollY } = useViewportScroll();

	let isOpen = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	let show = true;
	// let prev;
	let innerHeight;

	// scrollY.subscribe(v => {
	// 	if (v < innerHeight - 96) return;
	// 	if (v < prev) {
	// 		show = true;
	// 	} else {
	// 		show = false;
	// 	}
	// 	prev = v;
	// })

</script>

<svelte:window bind:innerHeight={innerHeight} />
<header class:show>
	<LogoSvg />
	<MenuBtn {toggleOpen} {isOpen} />
	<Sidebar {toggleOpen} {isOpen} />
</header>

<style>
	header {
		@apply
			bg-black
			fixed
			top-0
			right-0
			left-0
			flex
			justify-between
			items-center
			z-50
			text-white
			pl-2;

		@apply transform -translate-y-full transition-transform duration-500;
	}
	header.show {
		@apply translate-y-0;
	}
</style>
