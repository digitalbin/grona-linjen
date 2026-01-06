import { getPrices, PriceWithProduct } from "@/api/stripe";
import AmountSelector from "@/components/AmountSelector";
import { addToCart, cart, CartItem, removeFromCart } from "@/store/cart";
import { numberToPrice } from "@/utils/priceUtils";
import { A } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createResource, Index } from "solid-js";
import { Stripe } from "stripe";

const getPopulatedPrices = async (priceIds: string[]) => {
  const prices = await getPrices(priceIds);
  return prices;
};

export default clientOnly(async () => ({ default: CartPage }), { lazy: true });

type CartItemWithPrice = CartItem & {
  price: PriceWithProduct;
};

function itemIsPopulated(
  item: CartItem & { price?: Stripe.Price },
): item is CartItemWithPrice {
  return item.price?.product !== undefined;
}

function CartPage() {
  const priceIds = () => cart().map((item) => item.priceId);
  const [prices] = createResource(() => getPopulatedPrices(priceIds()));
  const cartItems = () =>
    cart()
      .map((item) => {
        const price = prices()?.find((p) => p.id === item.priceId);
        return {
          ...item,
          price,
        };
      })
      .filter(itemIsPopulated);

  const total = () => {
    const items = cartItems();
    if (!items?.length || items[0]?.price?.currency === undefined) return null;
    const sum = items.reduce(
      (acc, { price, quantity }) => acc + (price?.unit_amount ?? 0) * quantity,
      0,
    );
    return numberToPrice(sum, items[0].price.currency.toUpperCase());
  };

  return (
    <div class="bg-glb-gray-100 text-glb-black h-full py-12">
      <div class="gutter mx-auto grid max-w-2xl">
        <h1 class="mb-8 text-center text-3xl font-bold">Kassen</h1>
        <ul>
          <Index each={cartItems()}>
            {(cartItem) => {
              return (
                <li class="border-glb-gray-200 flex gap-6 border-b py-6">
                  <img
                    class="shadow-glb-hard-xs border-glb-black h-16 w-16 border object-cover"
                    src={cartItem().price.product.images[0]}
                    alt={cartItem().price.product.name}
                  />
                  <div class="flex flex-col">
                    <A
                      href={`/shop/products/${cartItem().price.product.id}`}
                      class="t-a self-start text-xl font-bold"
                    >
                      {cartItem().price.product.name}
                    </A>
                    {cartItem().price.nickname}
                  </div>
                  <div class="ml-auto flex flex-col items-end justify-between">
                    <AmountSelector
                      value={cartItem().quantity}
                      onIncrement={() => addToCart(cartItem().price.id)}
                      onDecrement={() => removeFromCart(cartItem().price.id)}
                    />
                    <span class="italic">
                      {numberToPrice(
                        cartItem().price.unit_amount ?? 0,
                        cartItem().price.currency,
                      )}
                    </span>
                  </div>
                </li>
              );
            }}
          </Index>
        </ul>
        <div class="mt-6 ml-auto flex items-center gap-2 text-lg">
          <span>Totalt:</span>
          <span class="border-glb-black shadow-glb-hard-xs border px-2 py-1 font-bold">
            {total()}
          </span>
        </div>
      </div>
    </div>
  );
}
