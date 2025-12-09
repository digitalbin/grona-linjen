import { createSignal, For, onMount } from "solid-js";

const width = 66;
const height = 500;
const wavesAmount = 3;
const waveDuration = 2000;

function waveCreator(width: number, height: number) {
  let frequency = Math.random() * 0.05;
  let amplitude = Math.random() * (width / 2);
  let phase = Math.random() * 50;

  let pathData = `M ${width} 0`;

  for (let y = 0; y < height; y++) {
    const x = amplitude * Math.sin(frequency * y + phase) + width / 2;
    pathData += `L ${x} ${y}`;
  }

  pathData += `L ${width} ${height} L ${width} 0 Z`;

  return pathData;
}

const paths = Array.from({ length: wavesAmount }, () =>
  createSignal<string>(waveCreator(width, height)),
);

export default function Waves() {
  onMount(() => {
    setTimeout(() => {
      paths.forEach(([_, setWavePath]) => {
        setWavePath(waveCreator(width, height));
      });
    }, 100);
  });
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      class="fill-glb-green -mr-px h-screen w-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="waves"
    >
      <For each={paths}>
        {([wavePath, setWavePath], i) => (
          <path
            class="fill-glb-green"
            style={{
              transition: `d ${waveDuration}ms linear`,
              "transition-delay": `${i() * (waveDuration / wavesAmount)}ms`,
            }}
            d={wavePath()}
            opacity={1 - i() / wavesAmount}
            onTransitionEnd={() => {
              setWavePath(waveCreator(width, height));
            }}
          />
        )}
      </For>
    </svg>
  );
}
