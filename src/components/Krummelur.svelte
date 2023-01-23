<script>
    import { inview } from 'svelte-inview';
    import { draw } from '../transitions';
    let isInView = false;
    const handleInView = (e) => isInView = e.detail.inView;
</script>

<section use:inview on:change={handleInView}>
    <svg width="373" height="200" viewBox="0 0 373 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {#if isInView}
            <path
                in:draw={{ duration: 5000 }}
                d="M312.5 200.5C312.5 105.5 356.88 69.8393 285.5 63.5C244.826 59.8877 231.927 -5.6605 215 31.5C186.763 93.4914 277.169 183.803 333.5 145.5C383.071 111.793 375.544 63.2289 333.5 20.5C273.554 -40.4218 295.109 204.197 217 169.5C158.115 143.342 209.671 33.5457 149.5 10.5C73.6107 -18.5658 93.948 202.719 22.4999 164C-8.86982 147 9.36278 97.2257 35.9998 67.5C71.1556 28.2678 104.751 72.3453 137 114C161 145 175.723 172.562 137 185C74.8743 204.955 34.7672 81.2124 32.5 16C32.2829 9.75539 32.5 0 32.5 0"
                stroke="#00F148"
                stroke-width="5"
            />
        {/if}
    </svg>
</section>

<style lang="postcss">
    section {
        @apply span-gutter -my-32;
    }
    svg {
        @apply w-full h-full scale-[-1];
    }
</style>
