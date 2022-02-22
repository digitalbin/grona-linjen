<script>
	import { fly } from 'svelte/transition';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';

	export let isOpen;

	let w;
</script>

{#if isOpen}
	<nav bind:clientWidth={w} transition:fly={{ x: w, opacity: 1 }}>
		<Waves />
		<ul>
			<li>
				<a>Start</a>
			</li>
			<li>
				<a>Om oss</a>
			</li>
			<li>
				<a>Utbud</a>
			</li>
			<li>
				<a>Kontakt</a>
			</li>
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
