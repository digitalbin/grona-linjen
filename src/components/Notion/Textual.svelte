<script lang="ts">
	export let block: { type: string };
	const { type } = block;
	const snippets = block[type].rich_text;
</script>

{#each snippets as { plain_text, href, annotations: { bold } }}
	{#if href}
		<a {href} class:font-bold={bold} target="_blank" rel="noreferrer">
			{plain_text}
		</a>
	{:else if bold}
		<span class:font-bold={bold}>
			{plain_text}
		</span>
	{:else}
		{plain_text}
	{/if}
{/each}
