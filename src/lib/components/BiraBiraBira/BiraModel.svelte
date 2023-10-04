<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { OrbitControls, useGltf, Environment } from '@threlte/extras';

	let rotation = 0;

	const gltf = useGltf('/3D/birabirabira.glb');

	useFrame((_, delta) => {
		rotation += delta * 0.4;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 3.5]} rotation={3.14}>
	<OrbitControls enableDamping enableZoom={false} />
</T.PerspectiveCamera>
<Environment files={'/3D/environment.hdr'} />

{#await gltf then gltf}
	<T is={gltf.scene} rotation.y={rotation} />
{/await}
