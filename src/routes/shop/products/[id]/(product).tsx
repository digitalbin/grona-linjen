import { getProduct } from "@/api/stripe";
import Button from "@/components/Button";
import RadioGrid from "@/components/RadioGrid";
import { priceToDisplayPrice } from "@/utils/priceUtils";
import { createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import Stripe from "stripe";
import { addToCart } from "@/store/cart";
import FitText from "@/components/FitText";
import clsx from "clsx";

export const route = {
  preload: ({ params }) => getProduct(params.id),
} satisfies RouteDefinition;

function sortBySize(a: Stripe.Price, b: Stripe.Price) {
  const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];
  const aIndex = a.lookup_key ? sizeOrder.indexOf(a.lookup_key) : -1;
  const bIndex = b.lookup_key ? sizeOrder.indexOf(b.lookup_key) : -1;
  return aIndex - bIndex;
}

function VariantSelector({
  prices,
  onChange,
}: {
  prices: Stripe.Price[];
  onChange: (id: Stripe.Price["id"]) => void;
}) {
  return (
    <RadioGrid
      name="size"
      label="Välj storlek"
      onChange={onChange}
      items={prices
        .filter((p) => p.nickname)
        .sort(sortBySize)
        .map((p) => ({
          label: p.nickname || priceToDisplayPrice(p),
          value: p.id,
        }))}
    />
  );
}

function PriceTag(props: { children?: string; class?: string }) {
  if (!props.children) return null;
  return (
    <span
      class={clsx(
        `bg-glb-black shadow-glb-hard-xs shadow-glb-green text-glb-white inline rotate-12 self-end px-3 py-3 text-2xl font-bold`,
        props.class,
      )}
    >
      {props.children}
    </span>
  );
}

export default function ProductPage() {
  const params = useParams();
  const data = createAsync(() => getProduct(params.id));
  const [selectedSize, setSelectedSize] = createSignal<Stripe.Price["id"]>();

  createEffect(() => {
    const { prices, product } = data() || {};
    if (!prices || !product) return;
    if (prices.length === 1) {
      setSelectedSize(prices[0].id);
    }
  });

  const selectedPrice = () => {
    const { prices, product } = data() || {};
    if (!prices || !product) return undefined;
    const selected = prices.find((p) => p.id === selectedSize());
    const defaultPrice = prices.find((p) => p.id === product.default_price);
    return priceToDisplayPrice(selected || defaultPrice!);
  };

  function handleAddToCart() {
    const selSize = selectedSize();
    if (!selSize) return;
    addToCart(selSize);
  }

  return (
    <section class="bg-glb-gray-100 min-h-screen py-12 md:py-24">
      <Show when={data()}>
        {(d) => {
          const { product, prices } = d();
          return (
            <div class="gutter mx-auto grid h-full gap-8 md:grid-cols-2">
              <div class="relative max-h-[50vh] px-4 md:max-h-none">
                <img
                  src={product.images?.[0]}
                  alt={product?.name}
                  class="shadow-glb-hard border-glb-black h-full w-full border object-cover"
                />
                <PriceTag class="absolute -top-3 right-0">
                  {selectedPrice()}
                </PriceTag>
              </div>
              <div class="text-glb-black flex flex-col gap-8 px-4">
                <FitText as="h1">{product.name}</FitText>

                <p class="t-body">{product?.description}</p>

                <Show when={prices.length > 1}>
                  <VariantSelector prices={prices} onChange={setSelectedSize} />
                </Show>

                <Button
                  disabled={prices.length > 1 ? !selectedSize() : false}
                  onClick={handleAddToCart}
                >
                  Lägg i kassen!
                </Button>
              </div>
            </div>
          );
        }}
      </Show>
    </section>
  );
}
