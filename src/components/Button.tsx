import clsx from "clsx";
import { JSX } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children: JSX.Element;
}

export default function Button({
  variant = "primary",
  onClick,
  children,
  class: className,
  ...rest
}: Props) {
  return (
    <button
      class={clsx(
        "bg-glb-green shadow-glb-hard cursor-pointer border-2 border-black px-6 py-2 text-2xl font-bold text-black outline-none",
        "hover:shadow-glb-hard-lg focus:shadow-glb-hard-lg active:shadow-glb-hard-sm",
        "transition-shadow",
        {
          "bg-gray-light text-black": variant === "secondary",
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
