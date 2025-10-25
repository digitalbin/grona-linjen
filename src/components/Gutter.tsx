import type { JSX } from "solid-js";

export default function Gutter(props: { children: JSX.Element }) {
  return <div class="mx-auto w-full max-w-7xl px-4">{props.children}</div>;
}
