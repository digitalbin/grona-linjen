<script>
	import Button from './Button.svelte';
	
    let statusmessage;

    const handleRedo = () => statusmessage = null;
        
	const handleSubmit = async (e) => {
		// const formData = new FormData(e.currentTarget);
		// const url = 'https://formspree.io/f/xdobzyye';
        // const response = await fetch(url, {
		// 		method: 'POST',
		// 		body: formData,
		// 		headers: { Accept: 'application/json' }
		// 	});

        // if (!response.ok) statusmessage = 'Något gick helvete! Albe ska få fan för det här!';
        // else statusmessage = 'Tackar!';
        statusmessage = 'Tackar!';
    }
</script>

<div>
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
</div>

<style>

    div {
        @apply span-gutter max-w-lg w-full mx-auto;
    }
	form {
		@apply flex flex-col;
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
