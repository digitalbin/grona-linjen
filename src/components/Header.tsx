import GlbLogo from "./GlbLogo";
import Drawer from "./Drawer";
import { useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import CartButton from "./CartButton";

export default function Header() {
  const location = useLocation();

  return (
    <header class="bg-glb-black sticky inset-x-0 top-0 z-50 flex h-(--header-height) items-center pl-4">
      <GlbLogo />
      <div class="ml-auto h-full">
        <Show when={location.pathname === "/"}>
          <Drawer />
        </Show>
        <Show when={location.pathname.includes("/shop")}>
          <CartButton />
        </Show>
      </div>
    </header>
  );
}
