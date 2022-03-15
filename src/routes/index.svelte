<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import TextImage from '../components/Blocks/TextImage.svelte';
	import List from '../components/Blocks/List.svelte';
	import ContactForm from '../components/Blocks/ContactForm.svelte';

	export let blocks;
	
	const blockMapper = {
		'text-image': TextImage,
		'list': List,
		'contact': ContactForm,
	}
	
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

{#each blocks as block}
	{@const type = block?.child_page?.title}
	<svelte:component this={blockMapper[type]} children={block.children} />
{/each}
