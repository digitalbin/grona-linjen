<script>
	import LogoSvg from './LogoSvg.svelte';
	import MenuBtn from './MenuBtn.svelte';
	import Sidebar from './Sidebar.svelte';

	let isOpen = false;

	const handleClick = () => {
		isOpen = !isOpen;
	};
</script>

<header>
	<LogoSvg />
	<MenuBtn {handleClick} {isOpen} />
	<Sidebar {isOpen} />
</header>

<style>
	header {
		@apply
			bg-black
			bg-opacity-65
			backdrop-blur-md
			fixed
			top-0
			right-0
			left-0
			p-4
			pr-0
			flex
			justify-between
			items-center
			z-50
			text-white;
	}
</style>
