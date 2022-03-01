<script>
    export let secondary = false;
    // export let ;
</script>

<button class:secondary>
    <slot />
</button>

<style>
    button {
        @apply bg-green text-black font-bold text-2xl px-6 py-2;
        @apply shadow rounded-sm border-2 border-black;
        @apply hover:shadow-lg focus:shadow-lg outline-none;
        @apply active:shadow-sm;
    }

    button.secondary {
        @apply bg-gray-light text-black border-2;
    }
</style>