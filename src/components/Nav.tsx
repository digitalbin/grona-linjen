import GlbLogo from "./GlbLogo";
import Drawer from "./Drawer";
import Cursor from "./Cursor";
import { useWindowSize } from "@/hooks";

export default function Nav() {
  const windowSize = useWindowSize();
  const hideCursor = () => windowSize().width < 678;

  return (
    <>
      {!hideCursor() && <Cursor />}
      <nav class="bg-glb-black fixed inset-x-0 top-0 z-50 flex items-center pl-4">
        <GlbLogo />
        <Drawer />
      </nav>
    </>
  );
}
