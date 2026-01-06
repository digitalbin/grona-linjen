import { totalItemCount } from "@/store/cart";

export default function QuantityBadge() {
  return (
    <span class="bg-glb-green text-glb-black absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-bold md:top-4 md:right-4">
      {totalItemCount()}
    </span>
  );
}
