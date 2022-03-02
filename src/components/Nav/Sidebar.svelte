<script>
	import { fly } from 'svelte/transition';
	import { draw } from '../../transitions';
	import { onMount } from 'svelte';
	import Waves from './Waves.svelte';
	import Bubbles from './Bubbles.svelte';
	import { scrollTo, clickOutside } from '../../actions';

	export let isOpen;
	export let toggleOpen;
	let offset;
	let hovered = null;
	let w;

	const sections = [
		{
			id: 'start',
			label: 'Start'
		},
		{
			id: 'about',
			label: 'Om oss'
		},
		{
			id: 'selection',
			label: 'Utbud'
		},
		{
			id: 'contact',
			label: 'Kontakt'
		}
	];

	onMount(() => {
		const header = document.querySelector('header').clientHeight;
		offset = -(header + 32);
	})

	const handleClickOutside = (e) => {
		if (e.target.id !== 'menuBtn') toggleOpen();
	}

	const onStart = () => {
		hovered = null;
		toggleOpen();
	}

	const hoverPaths = [
		"M2.5 12.5C2.5 12.5 9.50376 5.06384 17.5 5.5C24.669 5.89104 22.8337 11.4388 30 11C36.3394 10.6119 38.1487 2.5 44.5 2.5C50.8513 2.5 46.6606 10.6119 53 11C60.1663 11.4388 61.8584 6.2388 69 5.50001C77.7896 4.59074 73.2293 11.0771 82 10C88.8521 9.15851 84.7184 4.20827 91.5 5.50001C96.1115 6.37839 98.3725 9.20995 103 10C109.533 11.1154 108.412 6.22279 115 5.50001C123.099 4.61146 130 12.5 130 12.5",
		"M2.5 17.5L16.2929 3.70711C16.6834 3.31658 17.3166 3.31658 17.7071 3.70711L29.2929 15.2929C29.6834 15.6834 30.3166 15.6834 30.7071 15.2929L40.7929 5.20711C41.1834 4.81658 41.8166 4.81658 42.2071 5.20711L52.2929 15.2929C52.6834 15.6834 53.3166 15.6834 53.7071 15.2929L65.2929 3.70711C65.6834 3.31658 66.3166 3.31658 66.7071 3.70711L81.2929 18.2929C81.6834 18.6834 82.3166 18.6834 82.7071 18.2929L93.7929 7.20711C94.1834 6.81658 94.8166 6.81658 95.2071 7.20711L102.293 14.2929C102.683 14.6834 103.317 14.6834 103.707 14.2929L114.305 3.69522C114.691 3.30937 115.315 3.30408 115.707 3.68334L130 17.5",
		"M2.5 13C2.5 13 9.00376 9.56384 17 10C24.169 10.391 21.8337 6.43875 29 6C35.3394 5.61188 35.1487 10 41.5 10C47.8513 10 45.6606 5.61188 52 6C59.1663 6.43875 55.8584 12.7388 63 12C71.7896 11.0907 65.2293 4.5771 74 3.5C80.8521 2.65852 80.2184 7.70827 87 9.00001C91.6115 9.87839 95.3725 2.70995 100 3.5C106.533 4.61537 109.912 9.72278 116.5 9C124.599 8.11145 130.5 12 130.5 12",
	]

	const getRandomHoverPath = () => hoverPaths[Math.floor(Math.random() * hoverPaths.length)];

</script>

{#if isOpen}
	<nav use:clickOutside={handleClickOutside} bind:clientWidth={w} transition:fly={{ x: w, opacity: 1 }}>
		<Waves />
		<ul>
			{#each sections as { id, label }, i}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<li
					on:mouseleave={() => hovered = null}
					on:mouseover={() => hovered = i}
				>
					<a href={`#${id}`} use:scrollTo={{ offset, onStart }}>{label}</a>
					<svg width="133" height="21" viewBox="0 0 133 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						{#if hovered === i}
							<path transition:draw={{ duration: 400 }} d={getRandomHoverPath()} stroke-width="5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
						{/if}
					</svg>
				</li>
			{/each}
		</ul>
		<Bubbles />
	</nav>
{/if}

<style>
	nav {
		@apply h-screen
			fixed
			inset-0
			left-auto
			text-black
			font-bold
			text-4xl;
		@apply flex justify-around;
	}

	ul {
		@apply flex flex-col gap-6 items-end bg-green flex-1;
		@apply pt-32 p-8;
	}
	
	
	li {
		@apply overflow-hidden relative pb-4;
	}

	svg {
		@apply absolute right-0 top-1/2;
	}

</style>
