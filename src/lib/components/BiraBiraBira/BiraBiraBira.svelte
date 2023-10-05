<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	export let menuItem: string;

	let Canvas: ComponentType;
	let Model: ComponentType;

	onMount(async () => {
		[Canvas, Model] = await Promise.all([
			import('./Canvas.svelte').then((m) => m.default),
			import('./Model.svelte').then((m) => m.default)
		]);
	});
</script>

<section class="grid gap-12" data-menu-item={menuItem}>
	<div class="gutter w-full">
		<h2>Av brokighet, för gemenskap.</h2>
		<p class="lg:w-1/2">
			Nu kan vi presentera vår kommande bira, biran <b>Bira Bira Bira.</b> Detta är ett släpp i
			samarbete med Gröna Linjen (ej att förväxla med Gröna Linjen), en ofiltrerad ljus lager.
			<b>Merch finnes!</b>
			<br />
			<a href="https://www.xn--grnalinjen-fcb.se/birabirabira" target="_blank">
				Läs mer hos gröna linjen
			</a>
		</p>
	</div>

	<svelte:component this={Canvas}>
		<svelte:component this={Model} />
	</svelte:component>
</section>
