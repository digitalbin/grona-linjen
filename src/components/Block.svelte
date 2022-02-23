<script>
import { onMount } from 'svelte';

    import { useViewportScroll, useTransform } from 'svelte-motion'
    import Doodle from './Doodle.svelte';

    export let right = false;

    const { scrollY } = useViewportScroll();

    let el;
    let innerHeight;
    let scrollProgress;
    let min;
    let max;

    onMount(() => {
        const { height } = el.getBoundingClientRect();
        const offsetTop = el.offsetTop;
        min = offsetTop - innerHeight + height;
        max = offsetTop;
    })

    scrollY.subscribe(scroll => {
        const percent = (scroll - min) / (max - min);
        scrollProgress = Math.min(1, Math.max(0, percent));
    })

</script>

<svelte:window bind:innerHeight={innerHeight} />
<div bind:this={el} class:right>
    <Doodle progress={scrollProgress} />
	<slot />
</div>

<style>
    div {
        @apply relative my-12 px-4;
    }
    div.right {
        @apply text-right;
    }
</style>