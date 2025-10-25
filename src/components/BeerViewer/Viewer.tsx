import { onCleanup, onMount } from "solid-js";
import { Mesh, Scene } from "three";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import {
  createCamera,
  createRenderer,
  createEnvironment,
  createBeerCanModel,
  createControls,
} from "./threeUtils";

let ref: HTMLDivElement | undefined;

export default function Viewer() {
  onMount(() => {
    if (!ref) return;
    const { width, height } = ref.getBoundingClientRect();

    const scene = new Scene();
    const camera = createCamera(width, height);
    const renderer = createRenderer(width, height);
    createEnvironment(renderer).then((envMap) => {
      scene.environment = envMap;
    });

    let beerCan: GLTF;
    createBeerCanModel().then((_beerCan) => {
      beerCan = _beerCan;
      scene.add(beerCan.scene);
    });

    const controls = createControls(camera, renderer);

    ref.appendChild(renderer.domElement);

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      if (beerCan) beerCan.scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    onCleanup(() => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      controls.dispose();

      beerCan.scene.traverse((obj) => {
        if (obj instanceof Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      scene.clear();
    });
  });

  return <div ref={ref} class="relative h-full w-full" />;
}
