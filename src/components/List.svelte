<script>
    export let items = [];

    const groupedItems = items.reduce((acc, nxt) => {
        const type = nxt.properties.type.title[0].plain_text;
        if (acc[type]) {
            return { ...acc, [type]: [...acc[type], nxt] }
        } else {
            return {
                ...acc,
                [type]: [nxt]
            }
        }
    }, {});
    console.log(groupedItems);
</script>

<section>
    <h2>Gröna Linjen längs linjen - här finns vi</h2>
    {#each Object.entries(groupedItems) as [title, items]}
        <h3>{title}</h3>
        <ul>
            {#each items as { properties }}
                <li>
                    {!console.log(properties)}
                    hej
                </li>
            {/each}
        </ul>
    {/each}
</section>

<style>
    section {
        @apply span-gutter;
    }
</style>