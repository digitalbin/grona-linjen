<script>
    import Button from './Button.svelte';

    let email = 'köpare@cool-bar.se';
    let tel = '+46 70 133 74 20';
    let message = `Tja! Folk är helt galna i Gröna Linjen Gullmars IPA! Sålde slut på 16 minuter! Jag kommer behöva 40 tunnor till ASAP. \nRING MIG!!!`;

</script>

<form>
    <label>
        <span>E-post</span>
        <input type="text" bind:value={email} />
    </label>
    <label>
        <span>Tel</span>
        <input type="text" bind:value={tel} />
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
</style>