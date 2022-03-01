<script>
    import Button from './Button.svelte';

    let email = 'Hej@hej.se';
    let message = `Tja asså fyfan vad schysst eran bira e den e så jävla god asså! Anyway asså fett sköna boys e ni så jävla nice öl och ni snackar om fett sköna grejer är de ok om jag bara hänger lite här eller?`;

</script>

<form>
    <label>
        <span>E-post</span>
        <input type="text" bind:value={email} />
    </label>
    <label>
        <span>Meddelande</span>
        <textarea bind:value={message} rows="5" />
    </label>
    
    <Button>Skicka</Button>
</form>

<style>
    form {
        @apply max-w-lg mx-auto w-full;
        @apply flex flex-col;
        @apply span-gutter;
    }
    input, textarea {
        @apply border-2 shadow rounded-sm rounded-tr-none px-4 py-2;
        @apply font-medium;
        @apply focus:shadow-lg focus:shadow-green outline-none;
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
</style>