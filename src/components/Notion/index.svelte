<script>
    import Textual from './Textual.svelte';
    import P from './P.svelte';
    import H2 from './H2.svelte';
    import H3 from './H3.svelte';
    import Li from './Li.svelte';
    import Img from './Img.svelte';

    export let block = {};
    const { type } = block;

    const elementMapper = {
        paragraph: P,
        heading_2: H2,
        heading_3: H3,
        bulleted_list_item: Li,
        image: Img,
    }

    const component = elementMapper[type];

    if (!component) console.log('No component: ', type);

</script>

{#if component}
    {#if type === 'image'}
        <svelte:component {...$$restProps} data={block[type]} this={component} />
    {:else}
        <svelte:component {...$$restProps} this={component}>
            <Textual {block} />
        </svelte:component>
    {/if}
{/if}