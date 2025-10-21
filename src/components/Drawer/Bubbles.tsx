import { random, animate, stagger } from "animejs";
import { For, onMount } from "solid-js";

const bubbles = Array(10)
  .fill(true)
  .map(() => ({
    r: random(2, 5),
    cx: 50 + "%",
  }));

export default function Bubbles() {
  console.log(bubbles);

  onMount(() => {
    animate(".bubble", {
      autoplay: true,
      x: [
        {
          to: () => random(-50, 50) + "%",
          ease: "inOutSine",
        },
        {
          to: () => random(-50, 50) + "%",
          ease: "inOutSine",
        },
      ],
      y: [{ from: "10%", to: "-100%", ease: "inOutSine" }],
      delay: stagger(700, { start: 0 }),
      duration: 3000,
      loop: true,
    });
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none absolute h-full w-full border-2 fill-white/65"
    >
      <For each={bubbles}>
        {(bubble) => (
          <circle
            class="bubble"
            cx={bubble.cx}
            cy="95%"
            r={bubble.r}
            stroke="none"
          />
        )}
      </For>
    </svg>
  );
}
