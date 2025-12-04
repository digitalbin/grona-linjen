import { For } from "solid-js";
import clsx from "clsx";

export type RadioItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface RadioGridProps {
  name: string;
  items: RadioItem[];
  label?: string;
  onChange?: (value: string) => void;
}

export default function RadioGrid(props: RadioGridProps) {
  return (
    <div class="group grid">
      {props.label && (
        <span class="group-focus-within:shadow-glb-hard-xs group-active:shadow-glb-hard-xs bg-glb-green w-max border-2 border-b-0 px-4 py-1 font-bold transition-shadow">
          {props.label}
        </span>
      )}
      <fieldset
        class={clsx(
          "col bg-glb-white relative flex flex-wrap",
          "border-glb-black border-t-2 border-l-2",
          "active:shadow-glb-hard-xs focus-within:shadow-glb-hard-xs transition-shadow",
        )}
      >
        <For each={props.items}>
          {(item) => (
            <RadioGridItem
              name={props.name}
              label={item.label}
              value={item.value}
              disabled={item.disabled}
              onChange={props.onChange}
            />
          )}
        </For>
      </fieldset>
    </div>
  );
}

function RadioGridItem(props: {
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <label class="relative flex-1 cursor-pointer">
      <input
        type="radio"
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        class="peer sr-only"
        onInput={(e) => props.onChange?.(e.currentTarget.value)}
      />

      <div
        class={clsx(
          "border-r-2 border-b-2 px-4 py-3 text-center font-mono text-sm leading-none text-nowrap transition-colors",
          "peer-checked:bg-glb-green peer-checked:font-bold",
        )}
      >
        {props.label}
      </div>
    </label>
  );
}
