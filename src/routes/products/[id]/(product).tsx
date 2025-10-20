import { getProduct } from "@/api/stripe";
import { createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { createEffect } from "solid-js";

export const route = {
  preload: ({ params }) => getProduct(params.id),
} satisfies RouteDefinition;

export default function ProductPage() {
  const params = useParams();
  const product = createAsync(() => getProduct(params.id));
  createEffect(() => {
    console.log("Loaded product:", product());
  });
  return (
    <div>
      <h1>{product()?.name}</h1>
      <p>{product()?.description}</p>
    </div>
  );
}
