<style>
    .container {
        position: relative;
        padding: 1rem;
    }

    .text-container {
        display: flex;
        justify-content: center;
        max-width: calc(100vw / 2);
        height: calc(100vh / 2);
        margin: 0 auto;
    }

    .text-left {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .text-right {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h3 {
        font-size: 2rem;
        display: inline-block;
        font-weight: bold;
    }

    .t1 {
        padding-right: 1rem;
    }

    .t2 {
        margin-top: 7rem;
        padding-left: 1rem;
        padding-top: 0.5rem;
    }

    .t3 {
        padding-top: 0.5rem;
        align-self: center;
    }

    p {
        font-size: 1rem;
        line-height: 1.618rem;
        margin-top: 1rem;
        padding-left: 1rem;
    }

    @media (max-width: 640px) {
        .container {
            padding: 2rem;
        }
        .text-container {
            max-width: unset;
            height: unset;
        }
        h3 {
            font-size: 1.1rem;
        }
        p {
            font-size: 0.9rem;
        }
    }
</style>

<script>
    import { onMount } from 'svelte';
    import anime from '../../lib/animejs';
    import SVG from './SVG.svelte';

    let t1;
    let t2;
    let t3;
    let container;
    let coords;

    let width;
    let height;

    const getBCR = (el) => {
        const { y: py } = container.getBoundingClientRect();
        const { width, height, x, y } = el.getBoundingClientRect();
        return {
            width,
            height,
            x: x,
            y: y - py,
        };
    };

    const updateCoords = () => {
        coords = {
            t1: getBCR(t1),
            t2: getBCR(t2),
            t3: getBCR(t3),
        };
        width = container.getBoundingClientRect().width;
        height = container.getBoundingClientRect().height;
    }

    onMount(() => {
        updateCoords();

    });

    const handleResize = () => {
        updateCoords();
        anime.set('.t1 .t2 .t3 .text-body', {
            scale: 0,
        });
    }

</script>

<svelte:window on:resize={handleResize} />
<div id="about" class="container" bind:this={container}>
    <div class="text-container">
        <div class="text-left">
            <h3 class="t1" bind:this={t1}>
                Vissa saker går <br />
                som på räls.
            </h3>
            <br />
            <h3 class="t3" bind:this={t3}>
                är inte <br />
                en av dem.
            </h3>
        </div>
        <div class="text-right">
            <h3 class="t2" bind:this={t2}>
                Vår brygg- <br />process till exempel
            </h3>
            <div class="text-body">
                <p>
                    Vi krånglar till det på alla möjliga sätt för att få till
                    den perfekta ölen. Och vi kan liksom inte koppla av förrän
                    vi har hittat receptet.
                </p>
                <p>
                    Kanske kommer vi rentav aldrig att hitta det. Men vi tror
                    att vi har kommit en liten bit på vägen.
                </p>
                <p>Prova vårt senaste experiment på RacaMaca.</p>
            </div>
        </div>
    </div>
    {#if coords}
        <SVG {coords} width={width} height={height} />
    {/if}
</div>
