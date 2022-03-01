<script lang="ts">
	import Nav from '../components/Nav/Nav.svelte';
	import InteractiveLogo from '../components/InteractiveLogo.svelte';
	import '../app.css';
</script>

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

<style>
	main {
		/* @apply max-w-5xl mx-auto; */
		@apply grid gap-y-16 md:gap-y-32 pb-16 md:pb-32;
		grid-template-columns:
			minmax(theme('spacing.4'), 1fr) minmax(0, theme('screens.xl')) minmax(theme('spacing.4'), 1fr);
	}
	footer {
		@apply text-black text-center p-2 bg-green font-medium;
	}
</style>
