import type { Stripe } from "stripe";
import { createSignal } from "solid-js";

type PriceId = Stripe.Price["id"];
type CartItem = {
  priceId: PriceId;
  quantity: number;
};

const [_cart, _setCart] = createSignal<CartItem[]>([]);

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
