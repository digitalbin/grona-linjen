import { getProducts } from "@/api/stripe";
import { priceToDisplayPrice } from "@/utils/priceUtils";
import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { For, JSX } from "solid-js";
import type Stripe from "stripe";

export const route = {
  preload: () => {
    getProducts();
  },
} satisfies RouteDefinition;

function ProductListItem({ product }: { product: Stripe.Product }) {
  return (
    <li class="shadow-glb-green shadow-glb-hard-sm hover:shadow-glb-hard-lg border-glb-black group relative aspect-square overflow-hidden transition-shadow">
      <A href={`/shop/products/${product.id}`}>
        <h2 class="t-h3 bg-glb-black absolute top-0 left-0 flex justify-between px-4 py-2 transition-transform group-hover:translate-y-0 md:-translate-y-full">
          {product.name}
        </h2>

        <span class="bg-glb-green text-glb-black absolute right-0 bottom-0 flex justify-between self-start px-2 py-1 text-sm font-bold transition-transform group-hover:translate-y-0 md:translate-y-full">
          {priceToDisplayPrice(product.default_price)}
        </span>

        <img
          src={product.images[0]}
          alt={product.name}
          class="h-full w-full object-cover"
        />
      </A>
    </li>
  );
}

function ProductList({ children }: { children: JSX.Element }) {
  return (
    <ul class="grid grid-cols-1 place-content-center gap-12 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}

export default function ProductsPage() {
  const products = createAsync(() => getProducts());
  return (
    <div class="gutter grid gap-12 p-12">
      <h1 class="t-h1 text-center">Prima merch</h1>

      <ProductList>
        <For each={products()}>
          {(product) => <ProductListItem product={product} />}
        </For>
      </ProductList>
    </div>
  );
}
