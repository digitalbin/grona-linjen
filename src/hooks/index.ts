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

export function useClickOutside(
  ref: () => HTMLElement | undefined,
  handler: (e: MouseEvent) => void,
) {
  createEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref() || ref()!.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    onCleanup(() => document.removeEventListener("mousedown", listener));
  });
}
