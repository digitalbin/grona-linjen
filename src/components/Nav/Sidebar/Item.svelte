<script lang="ts">
	import { scrollTo } from '../../../actions';

	export let id: string;
	export let label: string;
	export let onNavigation: () => void;
	export let offset: number;

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
