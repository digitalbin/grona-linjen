import {
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  PMREMGenerator,
} from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createCamera(width: number, height: number) {
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(2.5, -0.2, 0);
  return camera;
}

export function createRenderer(width: number, height: number) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

export async function createEnvironment(renderer: WebGLRenderer) {
  const textureLoader = new TextureLoader();
  const pmrem = new PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const texture = await textureLoader.loadAsync("/3d/environment_comp.webp");
  const envMap = pmrem.fromEquirectangular(texture).texture;

  texture.dispose();
  pmrem.dispose();

  return envMap;
}

export async function createBeerCanModel() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/3d/draco/");
  loader.setDRACOLoader(dracoLoader);

  const model = await loader.loadAsync("/3D/hipa_comp.glb");

  model.scene.position.y = -0.15;
  model.scene.rotation.y = -2;

  return model;
}

export function createControls(
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;
  return controls;
}
