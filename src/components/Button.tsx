import clsx from "clsx";
import { JSX, Show, splitProps } from "solid-js";

type BaseProps = {
  variant?: "primary" | "secondary";
  children: JSX.Element;
};

type ButtonProps = BaseProps &
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps &
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

export const buttonClass = clsx(
  "bg-glb-green shadow-glb-hard cursor-pointer border-2 border-black px-6 py-2 text-2xl font-bold text-black outline-none",
  "hover:shadow-glb-hard-lg focus:shadow-glb-hard-lg active:shadow-glb-hard-sm",
  "transition-shadow",
);

export default function Button(props: Props) {
  const [local, rest] = splitProps(props, ["variant", "children", "class"]);

  const classes = () =>
    clsx(
      buttonClass,
      { "bg-gray-light text-black": local.variant === "secondary" },
      local.class,
    );

  return (
    <Show
      when={rest.href !== undefined ? (rest as LinkProps) : undefined}
      fallback={
        <button class={classes()} {...(rest as ButtonProps)}>
          {local.children}
        </button>
      }
    >
      {(linkProps) => (
        <a class={clsx(classes(), "inline-block")} {...linkProps()}>
          {local.children}
        </a>
      )}
    </Show>
  );
}
