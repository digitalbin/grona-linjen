<script>
	import { onMount } from 'svelte';
	import { scrollTo } from '../../../actions';

	export let id;
	export let label;
	export let onNavigation;

	let offset;

	onMount(() => {
		const header = document.querySelector('header').clientHeight;
		offset = -(header + 32);
	});
</script>

<li>
	<a href={`#${id}`} use:scrollTo={{ offset, onStart: onNavigation }}>
		{#each label.split('') as letter, i}
			{#if letter === ' '}
				{letter}
			{:else}
				<span>
					{letter}
				</span>
			{/if}
		{/each}
	</a>
</li>

<style>
	a {
		@apply relative block py-2 tracking-widest;
		@apply ring-0 outline-none;
	}
	span {
		@apply inline-block transition-transform;
	}
	a:hover span,
	a:focus span {
		@apply translate-y-2 rotate-12;
	}
	a:hover span:nth-child(odd),
	a:focus span:nth-child(odd) {
		@apply -translate-y-2 -rotate-12;
	}
</style>
