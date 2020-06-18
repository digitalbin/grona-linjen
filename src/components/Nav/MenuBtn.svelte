<script>
    export let handleClick;
    export let isOpen;
</script>

<style>
    button {
        width: 4rem;
        height: 4rem;
        padding: 0;
        outline: none;
        z-index: 1;
    }
    svg {
        fill: none;
        stroke: var(--white);
        transition: all .5s;
    }
    g.lever {
        transition: transform .5s;
        transform-origin: 44.7% 72.6%;
    }

    button.isOpen svg {
        stroke: var(--black);
    }
    button.isOpen g {
        transform: rotate(-30deg);
    }
</style>

<button on:click={handleClick} class:isOpen>
    <svg viewBox="0 0 385 383" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M289.999 246C298.52 229.858 307.324 224.863 331.999 225C332.83 191.267 342.354 181.989 374.999 182V277.5L374.999 373C342.353 373.011 332.83 363.733 331.999 330C307.324 330.137 298.52 325.142 289.999 309M289.999 246V277.5L289.999 309M289.999 246H213.499M289.999 309H213.499"
            stroke-width="20"
        />
        <path
            d="M130.5 246.5H90C45.8172 246.5 10 282.317 10 326.5V373H76V318C76 315.239 78.2386 313 81 313H130.5"
            stroke-width="20"
        />
        <g class="lever">
            <path
                d="M151 224L119 86.5C117.629 40.895 124.901 20.7772 162.162 12.0849C169.271 10.4263 176.729 10.4263 183.838 12.0849C221.099 20.7772 228.371 40.895 227 86.5L195 224"
                stroke-width="20"
            />
            <circle cx="172" cy="278" r="53" stroke-width="20" />
        </g>
    </svg>
</button>