import { onMount } from "solid-js";

export default function NotFound() {
  onMount(() => {
    window.location.replace('/')
  })
  return (
    <main class="grid place-content-center h-[calc(100vh-56px)]">
      <h1 class="t-h1 text-center">
        Whoops
      </h1>
    </main>
  );
}
