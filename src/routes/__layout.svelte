<script lang="ts">
	import Nav from '../components/Nav/Nav.svelte';
	import '../app.css';
</script>

<Nav />

<main>
	<slot />
</main>

<footer>
	<p>
		® Gröna Linjen Bryggeri - digitalbin ab
	</p>
</footer>

<style>
	footer {
		@apply text-black text-center p-2 bg-green font-medium;
	}
</style>
