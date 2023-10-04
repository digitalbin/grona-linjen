<script lang="ts">
	import type { ComponentType } from 'svelte';
	export let menuItem: string;
	export let stores: string[] = [];

	const lists = Object.values(
		import.meta.glob<{ default: ComponentType }>('$lib/content/lists/*.md', { eager: true })
	).map((list) => list);

	function addTargetBlankToLinks(node: HTMLElement) {
		const links = node.querySelectorAll('a');
		links.forEach((link) => link.setAttribute('target', '_blank'));
	}
</script>

<section data-menu-item={menuItem} class="gutter grid gap-10" use:addTargetBlankToLinks>
	<h2>Gröna Linjen längs linjen - här finns vi</h2>
	<div class="where-lists">
		<h3>Systembolaget</h3>
		<ul>
			{#each stores as store}
				<li>{store}</li>
			{/each}
		</ul>
		{#each lists as List}
			<svelte:component this={List.default} />
		{/each}
	</div>
</section>

<style lang="postcss">
	div.where-lists {
		@apply mx-auto max-w-4xl w-full;
		@apply md:grid gap-10;
		grid-template-columns: auto 1fr;
	}
	:global(.where-lists ul) {
		@apply md:col-start-2;
		@apply flex flex-col gap-4;
		@apply mb-8 md:mb-0;
		@apply text-lg md:text-xl leading-relaxed;
	}
	:global(.where-lists ul:last-of-type) {
		@apply mb-0;
	}
	:global(.where-lists li) {
		@apply border-l-2 pl-4;
	}
</style>
