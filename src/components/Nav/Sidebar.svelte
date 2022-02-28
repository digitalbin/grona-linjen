<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';
	import { scrollTo, clickOutside } from '../../actions';

	export let isOpen;
	export let toggleOpen;
	let offset;
	let w;

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
			id: 'selection',
			label: 'Utbud'
		},
		{
			id: 'contact',
			label: 'Kontakt'
		}
	];

	onMount(() => {
		const header = document.querySelector('header').clientHeight;
		offset = -(header + 32);
	})

	const handleClickOutside = (e) => {
		if (e.target.id !== 'menuBtn') toggleOpen();
	}

	const onStart = () => {
		toggleOpen();
	}

</script>

{#if isOpen}
	<nav use:clickOutside={handleClickOutside} bind:clientWidth={w} transition:fly={{ x: w, opacity: 1 }}>
		<Waves />
		<ul>
			{#each sections as { id, label }}
				<li>
					<a href={`#${id}`} use:scrollTo={{ offset, onStart }}>{label}</a>
				</li>
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

	a {
		@apply cursor-pointer;
	}
</style>
