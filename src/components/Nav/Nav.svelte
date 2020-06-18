<script>
    import anime from '../../lib/animejs';
    import MenuBtn from './MenuBtn.svelte';
    import Sidebar from './Sidebar.svelte';

    let isOpen = false;

    const handleClick = () => {
        isOpen = !isOpen
    }

</script>

<style>
    nav {
        background-color: transparent;
        position: fixed;
        top: 0; right: 0; left: 0;
        padding: 1rem;
        padding-right: 0;
        display: flex;
        justify-content: flex-end;
        z-index: 100;
    }

</style>

<nav>
    <MenuBtn {handleClick} {isOpen} />
    <Sidebar {handleClick} {isOpen} />
</nav>