import clsx from "clsx";
import { JSX, mergeProps } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children: JSX.Element;
}

export default function Button(_props: Props) {
  const props = mergeProps(
    {
      variant: "primary",
    },
    _props,
  );
  return (
    <button
      {...props}
      class={clsx(
        "bg-glb-green shadow-glb-hard border-glb-black text-glb-black cursor-pointer border-2 px-6 py-2 text-2xl font-bold outline-none",
        "hover:shadow-glb-hard-lg focus:shadow-glb-hard-lg active:shadow-glb-hard-sm",
        "transition-shadow",
        {
          "bg-gray-light text-glb-black": props.variant === "secondary",
        },
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        props.class,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
