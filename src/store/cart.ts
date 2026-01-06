import type { Stripe } from "stripe";
import { createEffect, createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";

type PriceId = Stripe.Price["id"];
export type CartItem = {
  priceId: PriceId;
  quantity: number;
};

const [_cart, _setCart] = createSignal<CartItem[]>([]);

function getStoredCart(): CartItem[] {
  if (isServer) return [];
  try {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (e) {
    console.error("Failed to access localStorage", e);
  }
  return [];
}

onMount(() => {
  _setCart(getStoredCart());
  createEffect(() => {
    if (isServer) return;
    try {
      window.localStorage.setItem("cart", JSON.stringify(_cart()));
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
  });
});

export const cart = _cart;

export const addToCart = (priceId: PriceId) => {
  const existingItem = _cart().find((item) => item.priceId === priceId);
  if (existingItem) {
    _setCart(
      _cart().map((item) =>
        item.priceId === priceId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  } else {
    _setCart([..._cart(), { priceId, quantity: 1 }]);
  }
};

export const removeFromCart = (priceId: PriceId) => {
  const existingItem = _cart().find((item) => item.priceId === priceId);
  if (existingItem) {
    if (existingItem.quantity > 1) {
      _setCart(
        _cart().map((item) =>
          item.priceId === priceId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } else {
      _setCart(_cart().filter((p) => p.priceId !== priceId));
    }
  }
};

export const totalItemCount = () =>
  _cart().reduce((sum, item) => sum + item.quantity, 0);
