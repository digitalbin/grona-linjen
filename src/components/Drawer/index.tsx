import { createSignal } from "solid-js";
import Tap from "./Tap";
import Menu from "./Menu";

export default function Drawer() {
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  return (
    <>
      <Tap isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
