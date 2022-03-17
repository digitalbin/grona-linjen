<script lang="ts">
	import Notion from '../Notion/index.svelte';
	export let children = [];
</script>
<footer>
	{#each children as block}
		<Notion {block} />
	{/each}
</footer>

<style>
    footer {
		@apply span-full;
		@apply text-white text-center p-4 bg-black;
	}
</style>