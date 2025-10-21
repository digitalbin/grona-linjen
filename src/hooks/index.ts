import { createEffect, createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

const [windowSize, setWindowSize] = createSignal({ width: 0, height: 0 });

function setWindowSizeHandler() {
  if (isServer) return;
  setWindowSize({ width: window.innerWidth, height: window.innerHeight });
}

export function useWindowSize() {
  if (isServer) return windowSize;

  createEffect(() => {
    setWindowSizeHandler();
    window?.addEventListener("resize", setWindowSizeHandler, { passive: true });
  });

  onCleanup(() => {
    window?.removeEventListener("resize", setWindowSizeHandler);
  });

  return windowSize;
}
