import type { JSX } from "solid-js";

export function H2({ children }: { children: JSX.Element }) {
  return (
    <h2 class="mb-4 text-4xl font-bold md:text-5xl md:leading-14">
      {children}
    </h2>
  );
}

export function P({ children }: { children: JSX.Element }) {
  return <p class="text-xl leading-7">{children}</p>;
}
