<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import InteractiveLogo from '../components/Blocks/InteractiveLogo.svelte';
	import TextImage from '../components/Blocks/TextImage.svelte';
	import List from '../components/Blocks/List.svelte';
	import ContactForm from '../components/Blocks/ContactForm.svelte';
	import Footer from '../components/Blocks/Footer.svelte';
	import InteractiveCan from '../components/InteractiveCan.svelte';
	import { menuItems } from '../stores';

	export let blocks = [];

	const blockMapper = {
		start: InteractiveLogo,
		'text-image': TextImage,
		list: List,
		contact: ContactForm,
		footer: Footer
	};

	$menuItems = blocks.map((block) => ({
		label: block?.blocks?.title?.[0]?.plain_text,
		id: block?.id?.rich_text?.[0]?.plain_text
	})).filter(({ id }) => Boolean(id));
</script>

{#each blocks as block, i}
	{@const type = block?.type?.select?.name}
	{@const id = block?.id?.rich_text?.[0]?.plain_text}
	{#if type === 'list'}
		<InteractiveCan />
	{/if}
	<svelte:component this={blockMapper[type]} children={block.children} {id} />
{/each}
