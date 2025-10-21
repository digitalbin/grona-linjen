import {
  Accessor,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Show, For } from "solid-js";
import Item from "./Item";
import { animate } from "motion";
import clsx from "clsx";
import Bubbles from "./Bubbles";
// import Waves from "./Waves";
// import Bubbles from "./Bubbles";
// import Item from "./Item";

interface MenuProps {
  isOpen: Accessor<boolean>;
  toggleOpen: () => void;
}

function useClickOutside(
  ref: () => HTMLElement | undefined,
  handler: (e: MouseEvent) => void,
) {
  createEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref() || ref()!.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    onCleanup(() => document.removeEventListener("mousedown", listener));
  });
}

const Menu = ({ isOpen, toggleOpen }: MenuProps) => {
  let navRef: HTMLDivElement | undefined;
  const [w, setW] = createSignal(0);
  const [offset, setOffset] = createSignal(0);
  const [menuItems, setMenuItems] = createSignal<HTMLElement[]>([]);

  onMount(() => {
    const header = document.querySelector("header")?.clientHeight || 0;
    setOffset(-(header + 32));
    setMenuItems([
      ...document.querySelectorAll("[data-menu-item]"),
    ] as HTMLElement[]);
    if (navRef) {
      setW(navRef.clientWidth);
    }
  });

  //   useClickOutside(
  //     () => navRef,
  //     (e) => {
  //       const target = e.target as HTMLElement;
  //       if (target.id !== "menuBtn") toggleOpen();
  //     },
  //   );

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

  // Simple fly transition (right slide in)
  //   const navStyle = () =>
  //     props.isOpen
  //       ? {
  //           transform: `translateX(${w()}px)`,
  //           opacity: 1,
  //           transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
  //         }
  //       : { display: "none" };

  return (
    <nav
      ref={navRef}
      //   style={navStyle()}
      class={clsx(
        "text-glb-black fixed inset-0 left-auto flex h-screen justify-around text-4xl font-bold transition-transform duration-300 will-change-transform",
        isOpen() ? "translate-x-0" : `translate-x-full`,
      )}
    >
      {/* <Waves /> */}
      <ul class="bg-glb-green grid flex-1 gap-6 p-8 pt-32">
        <For each={menuItems()}>
          {(node) => (
            <Item label={node.dataset.menuItem} onClick={handleNavigation} />
          )}
        </For>
      </ul>
      <Bubbles />
    </nav>
  );
};

export default Menu;

// ...JSX output is above in the Menu component...

// Styles can be moved to a CSS/PCSS file and imported, or use Tailwind classes directly in JSX if Tailwind is set up.
