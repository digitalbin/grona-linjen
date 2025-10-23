import { For } from "solid-js";
import s from "./Bubbles.module.css";

const singleDuration = 3000;
const singleDelay = singleDuration / 3;
const bubbleAmount = singleDuration / singleDelay;
const bubbleStart = 110;

const getCx = () => Math.random() * 100 + "%";
const getR = () => `${Math.random() * (5 - 2) + 2}`;
const getWiggle = () => Math.random() * (15 - 1) + 1 + "px";

const bubbles = Array.from({ length: bubbleAmount }, () => ({
  r: getR(),
  cx: getCx(),
  cy: bubbleStart + "%",
}));

export default function Bubbles() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none absolute h-full w-full fill-white/65"
    >
      <For each={bubbles}>
        {(bubble, i) => {
          return (
            <circle
              class={s.bubble}
              cx={bubble.cx}
              cy={bubble.cy}
              r={bubble.r}
              style={{
                "animation-delay": i() * singleDelay + "ms",
              }}
              onAnimationIteration={(e) => {
                const t = e.currentTarget;
                t.style.cx = getCx();
                t.style.r = getR();
                t.style.setProperty("--wiggle", getWiggle());
              }}
            />
          );
        }}
      </For>
    </svg>
  );
}
