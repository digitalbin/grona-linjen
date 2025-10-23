import { Accessor, createSignal, onMount } from "solid-js";
import { Show, For } from "solid-js";
import Item from "./Item";
import clsx from "clsx";
import Bubbles from "./Bubbles";
import Waves from "./Waves";

interface MenuProps {
  isOpen: Accessor<boolean>;
  toggleOpen: () => void;
}

export default function Menu({ isOpen, toggleOpen }: MenuProps) {
  const [localIsOpen, setLocalIsOpen] = createSignal(isOpen());
  const [offset, setOffset] = createSignal(0);
  const [menuItems, setMenuItems] = createSignal<HTMLElement[]>([]);

  onMount(() => {
    const header = document.querySelector("header")?.clientHeight || 0;
    setOffset(-(header + 32));
    setMenuItems([
      ...document.querySelectorAll("[data-menu-item]"),
    ] as HTMLElement[]);
  });

  const handleNavigation = (e: MouseEvent) => {
    e.preventDefault();
    const targetElement = menuItems().find((item) => {
      return (
        item.dataset.menuItem === (e.currentTarget as HTMLElement).innerText
      );
    });

    if (!targetElement) return;

    window.scrollTo({
      top: targetElement.offsetTop + offset(),
      behavior: "smooth",
    });
    toggleOpen();
  };

  return (
    <nav
      class={clsx(
        "text-glb-black fixed inset-0 left-auto flex h-screen justify-around text-4xl font-bold transition-transform duration-300 will-change-transform",
        isOpen() ? "translate-x-0" : `translate-x-full`,
      )}
      onTransitionEnd={() => setLocalIsOpen(isOpen())}
      onTransitionStart={() => {
        if (isOpen()) setLocalIsOpen(true);
      }}
    >
      <Show when={localIsOpen()}>
        <Waves />
        <div class="bg-glb-green relative">
          <Bubbles />

          <ul class="flex flex-col gap-6 p-8 pt-32">
            <For each={menuItems()}>
              {(node) => (
                <Item
                  label={node.dataset.menuItem}
                  onClick={handleNavigation}
                />
              )}
            </For>
          </ul>
        </div>
      </Show>
    </nav>
  );
}
