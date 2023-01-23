<script lang="ts">
	import Notion from '../Notion/index.svelte';
	export let children = [];
	export let id = 'footer';
</script>

<footer {id}>
	{#each children as block}
		<Notion {block} />
	{/each}
</footer>

<style lang="postcss">
	footer {
		@apply span-full;
		@apply text-white text-center p-4 bg-black;
	}
</style>
