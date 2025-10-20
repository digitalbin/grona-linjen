import { useLocation } from "@solidjs/router";
import GlbLogo from "./GlbLogo";
import Tap from "./Tap";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-glb-black flex items-center pl-4">
      <GlbLogo />
      {/* <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active('/')} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active('/about')} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
      </ul> */}
      <Tap />
    </nav>
  );
}
