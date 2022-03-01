<script>
    import { flip } from 'svelte/animate';
    import { onMount } from 'svelte';
    let arr = Array(4).fill().map((_, i) => i);
</script>

<section>
    {#each arr as t}
        <span>BARA BRA BÄRS®</span>
    {/each}
</section>

<style>
    section {
        @apply span-full bg-black overflow-hidden;
        @apply py-16;
    }
    svg {
        @apply text-white max-w-7xl mx-auto;
    }
</style>