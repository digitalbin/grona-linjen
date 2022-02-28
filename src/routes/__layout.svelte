<script lang="ts">
	import Nav from '../components/Nav/Nav.svelte';
	import InteractiveLogo from '../components/InteractiveLogo/Start.svelte';
	import '../app.css';
</script>

<Nav />

<InteractiveLogo />
<main>
	<slot />
</main>

<footer>
	<p>
		® Gröna Linjen Bryggeri - digitalbin ab
	</p>
</footer>

<style>
	main {
		@apply max-w-5xl mx-auto;
	}
	footer {
		@apply text-black text-center p-2 bg-green font-medium;
	}
</style>
