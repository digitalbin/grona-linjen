<script lang="ts">
	import Nav from '../components/Nav/Nav.svelte';
	import InteractiveLogo from '../components/InteractiveLogo.svelte';
	import Cursor from '../components/Cursor.svelte';
	import '../app.css';
	let w;
</script>

<svelte:window bind:innerWidth={w} />
<Nav />
<main>
	<InteractiveLogo />
	<slot />
</main>

<footer>
	<p>
		® Gröna Linjen Bryggeri - digitalbin ab
	</p>
</footer>

{#if w > 1024}
	<Cursor />
{/if}

<style>
	main {
		@apply grid gap-y-16 md:gap-y-32 pb-16 md:pb-32;
		grid-template-columns:
			minmax(theme('spacing.4'), 1fr) minmax(0, theme('screens.xl')) minmax(theme('spacing.4'), 1fr);
	}
	footer {
		@apply text-white text-center p-2 bg-black font-medium;
	}
</style>
