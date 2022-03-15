<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';
	import Item from './Item.svelte';
	import { clickOutside } from '../../../actions';

	export let isOpen;
	export let toggleOpen;
	
	let w;
	let offset;

	onMount(() => {
		const header = document.querySelector('header').clientHeight;
		offset = -(header + 32);
	});

	const sections = [
		{
			id: 'start',
			label: 'Start'
		},
		{
			id: 'about',
			label: 'Om oss'
		},
		{
			id: 'where',
			label: 'Hitta oss'
		},
		{
			id: 'contact',
			label: 'Kontakt'
		}
	];


	const handleClickOutside = (e) => {
		if (e.target.id !== 'menuBtn') toggleOpen();
	}

	const onNavigation = () => {
		toggleOpen();
	};

</script>

{#if isOpen}
	<nav use:clickOutside={handleClickOutside} bind:clientWidth={w} transition:fly={{ x: w, opacity: 1 }}>
		<Waves />
		<ul>
			{#each sections as { id, label } (label)}
				<Item {id} {label} {onNavigation} {offset} />
			{/each}
		</ul>
		<Bubbles />
	</nav>
{/if}

<style>
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
