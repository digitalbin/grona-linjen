import { onMount } from "solid-js";

export default function NotFound() {
  onMount(() => {
    window.location.replace("/");
  });
  return (
    <div class="h-screen-header grid place-content-center">
      <h1 class="t-h1 text-center">Whoops</h1>
    </div>
  );
}
