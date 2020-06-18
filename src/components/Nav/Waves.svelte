<script>
    import { onMount } from 'svelte';
    import anime from '../../lib/animejs';
    import getPath from '../../lib/wave';

    export let isOpen;

    const waveDepth = 50;
    const wavesAmount = 3;
    const complexity = 10;
    const waveDuration = 20000;

    const getPoints = (length = 21) => {
        const arr = Array(length)
            .fill(true)
            .map((f, i, org) => {
                const isFirst = i === 0;
                const x = isFirst ? waveDepth : anime.random(0, waveDepth);
                return [x, i * (1000 / length)];
            });
        return [...arr, [waveDepth, 1000]];
    };

    const wavePaths = Array(wavesAmount)
        .fill(true)
        .map(() => Array(complexity)
            .fill(true)
            .map(() => getPath(getPoints(complexity)))
        );

    let animations = [];

    $: {
        animations.forEach((animation) => {
            if (isOpen) {
                animation.play();
            } else {
                animation.pause();
            }
        })
    }

    onMount(() => {
        animations = wavePaths.map((wp, i) => (
            anime({
                targets: `.waves${i}`,
                d: wp,
                loop: true,
                autoplay: false,
                easing: 'linear',
                direction: 'alternate',
                duration: anime.random(waveDuration / 2, waveDuration),
            })
        ))
    });
</script>

<style>
    svg {
        fill: var(--green);
        height: 100%;
        stroke: none;
        position: absolute;
        right: calc(100% - 1px);
        bottom: 0;
    }
</style>

<svg
    viewBox="0 0 {waveDepth} 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    {#each wavePaths as wavePath, i}
        <path
            class="waves{i}"
            d={wavePath[wavePath.length - 1]}
            opacity={1 - i / 10 * 2}
        />
    {/each}
</svg>