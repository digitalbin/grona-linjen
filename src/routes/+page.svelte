<script lang="ts">
	import AnimatedHeroLogo from '$lib/components/AnimatedHeroLogo.svelte';
	import BiraBiraBira from '$lib/components/BiraBiraBira';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import List from '$lib/components/List.svelte';
	import TextImageBlock from '$lib/components/TextImageBlock.svelte';
	import type { ComponentType } from 'svelte';

	export let data;
	const { stores } = data;

	interface Module {
		default: ComponentType;
		metadata: {
			image: { src: string; alt: string };
		};
	}

	const textBlocks = Object.values(
		import.meta.glob<Module>('$lib/content/blocks/*.md', { eager: true })
	).map((m: Module) => ({
		component: m.default,
		meta: m.metadata
	}));
</script>

<AnimatedHeroLogo menuItem="Start" />

{#each textBlocks as textBlock, i}
	<TextImageBlock menuItem={i === 0 ? 'Om oss' : undefined} image={textBlock.meta?.image}>
		<svelte:component this={textBlock.component} />
	</TextImageBlock>
{/each}

<BiraBiraBira menuItem="Nyheter" />
<List menuItem="Hitta oss" {stores} />
<ContactForm menuItem="Kontakt" />
<Footer />
