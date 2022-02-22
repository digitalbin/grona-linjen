<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Connector from '../components/Connector/Connector.svelte';
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

<Connector />
<div>
	<p data-connect>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<p data-connect>Voluptatibus debitis blanditiis molestiae magni hic, necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
	<p data-connect>Non id alias dolores. Consequatur, in!</p>
	<p data-connect>Necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
	<p data-connect>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<p data-connect>Voluptatibus debitis blanditiis molestiae magni hic, necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
	<p data-connect>Non id alias dolores. Consequatur, in!</p>
	<p data-connect>Necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
	<p data-connect>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<p data-connect>Voluptatibus debitis blanditiis molestiae magni hic, necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
	<p data-connect>Non id alias dolores. Consequatur, in!</p>
	<p data-connect>Necessitatibus incidunt assumenda molestias sequi, ut sunt atque mollitia commodi.</p>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-auto-flow: column;
	}
	p {
		/* background: var(--black); */
		padding: 10px;
		grid-column: span 1;
	}
</style>
