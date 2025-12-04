import { onMount } from "solid-js";
import { Dynamic } from "solid-js/web";

function handleResize(parent: HTMLDivElement, el: HTMLElement) {
  el.style.transform = `none`;

  const pSize = parent.getBoundingClientRect();
  const size = el.getBoundingClientRect();
  const scaleX = pSize.width / size.width;
  const scaleY = pSize.height / size.height;

  el.style.transform = `scale(${scaleX}, ${scaleY})`;
}

export default function FitText(props: {
  children: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  let parent!: HTMLDivElement;
  let span!: HTMLSpanElement;

  onMount(() => {
    handleResize(parent, span);
    const resizeHandler = () => handleResize(parent, span);
    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => window.removeEventListener("resize", resizeHandler);
  });

  return (
    <div ref={parent} class="h-16">
      <Dynamic
        component={props.as || "span"}
        ref={span}
        class="inline-block origin-top-left leading-[0.8] font-black uppercase"
      >
        {props.children}
      </Dynamic>
    </div>
  );
}
