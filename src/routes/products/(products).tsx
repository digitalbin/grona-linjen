import { getPrices, getProducts } from "@/api/stripe";
import { addToCart } from "@/store/cart";
import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { createEffect, For } from "solid-js";

export const route = {
  preload: () => {
    getProducts();
    getPrices();
  },
} satisfies RouteDefinition;

export default function ProductsPage() {
  const products = createAsync(() => getProducts());
  const prices = createAsync(() => getPrices());
  createEffect(() => {
    console.log("Loaded products:", products());
    console.log("Loaded prices:", prices());
  });
  return (
    <div>
      <For each={products()}>
        {(product) => (
          <div>
            <A href={`/products/${product.id}`}>{product.name}</A>
            <button on:click={() => addToCart(product)}>Add to cart</button>
          </div>
        )}
      </For>
    </div>
  );
}
