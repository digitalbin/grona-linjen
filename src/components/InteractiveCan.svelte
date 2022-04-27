<script lang="ts">
    import { onMount } from 'svelte'
    import * as SC from 'svelte-cubed'
    import * as THREE from 'three'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  
    let model: THREE.Group
    onMount(async () => {
      model = (await new GLTFLoader().loadAsync('/can.glb')).scene
    })

    const intensity = .2;
    const lightPos = 10;

  </script>
  
  <section>
    <SC.Canvas
      antialias
      background={new THREE.Color('#05050F')}
      outputEncoding={THREE.sRGBEncoding}
    >
  
      {#if model}
        <SC.Primitive object={model} rotation={[-0.3, 3, 0]} />
      {/if}
  
      <SC.PerspectiveCamera position={[0, 0, .4]} />
      <SC.OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={-10} />

      <SC.DirectionalLight {intensity} position={[0, 0, lightPos]} />
      <SC.DirectionalLight {intensity} position={[0, 0, -lightPos]} />

      <SC.DirectionalLight {intensity} position={[0, lightPos, 0]} />
      <SC.DirectionalLight {intensity} position={[0, -lightPos, 0]} />

      <SC.DirectionalLight {intensity} position={[lightPos, 0, 0]} />
      <SC.DirectionalLight {intensity} position={[-lightPos, 0, 0]} />
    </SC.Canvas>
</section>
  
  <style>
      section {
          @apply span-full relative aspect-square md:aspect-video;
      }
  </style>
  