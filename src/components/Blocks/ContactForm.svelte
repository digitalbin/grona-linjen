<script lang="ts">
    import Notion from '../Notion/index.svelte';
	import Button from '../Button.svelte';

    export let children = [];
    export let id;
	
    let statusmessage;

    const handleRedo = () => statusmessage = null;
        
	const handleSubmit = async (e) => {
		const formData = new FormData(e.currentTarget);
		const url = 'https://formspree.io/f/xdobzyye';
        const response = await fetch(url, {
				method: 'POST',
				body: formData,
				headers: { Accept: 'application/json' }
			});

        if (!response.ok) statusmessage = 'Något gick helvete! Albe ska få fan för det här!';
        else statusmessage = 'Tackar!';
    }

</script>

<section {id}>
    <div>
        {#each children as child}
            <Notion block={child} />
        {/each}
    </div>
    {#if statusmessage}
        <p>{statusmessage}</p>
        <Button full on:click={handleRedo}>Nytt meddelande</Button>
    {:else}
        <form on:submit|preventDefault={handleSubmit}>
            <label>
                <span>E-post</span>
                <input type="text" name="email" />
            </label>
            <label>
                <span>Tel</span>
                <input type="text" name="phone" />
            </label>
            <label>
                <span>Meddelande</span>
                <textarea name="message" rows="5" />
            </label>
        
            <Button>Skicka</Button>
        </form>
    {/if}
</section>

<style lang="postcss">

    section {
        @apply span-gutter mx-auto max-w-4xl;
    }
    div {
        @apply mb-8 md:mb-16;
    }
	form {
		@apply flex flex-col max-w-lg mx-auto;
	}
	input,
	textarea {
		@apply border-2 shadow rounded-sm rounded-tr-none px-4 py-2;
		@apply font-medium;
		@apply focus:shadow-lg focus:shadow-green outline-none;
		@apply appearance-none;
	}
	label {
		@apply flex flex-col mb-8;
	}
	span {
		@apply border-2 border-b-0 px-4 py-1 w-max shadow rounded-t-sm font-bold bg-green;
	}
	label:focus-within span {
		@apply shadow-green;
	}
	p {
		@apply font-bold text-center mb-8 text-4xl;
	}
</style>
