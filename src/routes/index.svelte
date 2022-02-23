<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Draw from '../components/Draw.svelte';
	import Block from '../components/Block.svelte';
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
	<Block>
		<h2>Här var det bira</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/kall_bira.jpg" />
	<Block right>
		<h2>Hoppsan ojsan vilken lång rubrik</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/plywood.jpg" />
	<Block>
		<h2>Nu dricker du upp den där jävla ölen</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/bagis_belma.jpg" />
	<Block right>
		<h2>Ja men köp en ny då?</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/tapp.jpg" />
	<Block>
		<h2>Äntligen fredag</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/gullmars.jpg" />
	<Block right>
		<h2>Men det är ju bara tisdag?</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
	<img src="/medis.jpg" />
	<Block>
		<h2>Skiter jag i, mvh Kjell</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>

	<Block right>
		<h2>Drick Gröna Linjen idag!</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellat at maxime
			explicabo temporibus iure, illo soluta doloremque cum perferendis tempora qui molestias
			laboriosam dolorem quae. Nihil sint porro eveniet?
		</p>
	</Block>
</div>

<style>
	/* div {
		padding: 1rem 0.5rem;
		color: var(--white);
		height: 800px;
		max-width: 1290px;
		margin: 0 auto;
		color: var(--black);
	} */

	h2 {
		@apply font-bold text-4xl mb-4;
	}

	p {
		@apply mb-2;
	}

</style>
