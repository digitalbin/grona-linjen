<script lang="ts">
    export let secondary = false;
    export let full = false;
    
</script>

<button on:click class:secondary class:w-full={full}>
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