<script>
    import { onMount } from 'svelte';
    import anime from '../../lib/animejs';

    export let coords;
    export let width;
    export let height;

    let svgEl;

    const r = 30;
    const base = 10;
    const speed = 0.1

    const prevH = coords.t2.x - r - base;
    const lastH = coords.t3.x + coords.t3.width / 2 + r;
    const shouldShowLastH = prevH > lastH;

    let anim;

    onMount(() => {
        anim = anime.timeline({
        easing: 'linear',
        autoplay: false,
        }).add({
            targets: '.t1',
            opacity: [0, 1],
            duration: 1000,
        })
        .add({
            targets: '#path1',
            opacity: [0, 1],
            duration: (el) => {
                const distance = anime.setDashoffset(el);
                return distance / speed;
            },
            strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
            targets: '.t2',
            opacity: [0, 1],
            duration: 1000,
        })
        .add({
            targets: '#path2',
            opacity: [0, 1],
            duration: (el) => {
                const distance = anime.setDashoffset(el);
                return distance / speed;
            },
            strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
            targets: '.t3',
            opacity: [0, 1],
            duration: 1000,
        })
        .add({
            targets: '.text-body',
            opacity: [0, 1],
            duration: 1000,
        });
    });

    const percentageSeen = (element) => {
        // Get the relevant measurements and positions
        const viewportHeight = window.innerHeight / 2;
        const scrollTop = window.scrollY;
        const { top, height } = element.getBoundingClientRect();

        // Calculate percentage of the element that's been seen (with 100 offset)
        const distance = scrollTop + viewportHeight - top - 100;
        const percentage = distance / (viewportHeight + height);

        return percentage;
    };

    const handleScroll = () => {
        const percent = percentageSeen(svgEl);
        anim.seek(anim.duration * percent)
    }

</script>

<style>
    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0; right: 0; bottom: 0; left: 0;
        display: block;
        stroke: var(--green);
        pointer-events: none;
    }
</style>

<svelte:window on:scroll={handleScroll} />
<svg bind:this={svgEl} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        id="path1"
        stroke-width="10"
        d={`
            M ${coords.t1.x + coords.t1.width} ${coords.t1.y + coords.t1.height / 2}
            H ${coords.t2.x + coords.t2.width / 2 - r}
            a ${r} ${r} 0 0 1 ${r} ${r}
            V ${coords.t2.y}
        `}
    />
    <path
        id="path2"
        stroke-width="10"
        d={`
            M ${coords.t2.x} ${coords.t2.y + coords.t2.height / 2}
            H ${coords.t1.x + r}
            a ${-r} ${-r} 0 0 0 ${0} ${r * 2}
            H ${coords.t2.x - r - base}
            a ${r} ${-r} 0 0 1 ${0} ${r * 2}
            ${shouldShowLastH ? `H ${coords.t3.x + coords.t3.width / 2 + r}` : ''}
            a ${-r} ${r} 0 0 0 ${-r} ${r}
            V ${coords.t3.y}
        `}
    />
</svg>

<!-- stroke-dashoffset="152.00558471679688"
stroke-dasharray="152.00558471679688"
stroke-dashoffset="521.2130126953125"
stroke-dasharray="521.2130126953125" -->