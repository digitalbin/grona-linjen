<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Draw from '../components/Draw.svelte';
	import InteractiveLogo from '../components/InteractiveLogo/Start.svelte';
</script>

<svelte:head>
	<title>Hem</title>
</svelte:head>

<InteractiveLogo />
<!-- <Draw /> -->

<!-- <div />
<div />
<div />
<div /> -->
<div>
	<h2>Här var det bira</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>

	<h2>Hoppsan ojsan</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>

	<h2>Nu dricker du upp den där jävla ölen</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
	
	<h2>Ja men köp en ny då?</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
	
	<h2>Äntligen fredag</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
	
	<h2>Men det är ju bara tisdag?</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
	
	<h2>Skiter jag i, mvh Kjell</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
	
	<h2>Drick Gröna Linjen idag!</h2>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias laboriosam dolorem quae. Nihil sint porro eveniet?</p>
</div>

<style>
	div {
		padding: 1rem .5rem;
		color: var(--white);
		height: 800px;
		max-width: 1290px;
		margin: 0 auto;
		color: var(--black);
	}

	div:nth-of-type(even) {
		/* background-color: var(--white); */
	}

	h2 {
		font-weight: 700;
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	h2:nth-of-type(odd) {
		text-align: right;
	}

	p:nth-of-type(odd) {
		text-align: end;
	}
	p {
		margin-bottom: 20rem;
		line-height: 1.4;
	}
</style>
