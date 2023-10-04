<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';
	import Item from './Item.svelte';
	import { clickOutside } from '$lib/actions';

	export let isOpen: boolean;
	export let toggleOpen: () => void;

	let w: number;
	let offset: number;
	let menuItems: Element[];

	onMount(() => {
		const header = document.querySelector('header')?.clientHeight || 0;
		offset = -(header + 32);
		menuItems = [...document.querySelectorAll('[data-menu-item]')];
	});

	const handleClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.id !== 'menuBtn') toggleOpen();
	};

	const onNavigation = () => {
		toggleOpen();
	};
</script>

{#if isOpen}
	<nav
		use:clickOutside={handleClickOutside}
		bind:clientWidth={w}
		transition:fly={{ x: w, opacity: 1 }}
	>
		<Waves />
		<ul>
			{#each menuItems as destinationNode}
				<Item {destinationNode} {onNavigation} {offset} />
			{/each}
		</ul>
		<Bubbles />
	</nav>
{/if}

<style lang="postcss">
	nav {
		@apply h-screen
			fixed
			inset-0
			left-auto
			text-black
			font-bold
			text-4xl;
		@apply flex justify-around;
	}
	ul {
		@apply flex flex-col gap-6 items-end bg-green flex-1;
		@apply pt-32 p-8;
	}
</style>
