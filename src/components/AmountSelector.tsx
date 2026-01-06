import clsx from "clsx";

export default function AmountSelector(props: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
  const min = props.min ?? 0;
  const max = props.max ?? Number.POSITIVE_INFINITY;
  const btnClass = clsx(
    "w-6 h-6 flex items-center justify-center border border-glb-gray-400 transition-colors",
    "hover:border-glb-black cursor-pointer",
  );
  return (
    <div class="inline-flex items-center">
      <button
        type="button"
        class={btnClass}
        onClick={props.onDecrement}
        disabled={props.disabled || props.value <= min}
        aria-label="Minska antal"
      >
        −
      </button>
      <span class="border-glb-gray-400 h-6 min-w-8 border-y text-center">
        {props.value}
      </span>
      <button
        type="button"
        class={btnClass}
        onClick={props.onIncrement}
        disabled={props.disabled || props.value >= max}
        aria-label="Öka antal"
      >
        +
      </button>
    </div>
  );
}
