import { createSignal } from "solid-js";
import Tap from "./Tap";
import Menu from "./Menu";
import { useClickOutside } from "@/hooks";

export default function Drawer() {
  let ref: HTMLDivElement | undefined;
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useClickOutside(
    () => ref,
    () => {
      setIsOpen(false);
    },
  );
  return (
    <div ref={ref} class="ml-auto h-full">
      <Tap isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
}
