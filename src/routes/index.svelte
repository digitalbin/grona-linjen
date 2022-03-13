<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Block from '../components/Block.svelte';
	import List from '../components/List.svelte';
	import Banner from '../components/Banner.svelte';
	import Button from '../components/Button.svelte';
	import ContactForm from '../components/ContactForm.svelte';

	export let blocks;

</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

{#each blocks as block}
	{#if block.type === 'block'}
		<Block block={block.results} />
	{:else if block.type === 'page'}
		<List items={block.results} />
	{/if}
{/each}

<!-- {#each blocks as block, i}
	<Block id={block.id} flip={i % 2 === 0}>
		<div slot="text">
			<h2>
				{block.title}
				{#if block.subtitle}
					<span>{block.subtitle}</span>
				{/if}
			</h2>
			<p>{block.text}</p>
			{#if block.id === 'contact'}
				<div class="flex justify-center gap-8 md:justify-start mt-4">
					<Button>Beställ</Button>
					<Button secondary>Läs mer</Button>
				</div>
			{/if}
		</div>
		<img slot="image" src={images[i % images.length]} alt="GLB" />
	</Block>
	{#if i === 1}
		<Banner />
	{:else if i === 3}
		<Krummelur />
		<RollerCoaster />
	{/if}
{/each} -->
<ContactForm />
