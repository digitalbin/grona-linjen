<script lang="ts">
	import { Canvas } from '@threlte/core';
	import BiraModel from './BiraModel.svelte';
</script>

<div class="aspect-square md:aspect-video relative overflow-hidden">
	<video class="absolute w-full h-full -z-10 object-cover" autoplay muted loop>
		<source src="/3D/birabirabira_infinity.mp4" />
		<track kind="captions" />
	</video>
	<Canvas>
		<BiraModel />
	</Canvas>
</div>
