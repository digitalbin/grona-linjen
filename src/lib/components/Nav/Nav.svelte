<script lang="ts">
	import LogoSvg from './LogoSvg.svelte';
	import MenuBtn from './MenuBtn.svelte';
	import Sidebar from './Sidebar/Sidebar.svelte';

	let isOpen = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<header>
	<LogoSvg />
	<MenuBtn {toggleOpen} {isOpen} />
	<Sidebar {toggleOpen} {isOpen} />
</header>

<style lang="postcss">
	header {
		@apply bg-black
			fixed
			top-0
			right-0
			left-0
			flex
			justify-between
			items-center
			z-50
			text-white
			pl-4;
	}
</style>
