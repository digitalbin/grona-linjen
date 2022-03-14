<script>
    import { doodle } from '../../actions/index';
    import Notion from '../Notion/index.svelte';
    export let children = [];
    let id = 'j'

    const texts = children.filter(({ type }) => type !== 'image');
    const image = children.find(({ type }) => type === 'image');

</script>

<section {id}>
    <div>
        {#each texts as text}
            <Notion block={text} />
        {/each}
    </div>
    {#if image}
        <figure use:doodle>
            <Notion class="rounded-sm shadow" block={image} />
        </figure>
    {/if}
</section>

<style>
	section {
		@apply bg-white w-full;
        @apply grid grid-cols-1 md:grid-cols-2;
        @apply gap-16;
        @apply span-gutter;
	}

    div {
        @apply col-span-1 relative z-10;
    }

    section:nth-of-type(even) figure {
        @apply md:-order-1;
    }

    :global(svg.doodle) {
        @apply text-green overflow-visible;
    }

</style>
