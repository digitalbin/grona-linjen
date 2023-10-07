<script lang="ts">
	import Nav from '$lib/components/Nav';
	import Cursor from '$lib/components/Cursor.svelte';
	import '../styles/app.css';
	import '../styles/typography.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	let w: number;
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
	}
</style>
