import GlbLogo from "./GlbLogo";
import Drawer from "./Drawer";
import Cursor from "./Cursor";
import { useWindowSize } from "@/hooks";

export default function Header() {
  const windowSize = useWindowSize();
  const hideCursor = () => windowSize().width < 678;

  return (
    <>
      {!hideCursor() && <Cursor />}
      <header class="bg-glb-black sticky inset-x-0 top-0 z-50 flex h-(--header-height) items-center pl-4">
        <GlbLogo />
        <Drawer />
      </header>
    </>
  );
}
