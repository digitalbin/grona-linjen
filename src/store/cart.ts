import type { Stripe } from "stripe";
import { createSignal } from "solid-js";

const [_cart, _setCart] = createSignal<Stripe.Product[]>([]);

export const cart = _cart;
export const addToCart = (product: Stripe.Product) =>
  _setCart([..._cart(), product]);
export const removeFromCart = (productId: string) => {
  return _setCart(_cart().filter((p) => p.id !== productId));
};
