import { getProduct } from "@/api/stripe";
import Button from "@/components/Button";
import RadioGrid from "@/components/RadioGrid";
import { toPrice } from "@/utils/toPrice";
import { createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import Stripe from "stripe";
import { addToCart } from "@/store/cart";

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
        .map((p) => ({ label: p.nickname || toPrice(p), value: p.id }))}
    />
  );
}

export default function ProductPage() {
  const params = useParams();
  const data = createAsync(() => getProduct(params.id));
  const [selectedSize, setSelectedSize] = createSignal<Stripe.Price["id"]>();

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
              <div class="px-4">
                <img
                  src={product.images?.[0]}
                  alt={product?.name}
                  class="shadow-glb-hard border-glb-black h-full w-full border object-cover"
                />
              </div>
              <div class="text-glb-black flex flex-col gap-4 px-4">
                <h1 class="t-h1 mb-0">{product?.name}</h1>
                <p class="t-body">{product?.description}</p>
                <p class="t-h4 mb-0">
                  <Show when={selectedSize()} fallback={toPrice(prices[0])}>
                    {(priceId) => {
                      const price = prices.find((p) => p.id === priceId());
                      return toPrice(price);
                    }}
                  </Show>
                </p>

                <Show when={prices.length > 1}>
                  <VariantSelector prices={prices} onChange={setSelectedSize} />
                </Show>
                <Button
                  disabled={prices.length > 1 ? !selectedSize() : false}
                  onClick={handleAddToCart}
                  class="mt-4"
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
