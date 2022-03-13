<script>
    export let content;
    const { type, image, paragraph, heading_2 } = content;
</script>

{#if type === 'image'}
    <img slot="image" src={image.File.url} />
{:else if type === 'heading_2'}
    <h2>{heading_2.rich_text[0].plain_text}</h2>
{:else if type === 'paragraph'}
    <p>{paragraph.rich_text[0].plain_text}</p>
{/if}