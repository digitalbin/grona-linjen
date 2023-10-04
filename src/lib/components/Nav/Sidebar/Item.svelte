<script lang="ts">
	import smoothscroll from 'smoothscroll-polyfill';
	smoothscroll.polyfill();

	export let onNavigation: () => void;
	export let offset: number;
	export let destinationNode: Element;
	const element = destinationNode as HTMLElement;
	const label = element.dataset.menuItem;

	function handleClick(e: MouseEvent) {
		if (e.cancelable) e.preventDefault();
		onNavigation();

		window.scrollTo({
			top: element.offsetTop + offset,
			behavior: 'smooth'
		});
	}
</script>

{#if label}
	<li>
		<a href={'#'} on:click={handleClick}>
			{#each label.split('') as letter}
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
{/if}

<style lang="postcss">
	a {
		@apply relative block py-2 tracking-widest;
		@apply ring-0 outline-none;
		@apply whitespace-nowrap;
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
