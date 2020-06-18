<script>
    import Waves from './Waves.svelte';
    import Bubbles from './Bubbles.svelte';

    export let handleClick;
    export let isOpen;

</script>

<style>
    div.sidebar {
        width: 200px;
        height: 100%;
        position: fixed;
        transform: translateX(150%);
        transition: all .5s;
        right: 0; top: 0;
        background-color: var(--green);
    }

    div.sidebar.isOpen {
        transform: translateX(0);
    }

    div.menu-items {
        color: var(--black);
        padding-right: 1rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        right: 0;
        text-align: right;
    }

    p, a {
        margin: .5rem 0;
        cursor: pointer;
    }
</style>

<div class="sidebar" class:isOpen>
    <div class="menu-items">
        <a href="#start" on:click={handleClick}>Start</a>
        <a href="#about" on:click={handleClick}>Om oss</a>
        <a href="#selection" on:click={handleClick}>Utbud</a>
        <p>Beställ</p>
        <p>Instagram</p>
    </div>
    <Waves {isOpen} />
    <Bubbles />
</div>