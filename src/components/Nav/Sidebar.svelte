<script>
	import * as animateScroll from "svelte-scrollto";
	const { scrollto } = animateScroll;
	import { fly } from 'svelte/transition';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';

	export let isOpen;
	export let toggleOpen;
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
	]

	animateScroll.setGlobalOptions({
    offset: -100,
    onStart: toggleOpen,
})

</script>

{#if isOpen}
	<nav bind:clientWidth={w} transition:fly={{ x: w, opacity: 1 }}>
		<Waves />
		<ul>
			{#each sections as { id, label }}
				<li>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a use:scrollto={`#${id}`}>{label}</a>
				</li>
			{/each}
		</ul>
		<Bubbles />
	</nav>
{/if}

<style>
	nav {
		@apply
			w-1/3
			min-w-min
			h-screen
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
		@apply pt-32 p-4;
	}
</style>
