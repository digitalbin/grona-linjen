import { onMount } from "solid-js";

export default function NotFound() {
  onMount(() => {
    window.location.replace("/");
  });
  return (
    <main class="grid h-[calc(100vh-56px)] place-content-center">
      <h1 class="t-h1 text-center">Whoops</h1>
    </main>
  );
}
