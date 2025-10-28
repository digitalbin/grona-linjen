import GlbLogo from "./GlbLogo";
import Drawer from "./Drawer";
import Cursor from "./Cursor";
import { useWindowSize } from "@/hooks";
import { clientOnly } from "@solidjs/start";

const Inner = clientOnly(async () => ({
  default: () => {
    const windowSize = useWindowSize();
    const hideCursor = () => windowSize().width < 678;

    return (
      <>
        {!hideCursor() && <Cursor />}
        <GlbLogo />
        <Drawer />
      </>
    );
  },
}));

export default function Header() {
  return (
    <>
      <header class="bg-glb-black sticky inset-x-0 top-0 z-50 flex h-(--header-height) items-center pl-4">
        <Inner />
      </header>
    </>
  );
}
