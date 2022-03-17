<script lang="ts">
	import Notion from '../Notion/index.svelte';
	export let children = [];
	export let id;

	const groupedChildren = children.reduce((acc, child, i) => {
		const { type } = child;
		if (type === 'bulleted_list_item') {
			const last = acc[acc.length - 1];
			if (Array.isArray(last)) last.push(child);
			else acc.push([child]);
		} else {
			acc.push(child);
		}
		return acc;
	}, []);

</script>

<section {id}>
	{#each groupedChildren as group}
		{#if Array.isArray(group)}
			<ul>
				{#each group as listItem}
					<Notion class="border-l-2 pl-4" block={listItem} />
				{/each}
			</ul>
		{:else}
			<Notion block={group} />
		{/if}
	{/each}
</section>

<style>
	section {
		@apply mx-auto max-w-4xl w-full;
		@apply span-gutter;
		@apply md:grid gap-10;
		grid-template-columns: auto 1fr;
	}

    :global(section#where h2) {
        @apply col-span-full;
    }

	ul {
		@apply md:col-start-2;
		@apply flex flex-col gap-4;
		@apply mb-8 md:mb-0;
		@apply text-lg md:text-xl leading-relaxed;
	}
	ul:last-of-type {
		@apply mb-0;
	}
</style>
