<script lang="ts">
	import Nav from '../components/Nav/Nav.svelte';
	import Cursor from '../components/Cursor.svelte';
	import '../styles/app.css';
	import '../styles/typography.css';

	let w;
</script>

<svelte:window bind:innerWidth={w} />
<Nav />
<main>
	<slot />
</main>

{#if w > 1024}
	<Cursor />
{/if}

<style lang="postcss">
	main {
		@apply grid gap-y-24 md:gap-y-48;
		grid-template-columns:
			minmax(theme('spacing.4'), 1fr)
			minmax(0, theme('screens.xl'))
			minmax(theme('spacing.4'), 1fr);
	}
</style>
