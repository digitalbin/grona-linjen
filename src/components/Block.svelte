<script>
    import { doodle } from '../actions/index';
    // export let id;
    // export let flip;
    export let block = [];
    let id = 'j'

    const texts = block.filter(({ type }) => type !== 'image');
    const image = block.find(({ type }) => type === 'image');

    const getText = ({ type, ...rest }) => {
        return rest[type]?.rich_text?.[0]?.plain_text || '';
    }
</script>

<section {id}>
    <div>
        {#each texts as text}
            {#if text.type === 'heading_2'}
                <h2>{getText(text)}</h2>
            {:else if text.type === 'paragraph'}
                <p>{getText(text)}</p>
            <!-- {:else}
                <span>{getText(text)}</span> -->
            {/if}
        {/each}
    </div>
    {#if image}
        <figure use:doodle>
            <img src={image?.image?.file?.url} alt={image?.image?.caption?.[0]?.plain_text} />
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
        @apply md:p-0;
    }

    figure {
        @apply relative;
    }

    section:nth-of-type(even) figure {
        @apply md:-order-1;
    }

    img {
		@apply w-full rounded-sm;
		@apply shadow;
	}

    :global(svg.doodle) {
        @apply text-green overflow-visible;
    }

</style>
