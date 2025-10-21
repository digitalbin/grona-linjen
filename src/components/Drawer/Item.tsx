import { JSX } from "solid-js";

interface Props {
  onClick: (e: MouseEvent) => void;
  label?: string;
}

export default function Item({ onClick, label }: Props) {
  if (!label) return null;
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        class="group relative block py-2 tracking-widest whitespace-nowrap ring-0 outline-none"
      >
        {label
          .split("")
          .map((letter, i) =>
            letter === " " ? (
              " "
            ) : (
              <span class="inline-block transition-transform group-hover:translate-y-2 group-hover:rotate-12 group-hover:odd:-translate-y-2 group-hover:odd:-rotate-12">
                {i === 0 ? letter.toUpperCase() : letter}
              </span>
            ),
          )}
      </a>
    </li>
  );
}
